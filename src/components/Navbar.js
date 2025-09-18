"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "../../public/globe.svg";
import styles from "./styles/navbar.module.css";

export default function Navbar() {
    const pathname = usePathname();

    const [scrollUp, setScrollUp] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        let ticking = false;

        const updateScroll = () => {
            const currentY = window.scrollY;

            if (Math.abs(currentY - lastScrollY) > 10) {
                if (currentY > lastScrollY) {
                    // سكرول لتحت
                    setScrollUp(false);
                } else {
                    // سكرول لفوق
                    setScrollUp(true);
                }
                setLastScrollY(currentY);
            }

            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScroll);
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <nav
            className={`navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top transition ${scrollUp ? styles.showNavbar : styles.hideNavbar
                }`}
            dir="rtl"
        >
            <div className="container d-flex align-items-center justify-content-between">
                <Link className="navbar-brand fw-bold d-flex align-items-center" href="/">
                    <Image src={logo} alt="الشعار" width={40} height={40} className="ms-2" />
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-center" id="mainNavbar">
                    <ul className="navbar-nav gap-3 text-center">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${styles["nav-link"]} ${pathname === "/" ? styles.activeLink : ""
                                    }`}
                                href="/"
                            >
                                الرئيسية
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${styles["nav-link"]}`}
                                href="#features"
                            >
                                المميزات
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${styles["nav-link"]}`}
                                href="#contact"
                            >
                                اتصل بنا
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${styles["nav-link"]} ${pathname === "/register" ? styles.activeLink : ""
                                    }`}
                                href="/register"
                            >
                                تسجيل سنتر
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${styles["nav-link"]} ${pathname === "/login" ? styles.activeLink : ""
                                    }`}
                                href="/login"
                            >
                                تسجيل دخول
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="d-none d-lg-block">
                    <Link href="/register" className={`${styles["btn-custom"]} btn`}>
                        ابدأ الآن
                    </Link>
                </div>
            </div>
        </nav>
    );
}
