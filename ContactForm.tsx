"use client";
import Image from "next/image";
import ActividadEmpresaIcon from '@/assets/SvgIcons/Contact/Navigation/expand more.svg';
import type React from "react";
import { useState, useRef, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Alert, Typography } from "@mui/material";
import { ColorsNeutral, ColorsStatesError } from "@/style/contact/styleColors";
import { ButtonSendRequest } from "@/style/contact/ButtonSendRequest";
import Script from "next/script";
import { sendContactForm } from "@/services/contactService";

declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        render: (container: string | HTMLElement, options: { 
          sitekey: string | undefined; 
          callback: (token: string) => void; 
          action?: string;
          'expired-callback'?: () => void;
        }) => number;
        reset: (widgetId?: number) => void;
        ready: (callback: () => void) => void;
        execute: (sitekey: string, options: { action: string }) => Promise<string>;
      };
    };
  }
}

export type ContactFormTranslation = {
  nameLabel: string;
  mandatoryName: string;
  emailLabel: string;
  errorEmail: string;
  mandatoryEmail: string;
  enterpriseLabel: string;
  mandatoryEnterprise: string;
  sector: string;
  messagePlaceholder: string;
  send: string;
  acceptLegal: string;
  legalAdvice: string;
  errorPrivacy: string;
  promotions: string;
  captcha: string;
  errorCatcha: string;
  retryVerify: string;
  sectors: {
    agriculture: string;
    arquitecture: string;
    energy: string;
    industry: string;
    infraestructura: string;
    logistics: string;
    mobility: string;
    retail: string;
    robotics: string;
    healthcare: string;
    seguridad: string;
    publicSector: string;
    telecommunications: string;
    other: string;
  };
  alertMessages: {
    success: string;
    error: string;
    serverError: string;
  };
};

type SectorOption = {
  label: string;
  value: string;
};

type AlertType = 'success' | 'error';

type Props = {
  t: ContactFormTranslation;
  envs: {
    backendUrl: string | undefined;
    recaptchaSiteKey: string | undefined;
    privacyPoliticsUrl: string | undefined;
  };
};

