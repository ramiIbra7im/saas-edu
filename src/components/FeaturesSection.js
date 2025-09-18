"use client";

import {
    FaUserTie, FaCalendarCheck, FaMoneyCheckAlt, FaChartLine,
    FaUser, FaEnvelope, FaUniversalAccess, FaCalendarPlus,
    FaClipboardList, FaTrophy, FaHandsHelping
} from "react-icons/fa";
import styles from "./styles/FeaturesSection.module.css";
import { motion } from "framer-motion";

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" }
    }),
};

export default function FeaturesSection() {
    const features = [
        { icon: <FaUserTie size={40} className={`${styles.icon} mb-3`} />, title: "إدارة متكاملة", desc: "تحكم كامل في الطلاب، الكورسات، المدرسين والمدفوعات." },
        { icon: <FaCalendarCheck size={40} className={`${styles.icon} mb-3`} />, title: "متابعة الحضور", desc: "سجّل الحضور والغياب بسهولة مع تقارير تلقائية." },
        { icon: <FaMoneyCheckAlt size={40} className={`${styles.icon} mb-3`} />, title: "نظام دفع ذكي", desc: "تابع المدفوعات والاشتراكات بكل شفافية وسهولة." },
        { icon: <FaChartLine size={40} className={`${styles.icon} mb-3`} />, title: "تقارير فورية", desc: "تحليلات فورية لتتبع الأداء والنمو في السنتر الخاص بك." },
        { icon: <FaUser size={40} className={`${styles.icon} mb-3`} />, title: "مجتمع ملئ بالتحدي", desc: "كن متواجد ضمن المزيد من المعلمين في مجتمعنا ومتابعه كل جديد." },
        { icon: <FaEnvelope size={40} className={`${styles.icon} mb-3`} />, title: "التواصل مع اولياء الامور", desc: "سهولة التواصل مع اولياء الأمور وتتبع مستوى الطالب." },
        { icon: <FaUniversalAccess size={40} className={`${styles.icon} mb-3`} />, title: "سهولة الوصول", desc: "سهولة التحكم في كل شيء بدون سابق خبرة." },
        { icon: <FaCalendarPlus size={40} className={`${styles.icon} mb-3`} />, title: "إنشاء الامتحانات", desc: "يمكن إنشاء امتحانات بنظام صارم لمنع الغش ورصد الدرجات آليًا." },
        { icon: <FaTrophy size={40} className={`${styles.icon} mb-3`} />, title: "المسابقات بين السناتر", desc: "تقوم المنصة بإنشاء وتنظيم مسابقات بين سنترك والسناتر الأخرى." },
        { icon: <FaClipboardList size={40} className={`${styles.icon} mb-3`} />, title: "سجل الحضور الكامل", desc: "أرشفة كاملة لكل الحضور والغياب مع إرسال إشعارات لأولياء الأمور." },
        { icon: <FaHandsHelping size={40} className={`${styles.icon} mb-3`} />, title: "دعم العملاء 24/7", desc: "فريق دعم جاهز للمساعدة في أي وقت." },
    ];

    return (
        <section className="py-5" id="features" dir="rtl">
            <div className="container text-center">
                <h2 className={`${styles['title-section']} mb-5 fw-bold display-6`}>ما الذي يميز منصتنا؟</h2>
                <div className="row g-4">
                    {features.map((feature, idx) => (
                        <div key={idx} className="col-md-6 col-lg-3">
                            <motion.div
                                className={`${styles.features} p-4 shadow-sm border rounded h-100`}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={idx}
                            >
                                {feature.icon}
                                <h5 className="fw-bold mb-2">{feature.title}</h5>
                                <p className="text-muted">{feature.desc}</p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
