"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabaseClient";
import {
    FaEnvelope,
    FaLock,
    FaPhone,
    FaUser,
    FaEyeSlash,
    FaEye,
    FaChalkboardTeacher,
    FaBuilding,
    FaMapMarkerAlt,
    FaListUl
} from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "./register.module.css";

const RegisterClient = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [teacherName, setTeacherName] = useState("");
    const [teacherAge, setTeacherAge] = useState("");
    const [role, setRole] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [grades, setGrades] = useState("");
    const [centerName, setCenterName] = useState("");
    const [centerAddress, setCenterAddress] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const gradeOptions = [
        "الصف الأول الابتدائي",
        "الصف الثاني الابتدائي",
        "الصف الثالث الابتدائي",
        "الصف الرابع الابتدائي",
        "الصف الخامس الابتدائي",
        "الصف السادس الابتدائي",
        "الصف الأول الإعدادي",
        "الصف الثاني الإعدادي",
        "الصف الثالث الإعدادي",
        "الصف الأول الثانوي",
        "الصف الثاني الثانوي",
        "الصف الثالث الثانوي"
    ];

    const toggleGrade = (grade) => {
        const current = grades.split(",").map((g) => g.trim()).filter((g) => g);
        if (current.includes(grade)) {
            setGrades(current.filter((g) => g !== grade).join(", "));
        } else {
            setGrades([...current, grade].join(", "));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!/^[0-9]{11}$/.test(phone)) {
            setError("رقم الموبايل غير صحيح. يجب أن يكون 11 رقما.");
            return;
        }

        if (!role) {
            setError("يرجى اختيار الدور.");
            return;
        }

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: "http://localhost:3000/auth/callback"
                }
            });

            if (error) {
                setError(error.message);
                return;
            }

            const user = data?.user;
            const { error: insertError } = await supabase.from("profiles").insert([
                {
                    id: user?.id,
                    email,
                    mobile: phone,
                    role,
                    teacher_name: teacherName.trim(),
                    teacher_age: teacherAge ? parseInt(teacherAge) : null,
                    subject: subject.trim(),
                    grades: grades.split(",").map((g) => g.trim()),
                    center_name: centerName.trim(),
                    center_address: centerAddress.trim()
                }
            ]);

            if (insertError) {
                setError("حدث خطأ أثناء حفظ بيانات المستخدم.");
                return;
            }

            toast.success("تم إنشاء الحساب. يرجى التحقق من بريدك الإلكتروني.");
            router.push("/login");
        } catch (err) {
            setError("حدث خطأ غير متوقع.");
        }
    };

    return (
        <div className={`container-fluid min-vh-100 d-flex justify-content-center align-items-center ${styles.login}`}>
            <div className={`container text-center shadow  col-md-8 p-0 pb-5 ${styles["form-co"]}`}>
                <h3 className={`${styles.title} mt-3 fw-bold `}>تسجيل حساب جديد </h3>
                <p className="text-muted fw-bold">انضم الان لنظام ادراه اسهل واوفر للوقت والمجهود</p>
                <form onSubmit={handleSubmit} className="row justify-content-center mt-4 g-3 px-4">

                    {/* الاسم الكامل */}
                    <div className="col-md-6">
                        <div className={`${styles["input-group"]} input-group`}>
                            <span className={`${styles["input-group-text"]} input-group-text`}><FaUser /></span>
                            <input
                                type="text"
                                className={`${styles["form-control"]} form-control fw-bold`}
                                placeholder="الاسم الكامل"
                                value={teacherName}
                                onChange={(e) => setTeacherName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* العمر */}
                    <div className="col-md-6">
                        <div className={`${styles["input-group"]} input-group`}>
                            <span className={`${styles["input-group-text"]} input-group-text`}>ع</span>
                            <input
                                type="number"
                                className={`${styles["form-control"]} form-control fw-bold`}
                                placeholder="العمر"
                                value={teacherAge}
                                onChange={(e) => setTeacherAge(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* البريد الإلكتروني */}
                    <div className="col-md-6">
                        <div className={`${styles["input-group"]} input-group`}>
                            <span className={`${styles["input-group-text"]} input-group-text`}><FaEnvelope /></span>
                            <input
                                type="email"
                                className={`${styles["form-control"]} form-control fw-bold`}
                                placeholder="البريد الإلكتروني"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* كلمة المرور */}
                    <div className="col-md-6">
                        <div className={`${styles["input-group"]} input-group`}>
                            <button
                                type="button"
                                className={`${styles["input-group-text"]} input-group-text`}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <FaLock className="ms-2" />
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`${styles["form-control"]} form-control fw-bold`}
                                placeholder="كلمة المرور"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* رقم الموبايل */}
                    <div className="col-md-6">
                        <div className={`${styles["input-group"]} input-group`}>
                            <span className={`${styles["input-group-text"]} input-group-text`}><FaPhone /></span>
                            <input dir="rtl"
                                type="tel"
                                className={`${styles["form-control"]} form-control fw-bold`}
                                placeholder="رقم الموبايل"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* المادة */}
                    <div className="col-md-6">
                        <div className={`${styles["input-group"]} input-group`}>
                            <span className={`${styles["input-group-text"]} input-group-text`}><FaChalkboardTeacher /></span>
                            <input
                                type="text"
                                className={`${styles["form-control"]} form-control fw-bold`}
                                placeholder="المادة التي تدرسها"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* الصفوف الدراسية */}
                    <div className="col-12">
                        <label className="fw-bold mb-2">اختر الصفوف الدراسية:</label>
                        <div className="d-flex flex-wrap gap-2 mb-2 justify-content-center">
                            {gradeOptions.map((grade) => (
                                <button
                                    type="button"
                                    key={grade}
                                    className={`btn btn-sm ${grades.includes(grade) ? 'btn-success' : styles.gradeOptions}`}
                                    onClick={() => toggleGrade(grade)}
                                >
                                    {grade}
                                </button>
                            ))}
                        </div>
                        <div className={`${styles["input-group"]} input-group`}>
                            <span className={`${styles["input-group-text"]} input-group-text`}><FaListUl /></span>
                            <input
                                type="text"
                                className={`${styles["form-control"]} form-control fw-bold`}
                                placeholder="الصفوف المختارة"
                                value={grades}
                                readOnly
                            />
                        </div>
                    </div>

                    {/* بيانات السنتر - يظهر فقط لو الدور سنتر */}
                    {role === "center" && (
                        <>
                            <div className="col-md-6">
                                <div className={`${styles["input-group"]} input-group`}>
                                    <span className={`${styles["input-group-text"]} input-group-text`}><FaBuilding /></span>
                                    <input
                                        type="text"
                                        className={`${styles["form-control"]} form-control fw-bold`}
                                        placeholder="اسم السنتر"
                                        value={centerName}
                                        onChange={(e) => setCenterName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={`${styles["input-group"]} input-group`}>
                                    <span className={`${styles["input-group-text"]} input-group-text`}><FaMapMarkerAlt /></span>
                                    <input
                                        type="text"
                                        className={`${styles["form-control"]} form-control fw-bold`}
                                        placeholder="عنوان السنتر"
                                        value={centerAddress}
                                        onChange={(e) => setCenterAddress(e.target.value)}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* نوع الحساب */}
                    <div className="col-12">
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            className={`${styles['form-select']} form-select fw-bold`}
                        >
                            <option value="">اختر نوع الحساب</option>
                            <option value="teacher">مدرس منفرد</option>
                            <option value="center">سنتر</option>
                        </select>
                    </div>

                    {/* زر التسجيل */}
                    <div className="col-12 d-flex justify-content-center">
                        <button type="submit" className={`my-3 col-6 text-white fw-bold p-2 ${styles["login-btn"]}`}>
                            تسجيل
                        </button>
                    </div>

                    {/* عرض الخطأ إن وجد */}
                    {error && <p className="text-danger fw-bold">{error}</p>}

                    {/* زر الرجوع */}
                    <div className="col-12 d-flex justify-content-center">
                        <button
                            type="button"
                            onClick={() => router.push("/login")}
                            className={`p-2 fw-bold col-6 col-sm-2 ${styles["res-btn"]}`}
                        >
                            لدي حساب بالفعل
                        </button>
                    </div>

                </form>
                <p className={`${styles['privcy']} text-start ms-2 fixed-bottom  text-muted `}>تطبق الشروط و الاحكام</p>
            </div>
        </div>
    );
};

export default RegisterClient;
