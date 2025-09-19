"use client";

import Image from "next/image";
import { FaEnvelope, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import styles from './styles/contact.module.css';

export default function ContactSection() {
    return (
        <section id="contact" className={`${styles.cocontent} container-fluid py-5`} style={{ backgroundColor: '#f8f8f8' }}>
            <div className={`row align-items-center m-auto container ${styles.glassBox}  rounded shadow border`}>



                {/* Text & Form */}
                <div className="text-center mb-4">
                    <h2 className={`${styles.heading} fw-bold pt-4   display-6`}>تواصل معنا</h2>
                    <p className={styles.subtext}>نسعد بخدمتك ومساعدتك في إدارة سنترك التعليمي</p>
                </div>
                <div className="col-md-6">
                    <form>
                        <input type="text" className={`${styles['form-custom']} form-control mb-3`} placeholder="الاسم الكامل" required />
                        <input dir="rtl" type="tel" className={`${styles['form-custom']} form-control mb-3`} placeholder="رقم الهاتف" required />
                        <textarea className={`${styles['form-custom']} form-control mb-3`} rows="4" placeholder="اكتب رسالتك..." required />
                        <button type="submit" className="btn btn-warning w-100 fw-bold">
                            إرسال
                        </button>
                    </form>

                    <div className={`mt-4 ${styles.contactInfo}`}>
                        <div className="d-flex align-items-center mb-2">
                            <FaPhoneAlt className="ms-2 " />
                            <span>01551212431</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                            <FaWhatsapp className="ms-2" />
                            <a
                                href="https://wa.me/201551212431"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${styles['text-decoration-none']} text-decoration-none`}
                            >
                                واتساب: 01551212431
                            </a>
                        </div>

                        <div className="d-flex align-items-center mb-2">
                            <FaEnvelope className="ms-2 " />
                            <span>support@yourcenter.com</span>
                        </div>
                        <p className="mt-2">متاحين يوميًا من 9 صباحًا إلى 6 مساءً</p>
                    </div>
                </div>
                {/* Image */}
                <div className="col-md-6 mb-4 mb-md-0">
                    <Image
                        src="/images/contact.jpg" // ضع صورة داخل public/contact-image.png
                        alt="Contact Us"
                        className="img-fluid rounded"
                        width={500}
                        height={400}
                    />
                </div>
            </div>
        </section>
    );
}
