"use client";

import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../../../supabaseClient";
import JsBarcode from "jsbarcode";
import html2canvas from "html2canvas";
import Image from "next/image";
import styles from "./studentCard.module.css";
import { toast } from "react-toastify";

export default function StudentCardPreview() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [studentImage, setStudentImage] = useState(null);
    const cardRef = useRef(null);
    const barcodeRef = useRef(null);
    const imageInputRef = useRef(null);

    useEffect(() => {
        const fetchStudents = async () => {
            // جلب بيانات المستخدم الحالي
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError || !user) {
                console.error("فشل في جلب المستخدم:", userError);
                return;
            }

            // فلترة الطلاب حسب teacher_id المطابق لـ user.id
            const { data, error } = await supabase
                .from("students")
                .select("id, name, grade, parent_phone, teacher_id, profiles(teacher_name)")
                .eq("teacher_id", user.id); // ← هنا الفلترة

            if (error) {
                console.error("فشل في جلب الطلاب:", error);
            } else {
                setStudents(data);
            }
        };

        fetchStudents();
    }, []);


    useEffect(() => {
        if (selectedStudent && barcodeRef.current) {
            const shortId = selectedStudent.id.toString().slice(0, 8);
            JsBarcode(barcodeRef.current, shortId, {
                format: "CODE128",
                displayValue: true,
                height: 60,
                width: 2,
                margin: 1,
            });
        }
    }, [selectedStudent]);


    const handleDownload = async () => {
        if (!cardRef.current || !selectedStudent) {
            toast.error("حدث خطأ أثناء حفظ الكارت");
            return;
        }

        try {
            const img = cardRef.current.querySelector("img");
            if (img && !img.complete) {
                await new Promise((resolve) => {
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            }

            const canvas = await html2canvas(cardRef.current, {
                useCORS: true,
                backgroundColor: "#fff", // خلفية بيضاء لتجنب الاختلاف
                scale: 2, // لتحسين الجودة
            });

            const link = document.createElement("a");
            link.download = `${selectedStudent.name}_card.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();

            toast.success(" تم حفظ الكارت بنجاح");
        } catch (err) {
            console.error("فشل حفظ الكارت:", err);
            toast.error(" فشل حفظ الكارت، حاول مرة أخرى");
        }
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setStudentImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        imageInputRef.current.click();
    };

    return (
        <div className="container my-5">
            <h3 className="mb-4">إنشاء كارت لطالب</h3>

            <select
                className="form-select mb-4"
                onChange={(e) => {
                    const selectedId = e.target.value;
                    const student = students.find(
                        (s) => s.id.toString() === selectedId
                    );
                    setSelectedStudent(student);
                    setStudentImage(null);
                }}
            >
                <option value="">اختر الطالب</option>
                {students.map((student) => (
                    <option key={student.id} value={student.id}>
                        {student.name}
                    </option>
                ))}
            </select>

            {selectedStudent && (
                <>
                    <div
                        className={`card shadow mx-auto ${styles.cardContainer}`}
                        ref={cardRef}
                    >
                        {/* العلامة المائية */}
                        <div className={styles.watermark}>
                            <Image
                                src="/hero.png"
                                alt="Watermark"
                                fill
                                style={{ objectFit: "contain" }}
                            />
                        </div>

                        {/* صورة الطالب */}
                        <div className={styles.header}>
                            <div
                                className="position-relative d-flex justify-content-center align-items-center rounded-circle mx-auto"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    overflow: "hidden",
                                    border: "3px solid white",
                                    cursor: "pointer",
                                    backgroundColor: "#0d6efd",
                                    color: "white",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                }}
                                onClick={handleImageClick}
                                title="اضغط لاختيار صورة"
                            >
                                {/* النص يظهر فقط إذا لم يتم تحميل صورة */}
                                {!studentImage && (
                                    <span className="position-absolute z-2">اختر صورة</span>
                                )}

                                <img
                                    src={studentImage || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABeFBMVEUAAAD///8AAABaWlooKCgtLS1bW1v8/Pz29vYWFhZgYGBwcHClpaWUlJSqqqqMjIyQkJCUlJR2dnZ1dXVvb2+hoaG3t7etra3j4+Opqamjo6Ofn5+bm5t+fn6YmJjAwMDMzMzGxsa2trbc3NzV1dV/f3+0tLS3t7cPDw+Ojo5ZWVlgYGDm5ubGxsaWlpbDw8ODg4NycnIuLi5ISEiHh4dsbGygoKBUVFSampq+vr6CgoKsrKxsYmJSQkJCwsLCh4eE4ODg2NjbNzc3k5OTLy8tcXFxHR0eCgoJJSUnR0dFsR7ZnAAAAI3RSTlMAAQIDBAUGBwgJCgsMDQ4QERITFBUWFxgZGhscHR4fICAhIiMnKDAAAAKZJREFUeNrt1tcWgyAUBuCTAgKDRGwsru5t2v//0y6x2IRLRpnb1ymK1uyfA58bKmKJvU8jhU7K5nQuHjJ5cEnXE+mdyEDOBz7NdBDWc3yUh6wbgUXmaVv4j2OnCr/IN9mLrsCyS9qNLBeg2yyvAtIG+TZJzCP1yyT9TPuDbQmFfiN+hXEQuqvYz0L9Axka8vsPOw14gP+Ef+KbHth8Rv+8XmB2R+WZGbgl4sW2YMi9+5eKNRCh1+5e6bCdcbbKdpzK6bQybdg0a3vZ+jCjbfrjPknD7UlNZ7OD+nCVXa3ny9K7Z92v9WnvWD+sVuQ7x2ZJbppF22xRxpZebAYAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyNS0wNy0yOVQxMjo0MzowOCswMDowMI4m5xgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjUtMDctMjlUMTI6NDM6MDgrMDA6MDCV9sBdAAAAAElFTkSuQmCC"
                                    }
                                    // alt="student"
                                    className="w-100 h-100 object-fit-cover position-absolute top-0 start-0"
                                    style={{ zIndex: 1 }}
                                />
                            </div>

                            <input
                                ref={imageInputRef}
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                            />
                        </div>

                        {/* بيانات الطالب */}
                        <div className={styles.cardContent}>
                            <h3 className="fw-bold mb-3">{selectedStudent.name}</h3>
                            <p className="text-muted mb-2">
                                {selectedStudent.grade || "السنة الدراسية"}
                            </p>
                            <div className=" justify-content-around text-center small mb-3 mt-2">
                                <p>
                                    رقم ولي الامر:{" "}
                                    <strong>{selectedStudent.parent_phone || "..."}</strong>
                                </p>
                                <p>
                                    المدرس: أ/{" "}
                                    <strong>{selectedStudent.profiles?.teacher_name || "-"}</strong>
                                </p>
                            </div>

                            {/* باركود */}
                            <div className="my-3 d-flex justify-content-center">
                                <svg ref={barcodeRef} className={styles.barcode}></svg>
                            </div>
                        </div>

                        {/* التاريخ */}
                        <div className={styles.issuedDate}>
                            Issued: {new Date().toLocaleDateString()}
                        </div>
                    </div>

                    <div className="text-center mt-3">
                        <button className="btn btn-primary" onClick={handleDownload}>
                            حفظ الكارت كصورة
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
