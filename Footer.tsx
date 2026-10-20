import styles from '@/style/Footer.module.css';
import Image from "next/image";
import logoFooter from '@/assets/mainImage/LogoSafireServices.svg';
import LoginRightIcon from '@/assets/SvgIcons/right.svg';
import LenguageDownIcon from '@/assets/SvgIcons/expandMore.svg';
import LanguageSelector from '@/utils/LenguageSelector';

export default async function Footer() {
    return (
        <footer className={styles.Footer}>
            <div className="w-full max-w-7xl mr-0 sm:mr-40 px-auto sm:px-60 flex flex-col sm:flex-row justify-between items-center gap-8 sm:gap-20">
                <Image src={logoFooter} alt='logoFooter' className="h-10 w-auto sm:h-12"></Image>
                <div className="flex-1 w-full sm:w-auto ml-auto sm:ml-20 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-8 sm:gap-0">
                    <div className="w-full sm:flex-1 flex flex-col sm:flex-row justify-start items-center sm:items-center gap-8 sm:gap-0">
                        <div className={styles.FooterDivRecursos}>
                            <div className={styles.FooterDivTituloRecursosEmpresa}>
                                <p>Recursos</p>
                            </div>
                            <div className="self-stretch flex flex-col justify-start items-start">
                                <div className="w-48 h-6 rounded-3xl inline-flex justify-start items-center gap-2">
                                    <div className="size- flex justify-start items-center gap-2">
                                        <div className="size- py-1 flex justify-start items-center gap-2.5">
                                            <div className={styles.FooterDivCookiesPoliciesContactLogin}>
                                                <a href='/'>Condiciones y política de privacidad</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-36 h-6 rounded-3xl inline-flex justify-start items-center gap-2">
                                    <div className="size- flex justify-center items-center gap-2">
                                        <div className="size- py-1 flex justify-start items-center gap-2.5">
                                            <div className={styles.FooterDivCookiesPoliciesContactLogin}>
                                                <a href='/'>Configuración de cookies</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.FooterDivEmpresa}>
                            <div className={styles.FooterDivTituloRecursosEmpresa}>
                                <p>Empresa</p>
                            </div>
                            <div className="w-36 flex flex-col justify-start items-start">
                                <div className="w-20 h-5 inline-flex justify-start items-center gap-3">
                                    <div className="w-14 h-4 px-1 rounded-3xl flex justify-center items-center gap-2">
                                        <div className="size- flex justify-start items-center gap-2">
                                            <div className="size- py-1 flex justify-start items-center gap-2.5">
                                                <div className={styles.FooterDivCookiesPoliciesContactLogin}>
                                                    <a href='/contact'>Contactar</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="self-stretch h- inline-flex justify-start items-center gap-3">
                                    <a href='https://safire.services/' className="w-24 h-6 px-0 rounded-3xl flex justify-center items-center gap-2">
                                        <div className="size- flex justify-center items-center gap-2">
                                            <div className="size- py-1 flex justify-start items-center gap-2.5">
                                                <div className={styles.FooterDivCookiesPoliciesContactLogin}>
                                                    <p>Iniciar sesión</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="size-4 relative overflow-hidden">
                                            <div className="size-4 left-0 top-0 absolute" />
                                            <Image src={LoginRightIcon} alt='LoginRightIcon'></Image>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full sm:flex-1 flex flex-col sm:flex-row justify-start items-center sm:items-center gap-8 sm:gap-16">
                        <div className="px-13 sm:px-0 py-1.5 rounded-full flex items-center gap-2 w-full">
                            <div className="size- py-1 flex justify-start items-center gap-2.5">
                                <div className="justify-center text-white text-xs font-bold leading-4">
                                    <LanguageSelector/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}