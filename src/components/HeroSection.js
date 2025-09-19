"use client";

import Image from "next/image";
import heroImage from "../../public/hero.svg";
import styles from "./styles/hero.module.css";
import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <section className={`vh-100 d-flex align-items-center justify-content-center  ${styles.heroBackground}`}>
            <div className="container ">
                <div className="row align-items-center">
                    <motion.div
                        className="col-md-6 text-end mb-4 mb-md-0 position-relative"
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
                            <a href="/register" className={`${styles.btn} btn  btn-lg`}>جرّب الآن مجانًا</a>
                            <a href="#features" className={`${styles.fav} btn  btn-lg`}>مميزات النظام</a>
                        </div>
                        <motion.img
                            src="/images/balloon.png" // غيرها برابط الستيكر بتاعك
                            alt="Sticker"
                            className={`${styles.stickerballoon} position-absolute`}

                            animate={{ y: [0, -10, 0] }} // حركة عائمة بسيطة
                            transition={{ repeat: Infinity, duration: 2 }}
                        />
                    </motion.div>

                    <motion.div
                        className={`${styles.coimag} col-md-6 text-center position-relative`} // relative علشان الـsticker يكون عايش فيها
                        initial={{ opacity: 0, scale: 0.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <Image
                            src={heroImage}
                            width={1000}
                            height={1000}
                            alt="Hero"
                            className={`${styles.Image} img-fluid`}
                            priority
                        />

                        {/* Sticker */}
                        <motion.img
                            src="/images/book.png" // غيرها برابط الستيكر بتاعك
                            alt="Sticker"
                            className={`${styles.stickerbook} position-absolute`}

                            animate={{ x: [0, -15, 0] }} // حركة عائمة بسيطة
                            transition={{ repeat: Infinity, duration: 2 }}
                        />
                    </motion.div>

                </div>
            </div>

        </section>
    );
}
