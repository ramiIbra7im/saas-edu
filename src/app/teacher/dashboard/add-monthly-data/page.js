"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";

export default function AttendancePage() {
    const { user } = useAuth();
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});
    const [loading, setLoading] = useState(false);
    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        const fetchStudents = async () => {
            if (!user) return;

            const { data, error } = await supabase
                .from("students")
                .select("id, name")
                .eq("teacher_id", user.id);

            if (error) {
                toast.error("خطأ في جلب الطلاب");
                return;
            }

            const defaultAttendance = {};
            data.forEach((s) => {
                defaultAttendance[s.id] = "present";
            });

            setStudents(data);
            setAttendance(defaultAttendance);
        };

        fetchStudents();
    }, [user]);

    const handleChange = (id, status) => {
        setAttendance({ ...attendance, [id]: status });
    };

    const handleSubmit = async () => {
        setLoading(true);

        const records = Object.entries(attendance).map(([student_id, status]) => ({
            student_id,
            date: today,
            status,
            teacher_id: user.id,
        }));

        const { error } = await supabase
            .from("student_attendance")
            .upsert(records, { onConflict: ["student_id", "date"] });

        if (error) {
            toast.error("حدث خطأ أثناء حفظ الغياب");
        } else {
            toast.success("تم حفظ الغياب بنجاح");
        }

        setLoading(false);
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">تسجيل الغياب اليومي - {today}</h2>

            {students.length === 0 ? (
                <p>لا يوجد طلاب</p>
            ) : (
                <form>
                    <table className="table table-bordered text-center">
                        <thead className="table-light">
                            <tr>
                                <th>الاسم</th>
                                <th>الحالة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>
                                        <select
                                            className="form-select"
                                            value={attendance[student.id]}
                                            onChange={(e) =>
                                                handleChange(student.id, e.target.value)
                                            }
                                        >
                                            <option value="present">حاضر</option>
                                            <option value="absent">غائب</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button
                        type="button"
                        className="btn btn-primary mt-3"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "جارٍ الحفظ..." : "حفظ الغياب"}
                    </button>
                </form>
            )}
        </div>
    );
}
