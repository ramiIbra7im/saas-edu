'use client';

import styles from './styles/Footer.module.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container py-3">
                <div className="row gy-4">
                    {/* شعار ووصف */}
                    <div className="col-md-4">
                        <h4 className="fw-bold mb-3 text-white">EduCenter</h4>
                        <p className="text-white">
                            منصتك الذكية لإدارة السناتر التعليمية. نظم فصولك، راقب الأداء، وتواصل مع طلابك بكل احترافية.
                        </p>
                    </div>

                    {/* روابط */}
                    <div className="col-md-2">
                        <h6 className="text-white mb-3">المنصة</h6>
                        <ul className="list-unstyled">
                            <li><Link href="/" className={styles.link}>الرئيسية</Link></li>
                            <li><Link href="/features" className={styles.link}>المميزات</Link></li>
                            <li><Link href="/pricing" className={styles.link}>الأسعار</Link></li>
                        </ul>
                    </div>

                    {/* المساعدة */}
                    <div className="col-md-2">
                        <h6 className="text-white mb-3">الدعم</h6>
                        <ul className="list-unstyled">
                            <li><Link href="/faq" className={styles.link}>الأسئلة الشائعة</Link></li>
                            <li><Link href="/contact" className={styles.link}>اتصل بنا</Link></li>
                            <li><Link href="/policy" className={styles.link}>سياسة الخصوصية</Link></li>
                        </ul>
                    </div>

                    {/* تواصل معنا */}
                    <div className="col-md-4 text-center">
                        <h6 className="text-white  mb-3">تابعنا</h6>
                        <div className="d-flex gap-3">
                            <a href="https://www.facebook.com/RaMI.IbRa7iM" className={styles.icon}><FaFacebook /></a>
                            <a href="https://wa.me/201551212431" className={styles.icon}><FaWhatsapp /></a>
                            <a href="https://eg.linkedin.com/in/rami-ibrahim-50442b363" className={styles.icon}><FaLinkedin /></a>
                        </div>
                    </div>
                </div>
                <hr className="my-4 border-secondary" />
                <p className="text-center text-white small mb-0">
                    Ramy Ibrahim    | جميع الحقوق محفوظة ©{new Date().getFullYear()}
                </p>
            </div>
        </footer>
    );
}
