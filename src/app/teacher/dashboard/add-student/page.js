"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { supabase } from "@/app/supabaseClient";
import styles from "./AddStudentPage.module.css";
import { FaUserGraduate, FaPhoneAlt, FaSchool } from "react-icons/fa";

const AddStudentPage = () => {
    const [formData, setFormData] = useState({
        studentName: "",
        grade: "",
        parentPhone: "",
    });

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error || !data?.user) {
                toast.error("يرجى تسجيل الدخول");
                router.push("/login");
                return;
            }
            setUserId(data.user.id);
        };

        getUser();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.studentName || !formData.grade || !formData.parentPhone) {
            toast.error("يرجى ملء جميع الحقول");
            return;
        }

        if (!userId) {
            toast.error("المستخدم غير معروف");
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.from("students").insert([
                {
                    name: formData.studentName,
                    grade: formData.grade,
                    parent_phone: formData.parentPhone,
                    teacher_id: userId,
                },
            ]);

            if (error) throw error;

            toast.success("تم حفظ الطالب بنجاح");
            router.push("/teacher/dashboard/students");
        } catch (error) {
            console.error(error);
            toast.error("حدث خطأ أثناء الحفظ");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`container my-5`}>
            <div className={`${styles.formCard} col-md-6 col-12 m-auto shadow`}>
            <h3 className={styles.formTitle}>
                <FaUserGraduate />
                إضافة طالب جديد
            </h3>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className={styles.formLabel}>اسم الطالب</label>
                        <input
                            type="text"
                            className="form-control"
                            name="studentName"
                            value={formData.studentName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className={styles.formLabel}>المرحلة الدراسية</label>
                        <select
                            className="form-select"
                            name="grade"
                            value={formData.grade}
                            onChange={handleChange}
                            required
                        >
                            <option value="">اختر المرحلة</option>
                            <option value="الابتدائية">الابتدائية</option>
                            <option value="الإعدادية">الإعدادية</option>
                            <option value="الثانوية">الثانوية</option>
                            <option value="الأول الإعدادي">الأول الإعدادي</option>
                            <option value="الثاني الإعدادي">الثاني الإعدادي</option>
                            <option value="الثالث الإعدادي">الثالث الإعدادي</option>
                            <option value="الأول الثانوي">الأول الثانوي</option>
                            <option value="الثاني الثانوي">الثاني الثانوي</option>
                            <option value="الثالث الثانوي">الثالث الثانوي</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className={styles.formLabel}>رقم ولي الأمر</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="parentPhone"
                            value={formData.parentPhone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className={`btn ${styles.submitBtn}`} disabled={loading}>
                        {loading ? "جارٍ الحفظ..." : "حفظ الطالب"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddStudentPage;
