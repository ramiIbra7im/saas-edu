"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../../../../supabaseClient";
import { useRouter } from "next/navigation";

export default function CreateExamPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [examMonth, setExamMonth] = useState(""); // الشهر الحالي
    const router = useRouter();

    // ✅ جلب بيانات المستخدم (المدرس) + تحديد الشهر الحالي
    useEffect(() => {
        const getUserAndMonth = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();

            if (error) {
                console.error("فشل في جلب الجلسة:", error.message);
                return;
            }

            if (session?.user) {
                setUserId(session.user.id);
            } else {
                alert("يجب تسجيل الدخول أولاً.");
                router.push("/login");
            }

            // ✅ تحديد الشهر الحالي تلقائيًا
            const currentMonthIndex = new Date().getMonth(); // 0-11
            const monthNames = [
                "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
                "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
            ];
            setExamMonth(monthNames[currentMonthIndex]);
        };

        getUserAndMonth();
    }, [router]);

    const handleCreateExam = async (e) => {
        e.preventDefault();
        if (!userId || !title.trim()) return;

        setLoading(true);

        const { data, error } = await supabase
            .from("exams")
            .insert([
                {
                    title: title.trim(),
                    description: description.trim(),
                    teacher_id: userId,
                    exam_month: examMonth,
                },
            ])
            .select()
            .single();

        setLoading(false);

        if (error) {
            alert("حدث خطأ أثناء إنشاء الامتحان، برجاء المحاولة لاحقاً.");
            console.error(error);
            return;
        }

        // ✅ التوجيه لإضافة الأسئلة
        router.push(`/teacher/dashboard/exams/${data.id}/questions`);
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-4">إنشاء امتحان جديد</h3>
            <form onSubmit={handleCreateExam}>
                <div className="mb-3">
                    <label className="form-label">عنوان الامتحان<span className="text-danger">*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="مثال: امتحان الوحدة الأولى"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">وصف (اختياري)</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="مثال: هذا الامتحان يشمل أسئلة على الوحدة الأولى"
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">شهر الامتحان</label>
                    <input
                        type="text"
                        className="form-control"
                        value={examMonth}
                        readOnly
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading || !userId}
                >
                    {loading ? "جاري الحفظ..." : "إنشاء الامتحان"}
                </button>
            </form>
        </div>
    );
}
