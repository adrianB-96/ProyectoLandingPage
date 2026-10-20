'use client';
import styles from '@/style/contact/Header.module.css';
import { useEffect, useState } from 'react';

export default function Header() {
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
            <div className={styles.HeaderDiv}>
                <ul>
                    <li className={styles.Logo}></li>
                </ul>
                <nav className='hidden sm:flex gap-6 text-sm'>
                    <a href="https://safire.services/">
                        <li className={styles.InicioSesionButton}>
                            <p>Iniciar sesion</p>
                        </li>
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
                    <a href="https://safire.services/" className={styles.InicioSesionButton}>Iniciar sesión</a>
                </div>
            )}
        </header>
    );
}