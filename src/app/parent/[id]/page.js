'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import styles from "../../teacher/dashboard/students/archive/ArchivePage.module.css";
import { FaUserCircle } from 'react-icons/fa';

export default function ParentPage({ params }) {
    const studentId = params.id;

    const [student, setStudent] = useState(null);
    const [monthlyData, setMonthlyData] = useState([]);
    const [attendanceStats, setAttendanceStats] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!studentId) return;

        const fetchData = async () => {
            setLoading(true);
            setError('');

            const { data: studentData, error: studentError } = await supabase
                .from("students")
                .select("*")
                .eq("id", studentId)
                .single();

            if (studentError || !studentData) {
                setError("لم يتم العثور على الطالب.");
                setLoading(false);
                return;
            }

            setStudent(studentData);

            const { data: monthData } = await supabase
                .from("student_monthly_data")
                .select("month, is_paid, exam_score")
                .eq("student_id", studentId)
                .order("month", { ascending: false });

            setMonthlyData(monthData || []);

            const { data: attData } = await supabase
                .from("student_attendance")
                .select("status")
                .eq("student_id", studentId)
                .gte("date", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split("T")[0]);

            const presentDays = attData?.filter(a => a.status === "present").length || 0;
            const absentDays = attData?.filter(a => a.status === "absent").length || 0;

            setAttendanceStats({ presentDays, absentDays });
            setLoading(false);
        };

        fetchData();
    }, [studentId]);

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

    if (loading) return <p className="text-center mt-5">جارٍ التحميل...</p>;
    if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;

    return (
        <div className="container py-4">
            <h2 className="mb-5 text-center fw-bold">بيانات الطالب لولي الأمر</h2>

            <div className="row align-items-stretch">
                {/* كارت معلومات الطالب */}
                <div className="col-md-6">
                    <div className={`${styles["card-user"]} shadow-sm p-3 h-100 d-flex flex-row align-items-center`}>
                        <div className="me-4">
                            <FaUserCircle className={`${styles["icon-user"]}`} />
                        </div>
                        <div className="me-3">
                            <h3 className={`${styles['title-card']} fw-bold mb-3`}>{student.name}</h3>
                            <p className="mb-1"><strong>السنة الدراسية:</strong> {student.grade}</p>
                            <p className="mb-1"><strong>رقم ولي الأمر:</strong> {student.parent_phone}</p>
                            <p className="mb-0 text-muted">
                                <strong>تاريخ التسجيل:</strong>{" "}
                                {new Date(student.created_at).toLocaleDateString("ar-EG", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* كروت الحضور والغياب والدفع والامتحان */}
                <div className="col-md-6">
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
            </div>

            <h5 className="mt-4">سجل الدفع والامتحانات:</h5>
            {monthlyData.length === 0 ? (
                <p>لا توجد بيانات متاحة.</p>
            ) : (
                <table className="table table-bordered text-center mt-3">
                    <thead className="table-light">
                        <tr>
                            <th>الشهر</th>
                            <th>الدفع</th>
                            <th>درجة الامتحان</th>
                        </tr>
                    </thead>
                    <tbody>
                        {monthlyData.map((row, index) => (
                            <tr key={index}>
                                <td>{new Date(row.month).toLocaleDateString("ar-EG", { year: "numeric", month: "long" })}</td>
                                <td>{row.is_paid ? "تم الدفع" : "لم يُدفع"}</td>
                                <td>{row.exam_score ?? "لم يتم التقييم"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
