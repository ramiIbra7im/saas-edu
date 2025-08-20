'use client';

import { useEffect, useState } from 'react';
import styles from './styles/SchoolHeroSection.module.css';
import { FaUserPlus, FaChalkboardTeacher, FaUsers, FaChartBar, FaChevronDown } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const steps = [
    {
        title: 'سجل حسابك',
        icon: <FaUserPlus size={40} className="text-primary mb-3" />,
        desc: 'ابدأ بإنشاء حساب لمركزك التعليمي خلال ثواني معدودة.',
        details: 'التسجيل يتم عبر البريد الإلكتروني ورقم الموبايل. بمجرد التسجيل، تقدر تبدأ في إعداد سنترك فورًا.'
    },
    {
        title: 'أنشئ الفصول',
        icon: <FaChalkboardTeacher size={40} className="text-primary mb-3" />,
        desc: 'أضف المواد، الفصول، والمدرسين بسهولة.',
        details: 'حدد مواعيد الحصص، أربط المدرسين، وعدل الجدول حسب الحاجة.'
    },
    {
        title: 'أضف الطلاب',
        icon: <FaUsers size={40} className="text-primary mb-3" />,
        desc: 'سجل الطلاب في فصولهم وتابع حضورهم.',
        details: 'أدخل بيانات الطالب يدويًا أو استوردهم من ملف Excel بسهولة.'
    },
    {
        title: 'تابع الأداء',
        icon: <FaChartBar size={40} className="text-primary mb-3" />,
        desc: 'راقب الحضور، المدفوعات، والتقارير التفصيلية.',
        details: 'تقدر تشوف كل طالب دفع إيه، حضر إمتى، ومدى التفاعل مع كل مادة.'
    }
];

export default function SchoolHowItWorksSection() {
    const [activeStep, setActiveStep] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 800 });
    }, []);

    return (
        <section className={`${styles.howItWorksSection} py-5`}>
            <div className="container text-center">
                <h2 className="fw-bold mb-4">كيف تعمل منصتنا؟</h2>
                <p className="mb-5 text-muted">4 خطوات بسيطة لإدارة سنترك بسهولة واحترافية</p>

                <div className="row gy-4">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="col-md-3"
                            data-aos="fade-up"
                            data-aos-delay={index * 150}
                        >
                            <div
                                className={`p-4 rounded shadow-sm ${styles.card} ${activeStep === index ? styles.activeCard : ''
                                    }`}
                                onClick={() =>
                                    setActiveStep(activeStep === index ? null : index)
                                }
                            >
                                {step.icon}
                                <h5 className="fw-bold d-flex justify-content-center align-items-center gap-2">
                                    {index + 1}. {step.title}
                                    <FaChevronDown
                                        className={`${styles.arrowIcon} ${activeStep === index ? styles.rotateArrow : ''
                                            }`}
                                    />
                                </h5>
                                <p className="text-muted">{step.desc}</p>

                                <div
                                    className={`${styles.detailsSection} ${activeStep === index ? styles.open : ''
                                        }`}
                                >
                                    <hr />
                                    <p className="text-muted small text-start">{step.details}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
