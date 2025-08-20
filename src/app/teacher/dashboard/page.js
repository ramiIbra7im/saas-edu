"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";

export default function TeacherDashboardHome() {
    const [studentCount, setStudentCount] = useState(0);
    const [teacherName, setTeacherName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError || !user) {
                console.error("فشل في جلب المستخدم", userError);
                return;
            }

            const { data: profileData } = await supabase
                .from("profiles")
                .select("teacher_name")
                .eq("id", user.id)
                .single();

            if (profileData?.teacher_name) {
                setTeacherName(profileData.teacher_name);
            }

            const { count } = await supabase
                .from("students")
                .select("*", { count: "exact", head: true })
                .eq("teacher_id", user.id);

            setStudentCount(count || 0);
        };

        fetchData();
    }, []);

    return (
        <div className="container py-5">
            <h2 className="mb-4 text-center">لوحة تحكم المدرس</h2>

            <div className="row g-4 justify-content-center">
                {/* عدد الطلاب */}
                <div className="col-md-5">
                    <div className="card shadow-sm border-0 rounded-4 bg-light-subtle">
                        <div className="card-body d-flex align-items-center gap-3">
                            <div className="icon bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: "60px", height: "60px", fontSize: "24px" }}>
                                <FaUserGraduate />
                            </div>
                            <div>
                                <h6 className="mb-1 text-muted">عدد الطلاب</h6>
                                <h4 className="mb-0 fw-bold">{studentCount}</h4>
                            </div>
                        </div>
                    </div>
                </div>

                {/* اسم المدرس */}
                <div className="col-md-5">
                    <div className="card shadow-sm border-0 rounded-4 bg-light-subtle">
                        <div className="card-body d-flex align-items-center gap-3">
                            <div className="icon bg-success text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: "60px", height: "60px", fontSize: "24px" }}>
                                <FaChalkboardTeacher />
                            </div>
                            <div>
                                <h6 className="mb-1 text-muted">اسم المدرس</h6>
                                <h5 className="mb-0 fw-semibold">
                                    {teacherName || "جارٍ التحميل..."}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
