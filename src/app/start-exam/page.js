"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabaseClient";

export default function StudentExamEntryPage() {
    const router = useRouter();

    const [studentName, setStudentName] = useState("");
    const [studentCode, setStudentCode] = useState("");
    const [teacher, setTeacher] = useState(null);
    const [exams, setExams] = useState([]);
    const [selectedExamId, setSelectedExamId] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchStudentAndTeacher = async () => {
            if (!studentCode.trim()) return;

            const { data: student, error: studentError } = await supabase
                .from("students")
                .select("name, teacher_id, teacher:teacher_id(id, teacher_name)")
                .eq("id", studentCode.trim())
                .single();

            if (studentError || !student) {
                console.error("لم يتم العثور على الطالب", studentError);
                setTeacher(null);
                setExams([]);
                return;
            }

            setStudentName(student.name);
            setTeacher(student.teacher);

            // ✅ تحميل الامتحانات الخاصة بالمدرس
            const { data: examsData, error: examsError } = await supabase
                .from("exams")
                .select("*")
                .eq("teacher_id", student.teacher_id);

            if (examsError) {
                console.error("خطأ في تحميل الامتحانات:", examsError);
                setExams([]);
                return;
            }

            setExams(examsData);
        };

        fetchStudentAndTeacher();
    }, [studentCode]);

    const handleAccessExam = async (e) => {
        e.preventDefault();

        if (!studentName || !studentCode.trim() || !selectedExamId) {
            alert("يرجى التأكد من إدخال الكود واختيار الامتحان");
            return;
        }

        setLoading(true);

        localStorage.setItem("student_code", studentCode.trim());
        localStorage.setItem("student_name", studentName.trim());

        router.push(`/start-exam/${selectedExamId}`);
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-4">الدخول إلى الامتحان</h3>
            <form onSubmit={handleAccessExam}>
                <div className="mb-3">
                    <label className="form-label">الكود التعريفي للطالب</label>
                    <input
                        type="text"
                        className="form-control"
                        value={studentCode}
                        onChange={(e) => setStudentCode(e.target.value)}
                        required
                        placeholder="مثال: STU12345"
                    />
                </div>

                {teacher && (
                    <>
                        <div className="mb-3">
                            <label className="form-label">اسم الطالب</label>
                            <input
                                type="text"
                                className="form-control"
                                value={studentName}
                                disabled
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">اسم المدرس</label>
                            <input
                                type="text"
                                className="form-control"
                                value={teacher.teacher_name}
                                disabled
                            />
                        </div>
                    </>
                )}

                {exams.length > 0 && (
                    <div className="mb-3">
                        <label className="form-label">اختر الامتحان</label>
                        <select
                            className="form-select"
                            value={selectedExamId}
                            onChange={(e) => setSelectedExamId(e.target.value)}
                            required
                        >
                            <option value="">-- اختر الامتحان --</option>
                            {exams.map((exam) => (
                                <option key={exam.id} value={exam.id}>
                                    {exam.title}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "جاري الدخول..." : "ابدأ الامتحان"}
                </button>
            </form>
        </div>
    );
}