export default function ContactForm({ t, envs }: Props) {
  const sectorRef = useRef<SectorOption | null>(null);

  const [legalAccepted, setLegalAccepted] = useState<boolean>(false);
  const [promotionsAccepted, setPromotionsAccepted] = useState<boolean>(false);
  const [formSubmitAttempted, setFormSubmitAttempted] = useState<boolean>(false);
  const [showLegalError, setShowLegalError] = useState<boolean>(false);
  const [showCaptchaError, setShowCaptchaError] = useState<boolean>(false);
  const [isVerifyingCaptcha, setIsVerifyingCaptcha] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [enterprise, setEnterprise] = useState("");
  const [sector, setSector] = useState<SectorOption | null>(null);
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [enterpriseError, setEnterpriseError] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>('success');
  const [alertMessage, setAlertMessage] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isNameValid = name.trim() !== "";
  const isEnterpriseValid = enterprise.trim() !== "";
  const isEmailValid = email.trim() !== "" && emailRegex.test(email.trim());
  const isLegalValid = legalAccepted;

  const isFormValid =
    isNameValid &&
    isEnterpriseValid &&
    isEmailValid &&
    isLegalValid;

  const isButtonDisabled =
    !isFormValid ||
    isVerifyingCaptcha;

  useEffect(() => {
    if (!alertOpen) return;

    const timer = setTimeout(() => {
      setAlertOpen(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, [alertOpen]);

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setFormSubmitAttempted(true);
    setNameError(!isNameValid);
    setEmailError(!isEmailValid);
    setEnterpriseError(!isEnterpriseValid);
    setShowLegalError(!legalAccepted);

    if (!isNameValid || !isEmailValid || !isEnterpriseValid || !legalAccepted) return;
    
    // Ejecutamos el token de forma transparente justo antes de enviar
    if (typeof window !== "undefined" && window.grecaptcha?.enterprise) {
      setIsVerifyingCaptcha(true);
      window.grecaptcha.enterprise.ready(async () => {
        try {
          const token = await window.grecaptcha.enterprise.execute(envs.recaptchaSiteKey || "", { action: 'contact' });
          executeFormSubmission(token)
        } catch (err) {
          console.error("Captcha execution failed", err);
          setShowCaptchaError(true);
          setIsVerifyingCaptcha(false);
        }
      });
    }
  }

  async function executeFormSubmission(captchaToken: string) {
    const { alertMessages } = t;
    try {
      const res = await sendContactForm({
        name,
        email,
        company: enterprise,
        message,
        sector: sector?.label,
        termsAndConditions: legalAccepted,
        notifications: promotionsAccepted,
        language: "es", // solo se envia español, porque es para los comerciales.
        captchaToken,
      }, envs.backendUrl || "");

      if (res.ok) {
        setAlertType("success");
        setAlertMessage(alertMessages.success);
        setAlertOpen(true);
        resetStates();
      } else {
        const data = await res.json();
        setAlertType("error");
        setAlertMessage(data?.message || alertMessages.error);
        setAlertOpen(true);
      }
    } catch (error) {
      console.error(error);
      setAlertType("error");
      setAlertMessage(alertMessages.serverError);
      setAlertOpen(true);
    } finally {
      setIsVerifyingCaptcha(false);
    }
  }

  function resetStates() {
    setName("");
    setEmail("");
    setEnterprise("");
    setMessage("");
    setSector(null);
    setLegalAccepted(false);
    setPromotionsAccepted(false);
    setFormSubmitAttempted(false);
    setShowLegalError(false);
    setShowCaptchaError(false);
  }

  const select = [
    { label: t.sectors.agriculture, value: 'agriculture' },
    { label: t.sectors.arquitecture, value: 'architecture' },
    { label: t.sectors.energy, value: 'energy' },
    { label: t.sectors.industry, value: 'industry' },
    { label: t.sectors.infraestructura, value: 'infrastructure' },
    { label: t.sectors.logistics, value: 'logistics' },
    { label: t.sectors.mobility, value: 'mobility' },
    { label: t.sectors.retail, value: 'retail' },
    { label: t.sectors.robotics, value: 'robotics' },
    { label: t.sectors.healthcare, value: 'healthcare' },
    { label: t.sectors.seguridad, value: 'security' },
    { label: t.sectors.publicSector, value: 'publicSector' },
    { label: t.sectors.telecommunications, value: 'telecommunications' },
    { label: t.sectors.other, value: 'other' },
  ];

    return (
        <div className="self-stretch inline-flex flex-wrap justify-center items-center gap-6 sm:gap-12 lg:gap-20 mb-6 sm:mb-10">
            <div className="w-full sm:w-[697px] p-10 sm:p-8 inline-flex flex-col justify-center items-center gap-10">
                <div className="w-full p-10 bg-white rounded-2xl flex flex-col justify-center items-start gap-6">
                    {alertOpen && (
                        <Alert
                            severity={alertType === 'success' ? 'success' : 'error'}
                            className={alertType === 'success' ? 'alert-success' : 'alert-error'}
                            sx={{ mb: 2, width: '100%' }}
                        >
                            <Typography>{alertMessage}</Typography>
                        </Alert>
                    )}
                    <div className="w-full sm:w-[560px] flex flex-col justify-start items-start gap-6">
                        <div className="self-stretch flex flex-col justify-start items-center gap-4">
                            <div className="self-stretch flex flex-col justify-start items-start gap-6">
                                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                                    <div className="self-stretch flex flex-col sm:flex-row justify-start items-center">
                                        <div data-state="Default" className="self-stretch inline-flex justify-center items-center">
                                            <div className="p-4.25 w-70 justify-center text-neutral-400 text-sm font-normal leading-5">
                                                    <TextField
                                                        label={t.nameLabel}
                                                        placeholder={t.nameLabel}
                                                        variant="outlined"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        error={nameError}
                                                        helperText={nameError ? t.mandatoryName : ""}
                                                        className="w-full"
                                                        style={{ color: ColorsNeutral().grey4 }}
                                                    />
                                            </div>
                                        </div>
                                        <div className="self-stretch inline-flex justify-center items-center">
                                            <div className="p-4.25 w-70 justify-center text-neutral-400 text-sm font-normal leading-5">
                                                    <TextField
                                                        label={t.emailLabel}
                                                        placeholder={t.emailLabel}
                                                        variant="outlined"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        error={formSubmitAttempted && emailError}
                                                        helperText={
                                                            formSubmitAttempted && email.trim() === ""
                                                                ? t.mandatoryEmail
                                                                : formSubmitAttempted && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
                                                                    ? t.errorEmail
                                                                    : ""
                                                        }
                                                        className="w-full"
                                                        style={{ color: ColorsNeutral().grey4 }}
                                                    />    
                                            </div>
                                        </div>
                                    </div>
                                    <div className="self-stretch flex flex-col sm:flex-row justify-start items-center">
                                        <div className="self-stretch inline-flex justify-center items-center">
                                            <div className="p-4.25 w-70 justify-center text-neutral-400 text-sm font-normal leading-5">
                                                    <TextField
                                                        label={t.enterpriseLabel}
                                                        placeholder={t.enterpriseLabel}
                                                        variant="outlined"
                                                        value={enterprise}
                                                        onChange={(e) => setEnterprise(e.target.value)}
                                                        error={enterpriseError}
                                                        helperText={enterpriseError ? t.mandatoryEnterprise : ""}
                                                        className="w-full"
                                                        style={{ color: ColorsNeutral().grey4 }}
                                                    />    
                                            </div>
                                        </div>
                                        <div className="self-stretch inline-flex justify-center items-center">
                                            <div className="p-4.25 w-70 justify-center text-neutral-400 text-sm font-normal leading-5">
                                                    <Autocomplete<SectorOption>
                                                        disablePortal
                                                        options={select}
                                                        value={sector}
                                                        onChange={(
                                                            _event: React.SyntheticEvent,
                                                            newValue: SectorOption | null
                                                        ) => {
                                                            setSector(newValue);
                                                            sectorRef.current = newValue;
                                                        }}
                                                        isOptionEqualToValue={(option, value) =>
                                                            option.value === value.value
                                                        }
                                                        renderInput={(params) => (
                                                            <TextField {...params} label={t.sector} />
                                                        )}
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="self-stretch inline-flex justify-center items-center">
                                            <div className="p-4.25 w-full sm:w-140 justify-center text-neutral-400 text-sm font-normal leading-5">
                                                    <TextField
                                                        label={t.messagePlaceholder}
                                                        placeholder={t.messagePlaceholder}
                                                        multiline
                                                        rows={7}
                                                        variant="outlined"
                                                        value={message}
                                                        onChange={(e) => setMessage(e.target.value)}
                                                        className="w-full"
                                                        style={{ color: ColorsNeutral().grey4 }}
                                                    />    
                                            </div>
                                    </div>
                                </div>
                            </div>
                            <div className="self-stretch flex flex-col justify-start items-start gap-2 ml-4">
                                <div className="self-stretch pr-1 inline-flex justify-start items-center gap-1">
                                    <div className="flex-1 justify-start">
                                        <input
                                            type="checkbox"
                                            className="mt-1 h-4 w-4 rounded"
                                            checked={legalAccepted}
                                            onChange={(e) => {
                                                setLegalAccepted(e.target.checked);
                                                if (formSubmitAttempted && e.target.checked) {
                                                    setShowLegalError(false);
                                                }
                                            }}
                                        />
                                        <label className="text-sm m-1" style={{ color: ColorsNeutral().grey6 }}>
                                            {t.acceptLegal} <a href={envs.privacyPoliticsUrl || ""} className="underline" target="_blank" rel="noopener noreferrer">{t.legalAdvice}</a>
                                        </label>
                                    </div>
                                </div>
                                <div className="self-stretch pr-1 inline-flex justify-start items-center gap-1">    
                                    <div className="flex-1 justify-start text-zinc-700 text-sm font-normal leading-5">
                                        <input
                                            type="checkbox"
                                            className="mt-1 h-4 w-4 rounded"
                                            checked={promotionsAccepted}
                                            onChange={(e) => setPromotionsAccepted(e.target.checked)}
                                        />
                                        <label className="text-sm m-1" style={{ color: ColorsNeutral().grey6 }}>
                                            {t.promotions}
                                        </label>
                                    </div>
                                </div>
                                <div data-property-1="Default" className="w-60 h-14 relative">    
                                    <div className="text-center justify-center text-white text-sm font-semibold leading-5">
                                        <Script
                                            src={`https://www.google.com/recaptcha/enterprise.js?render=${envs.recaptchaSiteKey}`}
                                            strategy="afterInteractive"
                                        />
                                        {showCaptchaError && (
                                            <p className="text-sm" style={{ color: ColorsStatesError().accent }}>{t.captcha}</p>
                                        )}
                                    </div>
                                </div>
                                <ButtonSendRequest label={t.send} onClick={handleSubmit} disabled={isButtonDisabled}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}