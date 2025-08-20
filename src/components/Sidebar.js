"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTachometerAlt, FaUsers, FaBoxOpen, FaChartBar, FaCog, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import styles from './styles/sidebar.module.css';

const navItems = [
    { title: "لوحة التحكم", href: "/dashboard", icon: <FaTachometerAlt /> },
    { title: "المستخدمين", href: "/dashboard/users", icon: <FaUsers /> },
    { title: "الطلبات", href: "/dashboard/orders", icon: <FaBoxOpen /> },
    { title: "التقارير", href: "/dashboard/reports", icon: <FaChartBar /> },
    { title: "الإعدادات", href: "/dashboard/settings", icon: <FaCog /> },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* زر الهامبرغر */}
            <div className="d-md-none p-3 border-bottom d-flex justify-content-between align-items-center">
                <h5 className="mb-0">لوحة التحكم</h5>
                <FaBars className="fs-4" onClick={() => setOpen(true)} style={{ cursor: 'pointer' }} />
            </div>

            {/* الخلفية عند الفتح */}
            {open && <div className={styles.backdrop} onClick={() => setOpen(false)}></div>}

            <aside className={`${styles.sidebar} ${open ? styles.show : ""}`}>
                {/* زر إغلاق */}
                <div className="d-flex d-md-none justify-content-end p-3">
                    <FaTimes className="fs-4" onClick={() => setOpen(false)} style={{ cursor: 'pointer' }} />
                </div>

                <h5 className="mb-4 fw-bold text-center d-none d-md-block">لوحة التحكم</h5>
                <ul className="nav flex-column gap-2 px-3">
                    {navItems.map((item, i) => (
                        <li key={i}>
                            <Link
                                href={item.href}
                                className={`nav-link d-flex align-items-center gap-2 ${pathname === item.href ? "active fw-bold text-primary" : "text-dark"
                                    }`}
                                onClick={() => setOpen(false)}
                            >
                                {item.icon}
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>
        </>
    );
}
