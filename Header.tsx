'use client';
import { useEffect, useState } from 'react';
import styles from '../style/Buttons.module.css';
import Image from 'next/image';
import Logo from '@/assets/mainImage/LogoSafireServices.svg';
import { getTranslations } from 'next-intl/server';

export default function Header() {
    //const t = await getTranslations('Header');
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        setScrolled(window.scrollY > 1);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`text-white py-4 fixed top-0 z-50 w-full transition-all duration-500 active:scale-98 ${
            (scrolled || mobileMenuOpen) ? "bg-zinc-700 shadow-lg" : ""
        }`}>
            <div className={"container mx-auto px-auto flex justify-center gap-40 sm:gap-122 items-center flex-shrink-0"}>
                <div className="flex items-center justify-start gap-1 sm:gap-2.5 px-2 sm:px-3">
                    <Image src={Logo} alt='Logo'></Image>
                </div>
                <nav className="hidden sm:flex gap-6 text-sm">
                    <li className={styles.liInicioSesionButton}>
                        <a href="https://127.0.0.1/Login">Iniciar sesión</a>
                    </li>
                    <a href="./es/contact" className={styles.liContactarButton}>
                        <li className={styles.ContactarButton}>Contactar</li>
                    </a>
                </nav>

                <button
                    className="sm:hidden p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Abrir menú">
                    <svg className="w-full h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {mobileMenuOpen && (
                <div className="sm:hidden absolute top-full left-0 w-full bg-zinc-700 shadow-lg flex flex-col p-4 gap-4">
                    <a href="https://127.0.0.1:" className={styles.liInicioSesionButton}>Iniciar sesión</a>
                    <div className={styles.liContactarButton}>
                        <a href="./es/contact" className={styles.ContactarButton}>Contactar</a>
                    </div> 
                </div>
            )}
        </header>
    );
}
