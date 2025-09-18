"use client"
import Image from "next/image";
import heroImage from "../../public/hero.png";
import styles from "./styles/hero.module.css"; // هننشئ ملف الأنيميشن هنا
import { motion } from "framer-motion"; // لازم يكون مركب

export default function HeroSection() {
    return (
        <section className={`vh-100 d-flex align-items-center justify-content-center ${styles.heroBackground}`}>
            <div className="container">
                <div className="row align-items-center">
                    {/* النص */}
                    <motion.div
                        className="col-md-6 text-end text-md-end mb-4 mb-md-0"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="display-4 fw-bold">تجربة تعليمية وإدارية متطورة</h1>
                        <p className="lead text-muted">
                            نقدم لك تجربة إدارية متكاملة تمكّنك من إدارة مركزك التعليمي بسهولة وكفاءة،
                            لتوفّر وقتك وجهدك، وتنطلق نحو النجاح والتميّز.
                        </p>
                        <div className="d-flex gap-3 justify-content-center justify-content-md-start mt-4">
                            <a href="/register" className="btn btn-primary btn-lg">
                                جرّب الآن مجانًا
                            </a>
                            <a href="#features" className="btn btn-outline-primary btn-lg">
                                مميزات النظام
                            </a>
                        </div>
                    </motion.div>

                    {/* الصورة */}
                    <motion.div
                        className="col-md-6 text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <Image
                            src={heroImage}
                            alt="Hero"
                            className="img-fluid"
                            priority
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
