// components/JoinSection.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import heroImage from "../../public/hero.png";
import styles from './styles/FeaturesSection.module.css';

export default function JoinSection() {
    return (
        <section className={`py-5  container ${styles.joinSectionModern} `}>
            <div className="container">
                <div className="row align-items-center">


                    {/* المحتوى */}
                    <div className="col-lg-7">
                        <h2 className="fw-bold mb-4 display-6">
                            ابدأ رحلتك في <span className={styles.textdigital}>التحول الرقمي</span> الآن!
                        </h2>

                        <div className="row g-3 mb-4">
                            {[
                                "سهولة وسرعة الاستخدام",
                                "تقنيات حديثة لمتابعة الطالب",
                                "شفافية وتقارير لحظية",
                                "واجهة استخدام بسيطة"
                            ].map((item, index) => (
                                <div key={index} className="col-sm-6">
                                    <div className={`${styles.cardFeature} p-3 h-100 rounded shadow-sm`}>
                                        <h5 className="mb-0">{item}</h5>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link
                            href="/register"
                            className={`btn btn-lg ${styles.btnModern}`}
                        >
                            سجّل الآن وابدأ مجانًا
                        </Link>
                    </div>
                    {/* الصورة الثابتة */}
                    <div className="col-lg-5 mb-4 mb-lg-0 text-center">
                        <Image
                            src={heroImage}
                            alt="التحول الرقمي"
                            className="img-fluid rounded "
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
