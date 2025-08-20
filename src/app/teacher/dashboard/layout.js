'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import styles from './sidebar.module.css';
import { FaList } from "react-icons/fa";
import { supabase } from "../../supabaseClient"; // عدّل المسار حسب مجلدك

export default function TeacherDashboardLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const links = [
        { name: "الرئيسية", href: "/teacher/dashboard" },
        { name: "إضافة طالب", href: "/teacher/dashboard/add-student" },
        { name: "بيانات الطلاب", href: "/teacher/dashboard/students" },
        { name: "المجموعات", href: "/teacher/dashboard/groups" },
        { name: " ارشيف الطلاب", href: "/teacher/dashboard/students/archive" },
        { name: "تسجيل الغياب", href: "/teacher/dashboard/add-monthly-data" },
        { name: "تحصيل المصروفات", href: "/teacher/dashboard/fees" },
        { name: "إنشاء امتحان", href: "/teacher/dashboard/exams/create" },
        { name: "عمل كارت لطلاب ", href: "/teacher/dashboard/student-card" },
        { name: "الاعدادات", href: "/teacher/dashboard/setting" },
        { name: "بدء الامتحان", href: "/start-exam" },
    ];

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login"); // أو "/login" حسب ما تحب
    };

    return (
        <div className={styles.dashboardContainer}>
            {/* Sidebar */}
            <div className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
                <h4 className="text-center mb-4">لوحة التحكم</h4>
                <ul className="nav flex-column">
                    {links.map((link) => (
                        <li key={link.href} className="nav-item mb-2">
                            <Link
                                href={link.href}
                                className={`nav-link ${pathname === link.href ? "active fw-bold text-primary" : "text-dark"}`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}

                </ul>
                {/* زر تسجيل الخروج */}
                <div className="mt-auto">
                    <button
                        onClick={handleLogout}
                        className="btn btn-outline-danger w-100"
                    >
                        تسجيل الخروج
                    </button>
                </div>
            </div>

            {/* محتوى الصفحة */}
            <div className={styles.pageContent}>
                {/* الزر في الموبايل */}
                <div className={`${styles.toggleButton} d-md-none`}>
                    <button className="btn btn-outline-primary" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <FaList />
                    </button>
                </div>
                <div className="p-3">
                    {children}
                </div>
            </div>
        </div>
    );
}
