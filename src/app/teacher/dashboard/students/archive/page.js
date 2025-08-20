"use client";

import React, { useState } from "react";
import { supabase } from "../../../../supabaseClient";
import styles from "./ArchivePage.module.css";
import { FaUserCircle } from "react-icons/fa";

export default function ArchivePage() {
    const [barcode, setBarcode] = useState("");
    const [student, setStudent] = useState(null);
    const [monthlyData, setMonthlyData] = useState([]);
    const [attendanceStats, setAttendanceStats] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        setError("");
        setStudent(null);
        setMonthlyData([]);
        setAttendanceStats(null);

        if (!barcode.trim()) {
            setError("يرجى إدخال الباركود.");
            return;
        }

        const { data: students, error: studentError } = await supabase
            .from("students")
            .select("*");

        if (studentError || !students || students.length === 0) {
            setError("حدث خطأ أثناء تحميل البيانات.");
            return;
        }

        const matchedStudent = students.find((s) =>
            s.id === barcode || s.id.startsWith(barcode)
        );

        if (!matchedStudent) {
            setError("لم يتم العثور على الطالب.");
            return;
        }

        const studentData = matchedStudent;
        setStudent(studentData);

        const { data: dataList, error: dataError } = await supabase
            .from("student_monthly_data")
            .select("month, is_paid, exam_score")
            .eq("student_id", studentData.id)
            .order("month", { ascending: false });

        if (dataError) {
            setError("حدث خطأ أثناء تحميل الأرشيف.");
        } else {
            setMonthlyData(dataList);
        }

        const { data: attendanceData, error: attendanceError } = await supabase
            .from("student_attendance")
            .select("status")
            .eq("student_id", studentData.id)
            .gte("date", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split("T")[0]);

        if (!attendanceError && attendanceData) {
            const presentDays = attendanceData.filter((a) => a.status === "present").length;
            const absentDays = attendanceData.filter((a) => a.status === "absent").length;
            setAttendanceStats({ presentDays, absentDays });
        }
    };

    const renderCard = (title, value) => (
        <div className="col-12 col-sm-6 g-3 d-flex align-items-center justify-content-center">
            <div className={`card ${styles.cardItem} shadow-sm w-100 border-0`}>
                <div className="card-body text-center">
                    <h6 className={styles.cardTitle}>{title}</h6>
                    <p className={styles.cardValue}>{value}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container py-4">
            <h2 className="mb-5 text-center fw-bold">عرض أرشيف الطالب</h2>

            <div className="mb-3 row">
                <div className="col-md-6">
                    <input
                        type="text"
                        className={`${styles["form-control"]} form-control`}
                        placeholder="أدخل الباركود"
                        value={barcode}
                        onChange={(e) => setBarcode(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <button className={`${styles["btn-coustom"]} btn col-md-4`} onClick={handleSearch}>
                        بحث
                    </button>
                </div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {student && (
                <>
                    <div className="row align-items-stretch">
                        <div className="col-md-6 ">
                            <div className={`${styles["card-user"]} shadow-sm p-3 h-100 d-flex flex-row align-items-center`}>
                                <div className="me-4">
                                    <FaUserCircle className={`${styles["icon-user"]}`} />
                                </div>
                                <div className="me-3">
                                    <h3 className={`${styles['title-card']} fw-bold mb-3`}>{student.name}</h3>
                                    <p className="mb-1"><strong>السنة الدراسية:</strong> {student.grade}</p>
                                    <p className="mb-1"><strong>رقم ولي الأمر:</strong> {student.parent_phone}</p>
                                    <p className="mb-0 text-muted">
                                        <strong>وقت التسجيل:</strong>{" "}
                                        {new Date(student.created_at).toLocaleString("ar-EG", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 ">
                            <div className="row">
                                {attendanceStats && (
                                    <>
                                        {renderCard("عدد أيام الحضور", `${attendanceStats.presentDays} يوم`)}
                                        {renderCard("عدد أيام الغياب", `${attendanceStats.absentDays} يوم`)}
                                    </>
                                )}

                                {monthlyData.length > 0 && (
                                    <>
                                        {renderCard("آخر دفع", monthlyData[0].is_paid ? "تم الدفع" : "لم يُدفع")}
                                        {renderCard("درجة آخر امتحان", monthlyData[0].exam_score ?? "لم يتم التقييم")}
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="mt-3">
                            <p><strong>رابط المتابعة لولي الأمر:</strong></p>
                            <a
                                href={`/parent/${student.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-primary btn-sm"
                            >
                                فتح صفحة ولي الأمر
                            </a>
                        </div>
                    </div>

                    <h5 className="mt-4">سجل الدفع والامتحانات:</h5>
                    {monthlyData.length === 0 ? (
                        <p>لا توجد بيانات شهرية متاحة.</p>
                    ) : (
                        <table className="table table-bordered text-center mt-3">
                            <thead className="table-light">
                                <tr>
                                    <th>الشهر</th>
                                    <th>مصروفات</th>
                                    <th>درجة الامتحان</th>
                                </tr>
                            </thead>
                            <tbody>
                                {monthlyData.map((row, index) => (
                                    <tr key={index}>
                                        <td>
                                            {new Date(row.month).toLocaleDateString("ar-EG", {
                                                year: "numeric",
                                                month: "long",
                                            })}
                                        </td>
                                        <td>{row.is_paid ? "تم الدفع" : "لم يُدفع"}</td>
                                        <td>{row.exam_score !== null ? row.exam_score : "لم يتم التقييم"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </>
            )}
        </div>
    );
}
