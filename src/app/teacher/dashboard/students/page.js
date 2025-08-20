"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { supabase } from "../../../supabaseClient";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function StudentsPage() {
    const { user } = useAuth();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            if (!user) return;

            const { data, error } = await supabase
                .from("students")
                .select("id, name, grade, parent_phone, profiles(subject, teacher_name)")
                .eq("teacher_id", user.id);

            if (error) {
                console.error("خطأ في جلب الطلاب:", error.message);
                return;
            }

            setStudents(data);
        };

        fetchStudents();
    }, [user]);

    const handleDelete = async (student) => {
        const result = await Swal.fire({
            title: "تأكيد الحذف",
            text: `هل أنت متأكد أنك تريد حذف "${student.name}"؟`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "نعم، احذف",
            cancelButtonText: "إلغاء",
            confirmButtonColor: "#E74C3C",
            cancelButtonColor: "#34495E",
        });

        if (result.isConfirmed) {
            const { error } = await supabase
                .from("students")
                .delete()
                .eq("id", student.id);

            if (error) {
                // toast.error("فشل حذف الطالب");
                console.error("خطأ الحذف:", error.message);
            } else {
                // toast.success("تم حذف الطالب بنجاح");
                setStudents((prev) => prev.filter((s) => s.id !== student.id));

                Swal.fire({
                    icon: "success",
                    title: "تم الحذف!",
                    text: `تم حذف "${student.name}" بنجاح.`,
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        }
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">الطلاب المسجلين</h2>

            {students.length === 0 ? (
                <p>لا يوجد طلاب بعد</p>
            ) : (
                <table className="table table-bordered text-center">
                    <thead className="table-light">
                        <tr>
                            <th>الاسم</th>
                            <th>السنة الدراسية</th>
                            <th>المادة</th>
                            <th>المدرس</th>
                            <th>رقم ولي الأمر</th>
                            <th>إجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((s) => (
                            <tr key={s.id}>
                                <td>{s.name}</td>
                                <td>{s.grade}</td>
                                <td>{s.profiles?.subject || "-"}</td>
                                <td>{s.profiles?.teacher_name || "-"}</td>
                                <td>{s.parent_phone || "-"}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(s)}
                                    >
                                        <FaTrashAlt /> حذف
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
