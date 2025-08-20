"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../supabaseClient";

export default function ExamResultPage() {
    const { studentId } = useParams();
    const [student, setStudent] = useState(null);
    const [correctCount, setCorrectCount] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [loading, setLoading] = useState(true);
    const [scoreSaved, setScoreSaved] = useState(false);

    useEffect(() => {
        const fetchResult = async () => {
            setLoading(true);

            // ✅ جلب بيانات الطالب
            const { data: studentData, error: studentError } = await supabase
                .from("exam_students")
                .select("*")
                .eq("id", studentId)
                .single();

            if (studentError || !studentData) {
                alert("لم يتم العثور على بيانات الطالب");
                setLoading(false);
                return;
            }

            setStudent(studentData);

            // ✅ جلب إجابات الطالب
            const { data: answers, error: answersError } = await supabase
                .from("student_answers")
                .select("is_correct")
                .eq("student_id", studentId);

            if (answersError) {
                alert("خطأ في جلب نتائج الطالب");
                setLoading(false);
                return;
            }

            const correct = answers.filter(
                (a) => a.is_correct === true || a.is_correct === "true"
            ).length;

            const total = answers.length;
            const score = total > 0 ? Math.round((correct / total) * 100) : 0;

            setCorrectCount(correct);
            setTotalQuestions(total);

            // ✅ حفظ النتيجة
            await saveExamScore(studentData.student_id, score);

            setLoading(false);
        };

        if (studentId) fetchResult();
    }, [studentId]);

    // ✅ حفظ النتيجة في جدول student_monthly_data
    const saveExamScore = async (studentId, score) => {
        if (scoreSaved) return;

        const currentMonth = new Date().getMonth() + 1;
        const today = new Date().toISOString().split("T")[0];

        const safeScore = typeof score === "number" ? score : 0;

        const { data, error } = await supabase
            .from("student_monthly_data")
            .upsert(
                [
                    {
                        student_id: studentId,
                        month: currentMonth,
                        type: "exam",
                        date: today,
                        is_paid: false,
                        exam_score: safeScore,
                        amount_paid: null,
                    },
                ],
                { onConflict: ['student_id', 'month', 'type'] }
            );

    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <h4>جارٍ تحميل النتيجة...</h4>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h3 className="mb-4">نتيجة الامتحان</h3>
            <p><strong>اسم الطالب:</strong> {student?.student_name}</p>
            <p><strong>عدد الأسئلة:</strong> {totalQuestions}</p>
            <p><strong>عدد الإجابات الصحيحة:</strong> {correctCount}</p>
            <p><strong>الدرجة:</strong> {totalQuestions > 0 ? `${(correctCount / totalQuestions * 100).toFixed(2)}%` : "0%"}</p>

            {scoreSaved && (
                <div className="alert alert-success mt-4">
                    ✅ تم حفظ نتيجة الطالب في قاعدة البيانات.
                </div>
            )}
        </div>
    );
}
