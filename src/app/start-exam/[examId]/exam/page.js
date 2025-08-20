"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../supabaseClient";

export default function ExamPage() {
    const { examId } = useParams();
    const router = useRouter();

    const [student, setStudent] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // تحميل بيانات الطالب
    useEffect(() => {
        const storedStudent = localStorage.getItem("exam_student");
        if (!storedStudent) {
            alert("لم يتم العثور على بيانات الطالب");
            router.push("/start-exam");
            return;
        }
        setStudent(JSON.parse(storedStudent));
    }, [router]);

    // تحميل الأسئلة
    useEffect(() => {
        const fetchQuestions = async () => {
            const { data, error } = await supabase
                .from("questions")
                .select("*")
                .eq("exam_id", examId)
                .order("created_at", { ascending: true });

            if (error) {
                console.error("خطأ في تحميل الأسئلة:", error);
                return;
            }

            setQuestions(data);
            setLoading(false);
        };

        if (examId) fetchQuestions();
    }, [examId]);

    // مؤقت 30 ثانية
    useEffect(() => {
        if (questions.length === 0 || currentIndex >= questions.length) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev === 1) {
                    clearInterval(timer);
                    handleAnswer(null); // لو الوقت خلص بدون إجابة
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentIndex, questions]);

    // إرسال الإجابة
    const handleAnswer = async (selectedKey) => {
        if (submitting) return;
        setSubmitting(true);

        const currentQuestion = questions[currentIndex];

        const isCorrect = selectedKey === currentQuestion.correct_option;

        const { error } = await supabase.from("student_answers").insert([
            {
                student_id: student.id,
                question_id: currentQuestion.id,
                selected_option: selectedKey, // a / b / c / d
                is_correct: isCorrect,
            },
        ]);

        if (error) {
            console.error("❌ خطأ أثناء حفظ الإجابة:", error);
        }

        setTimeout(() => {
            setSubmitting(false);
            setTimeLeft(30);
            if (currentIndex + 1 < questions.length) {
                setCurrentIndex(currentIndex + 1);
            } else {
                router.push(`/start-exam/exam-result/${student.id}`);
            }
        }, 500);
    };

    if (loading || !student) {
        return (
            <div className="container mt-5 text-center">
                <h4>جارٍ تحميل الأسئلة...</h4>
            </div>
        );
    }

    if (currentIndex >= questions.length) {
        return (
            <div className="container mt-5 text-center">
                <h4>تم الانتهاء من الامتحان</h4>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];

    return (
        <div className="container mt-5">
            <div className="mb-3">
                <h5>السؤال {currentIndex + 1} من {questions.length}</h5>
                <p>{currentQuestion.question_text}</p>
            </div>

            <div className="mb-3">
                {["a", "b", "c", "d"].map((key) => {
                    const option = currentQuestion[`option_${key}`];
                    if (!option) return null;

                    return (
                        <button
                            key={key}
                            className="btn btn-outline-primary d-block mb-2 w-100"
                            disabled={submitting}
                            onClick={() => handleAnswer(key)}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>

            <div className="text-center">
                <p>الوقت المتبقي: <strong>{timeLeft} ثانية</strong></p>
            </div>
        </div>
    );
}
