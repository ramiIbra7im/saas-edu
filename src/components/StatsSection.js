'use client';

import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import styles from './styles/FeaturesSection.module.css';
import Image from "next/image";

const StatsSection = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    const stats = [
        { label: 'طالب', value: 118200, suffix: 'k+', image: '/images/student.png' },
        { label: 'مُعلم', value: 503, suffix: '+', image: '/images/teacher.svg' },
        { label: 'مجموعة', value: 2810, suffix: '+', image: '/images/group.svg' },
        { label: 'درجة اختبار', value: 812924, suffix: '+', image: '/images/score.svg' },
    ];

    return (
        <section ref={ref} className="py-5 text-center">
            <div className="container">
                <h1 className={`${styles['title-section']} mb-5 fw-bold display-6`}>الان لدينا</h1>
                <div className="row">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`col-6 col-md-3 mb-4`}
                        >
                            <div className={` ${styles['main-state']} p-4 rounded-4 shadow-sm h-100 border  position-relative text-dark hover-shadow border `}>
                                <div className="d-flex justify-content-center mb-3">
                                    <div
                                        className=" rounded-circle d-flex align-items-center justify-content-center"
                                        style={{ width: 200, height: 200 }}
                                    >
                                        <Image
                                            src={stat.image}
                                            alt={stat.label}
                                            width={200}
                                            height={200}
                                            className="img-fluid"
                                        />
                                    </div>
                                </div>
                                <h2 className="fw-bold text-white">
                                    {inView ? <CountUp end={stat.value} duration={2} separator="," /> : 0}
                                    {stat.suffix}
                                </h2>
                                <p className="fw-semibold fs-5">{stat.label}</p>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
