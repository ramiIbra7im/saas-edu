"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import { supabase } from "../supabaseClient";
import { FaUser, FaLock } from "react-icons/fa";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [teacherName, setTeacherName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (signInError) {
                const err = signInError.message;
                if (err.includes("Invalid login credentials")) {
                    setError("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
                } else if (err.includes("Email not confirmed")) {
                    setError("يرجى التحقق من بريدك الإلكتروني أولاً.");
                } else {
                    setError("حدث خطأ أثناء تسجيل الدخول: " + err);
                }
                return;
            }

            const { user } = data;
            if (!user?.email_confirmed_at) {
                setError("يرجى تفعيل بريدك الإلكتروني قبل تسجيل الدخول.");
                return;
            }

            const { data: profile, error: profileError } = await supabase
                .from("profiles")
                .select("role, teacher_name")
                .eq("id", user.id)
                .single();

            if (profileError || !profile) {
                setError("حدث خطأ أثناء جلب بيانات المستخدم.");
                return;
            }

            setTeacherName(profile.teacher_name);

            if (profile.role === "teacher") {
                router.push("/teacher/dashboard");
            } else if (profile.role === "center") {
                router.push("/center/dashboard");
            } else {
                router.push("/");
            }
        } catch (err) {
            setError("حدث خطأ غير متوقع.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`container-fluid ${styles.loginPage}`} dir="ltr">
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className={`card shadow col-md-6 overflow-hidden ${styles.loginCard}`}>
                    <div className="row g-0">
                        {/* الصورة على الشمال */}
                        <div className="col-md-6 d-none d-md-block position-relative">
                            <Image
                                src="/images/login.jpg"
                                alt="صورة الدخول"
                                fill
                                className={styles.loginImage}
                            />
                        </div>

                        {/* نموذج تسجيل الدخول على اليمين */}
                        <div className="col-md-6 d-flex align-items-center justify-content-center">
                            <form onSubmit={handleSubmit} className={`w-100 p-4 ${styles.formBox}`}>
                                <h2 className="fw-bold text-center mb-3">تسجيل الدخول</h2>
                                <p className="text-center text-muted mb-4">قم بتسجيل الدخول للمتابعة</p>

                                <div className="mb-3">
                                    <div className={`${styles["input-group"]} input-group`}>
                                        <span className={`${styles["input-group-text"]} input-group-text`}>
                                            <FaUser />
                                        </span>
                                        <input
                                            dir="rtl"
                                            type="email"
                                            className={`${styles["form-control"]} form-control`}
                                            placeholder="البريد الإلكتروني"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className={`${styles["input-group"]} input-group`}>
                                        <span className={`${styles["input-group-text"]} input-group-text`}>
                                            <FaLock />
                                        </span>
                                        <input
                                            dir="rtl"
                                            type="password"
                                            className={`${styles["form-control"]} form-control`}
                                            placeholder="كلمة المرور"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="text-center mb-3">
                                    <button
                                        type="submit"
                                        className={`btn ${styles.loginButton} shadow`}
                                        disabled={loading}
                                    >
                                        {loading ? "جاري الدخول..." : "تسجيل الدخول"}
                                    </button>
                                </div>

                                {error && <p className="text-danger text-center fw-bold">{error}</p>}
                                {teacherName && (
                                    <p className="text-success text-center">مرحبًا، {teacherName}</p>
                                )}

                                <p className="text-center fw-bold mt-4">ليس لدي حساب</p>
                                <div className="d-grid mb-3">
                                    <button
                                        type="button"
                                        onClick={() => router.push("/register")}
                                        className={`btn ${styles.resButton} shadow`}
                                    >
                                        سجل الآن
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
