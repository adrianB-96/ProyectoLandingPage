import Image from "next/image";
import backgroundContact from "@/assets/mainImage/bannerContact.png";
import { config } from "@/config/config";
import { getTranslations } from "next-intl/server";
import Header from "@/components/contact/Header";
import Hero from "@/components/contact/Hero";
import ContactForm, { ContactFormTranslation } from "@/components/contact/ContactForm";
import Footer from "@/components/Footer";
import style from '@/style/contact/Background.module.css';

async function getContactFormTranslations(): Promise<ContactFormTranslation> {
  const t = await getTranslations("ContactForm");
  return {
    nameLabel: t("nameLabel"),
    mandatoryName: t("mandatoryName"),
    emailLabel: t("emailLabel"),
    errorEmail: t("errorEmail"),
    mandatoryEmail: t("mandatoryEmail"),
    enterpriseLabel: t("enterpriseLabel"),
    mandatoryEnterprise: t("mandatoryEnterprise"),
    sector: t("sector"),
    messagePlaceholder: t("messagePlaceholder"),
    send: t("send"),
    acceptLegal: t("acceptLegal"),
    legalAdvice: t("legalAdvice"),
    errorPrivacy: t("errorPrivacy"),
    promotions: t("promotions"),
    captcha: t("captcha"),
    errorCatcha: t("errorCatcha"),
    retryVerify: t("retryVerify"),
    sectors: {
      agriculture: t("sectors.agriculture"),
      arquitecture: t("sectors.arquitecture"),
      energy: t("sectors.energy"),
      industry: t("sectors.industry"),
      infraestructura: t("sectors.infraestructura"),
      logistics: t("sectors.logistics"),
      mobility: t("sectors.mobility"),
      retail: t("sectors.retail"),
      robotics: t("sectors.robotics"),
      healthcare: t("sectors.healthcare"),
      seguridad: t("sectors.seguridad"),
      publicSector: t("sectors.publicSector"),
      telecommunications: t("sectors.telecommunications"),
      other: t("sectors.other"),
    },
    alertMessages: {
      success: t("alertMessages.success"),
      error: t("alertMessages.error"),
      serverError: t("alertMessages.serverError"),
    }
  };
}

export default async function ContactPage() {
  const translations = await getContactFormTranslations();
  const backendUrl = config.NEXT_PUBLIC_BACKEND_URL;
  const recaptchaSiteKey = config.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const privacyPoliticsUrl = config.NEXT_PUBLIC_URL_PRIVACY_POLITICS;

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <main className="flex-grow w-full">
        <div className={style.FondoFormularioDeContacto}>
          <Header/>
          <Hero/>
          <ContactForm t={translations} envs={{ backendUrl, recaptchaSiteKey, privacyPoliticsUrl }}/>
        </div>
        <Footer/>
      </main>
    </div>
  );
}
