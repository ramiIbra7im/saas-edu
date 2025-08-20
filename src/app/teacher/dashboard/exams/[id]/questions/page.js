"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../../supabaseClient";

export default function AddQuestionsPage() {
    const { id: examId } = useParams();
    const [questionText, setQuestionText] = useState("");
    const [options, setOptions] = useState({ a: "", b: "", c: "", d: "" });
    const [correctOption, setCorrectOption] = useState("a");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleInputChange = (key, value) => {
        setOptions((prev) => ({ ...prev, [key]: value }));
    };

    const handleAddQuestion = async (e) => {
        e.preventDefault();

        if (!questionText.trim() || !options.a || !options.b || !options.c || !options.d) {
            alert("يرجى تعبئة جميع الحقول");
            return;
        }

        setLoading(true);
        setSuccess(false);

        const { error } = await supabase.from("questions").insert([
            {
                exam_id: examId,
                question_text: questionText,
                option_a: options.a,
                option_b: options.b,
                option_c: options.c,
                option_d: options.d,
                correct_option: correctOption,
            },
        ]);

        setLoading(false);

        if (error) {
            console.error(error);
            alert("حدث خطأ أثناء حفظ السؤال");
        } else {
            setSuccess(true);
            // تفريغ الحقول
            setQuestionText("");
            setOptions({ a: "", b: "", c: "", d: "" });
            setCorrectOption("a");
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-4">إضافة سؤال للامتحان</h3>

            {success && <div className="alert alert-success">تم إضافة السؤال بنجاح</div>}

            <form onSubmit={handleAddQuestion}>
                <div className="mb-3">
                    <label className="form-label">نص السؤال</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        required
                    />
                </div>

                {["a", "b", "c", "d"].map((key) => (
                    <div className="mb-3" key={key}>
                        <label className="form-label">اختيار {key.toUpperCase()}</label>
                        <input
                            type="text"
                            className="form-control"
                            value={options[key]}
                            onChange={(e) => handleInputChange(key, e.target.value)}
                            required
                        />
                    </div>
                ))}

                <div className="mb-3">
                    <label className="form-label">الإجابة الصحيحة</label>
                    <select
                        className="form-select"
                        value={correctOption}
                        onChange={(e) => setCorrectOption(e.target.value)}
                        required
                    >
                        <option value="a">A</option>
                        <option value="b">B</option>
                        <option value="c">C</option>
                        <option value="d">D</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? "جاري الحفظ..." : "حفظ السؤال وإضافة آخر"}
                </button>
            </form>
        </div>
    );
}
