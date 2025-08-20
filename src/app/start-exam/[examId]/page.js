"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../supabaseClient";

export default function RegisterStudentPage() {
    const { examId } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    // ✅ مرجع لمنع تكرار التنفيذ
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const registerStudent = async () => {
            const storedCode = localStorage.getItem("student_code");
            const storedName = localStorage.getItem("student_name");

            if (!storedCode || !storedName || !examId) {
                alert("بيانات الطالب غير موجودة. الرجاء الرجوع للصفحة السابقة.");
                router.push("/start-exam");
                return;
            }

            const studentCode = storedCode.trim();
            const studentName = storedName.trim();

            try {
                // ✅ تحقق إذا الطالب موجود
                const { data: existing, error: checkError } = await supabase
                    .from("exam_students")
                    .select("id")
                    .eq("student_code", studentCode)
                    .eq("exam_id", examId)
                    .limit(1);

                if (checkError) throw checkError;

                if (existing && existing.length > 0) {
                    alert("لقد قمت بدخول هذا الامتحان من قبل ولا يمكنك الدخول مرة أخرى.");
                    router.push("/start-exam");
                    return;
                }

                // ✅ تسجيل الطالب
                const { data, error } = await supabase
                    .from("exam_students")
                    .insert([
                        {
                            student_name: studentName,
                            student_code: studentCode,
                            exam_id: examId,
                        },
                    ])
                    .select()
                    .single();

                if (error) throw error;

                localStorage.setItem("exam_student", JSON.stringify(data));
                router.push(`/start-exam/${examId}/exam`);
            } catch (err) {
                console.error("❌ خطأ:", err);
                alert("حدث خطأ أثناء تسجيل الدخول للامتحان: " + err.message);
                router.push("/start-exam");
            } finally {
                setLoading(false);
            }
        };

        registerStudent();
    }, [examId, router]);

    return (
        <div className="container mt-5 text-center">
            <h4>جاري تسجيل الدخول للامتحان...</h4>
            {loading && <div className="spinner-border text-primary mt-3" role="status"></div>}
        </div>
    );
}
