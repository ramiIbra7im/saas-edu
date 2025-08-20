'use client';

import styles from './styles/Footer.module.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container py-5">
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
                    <div className="col-md-4">
                        <h6 className="text-white mb-3">تابعنا</h6>
                        <div className="d-flex gap-3">
                            <a href="#" className={styles.icon}><FaFacebookF /></a>
                            <a href="#" className={styles.icon}><FaTwitter /></a>
                            <a href="#" className={styles.icon}><FaInstagram /></a>
                            <a href="#" className={styles.icon}><FaLinkedin /></a>
                        </div>
                    </div>
                </div>
                <hr className="my-4 border-secondary" />
                <p className="text-center text-white small mb-0">
                    © {new Date().getFullYear()} EduCenter | جميع الحقوق محفوظة.
                </p>
            </div>
        </footer>
    );
}
