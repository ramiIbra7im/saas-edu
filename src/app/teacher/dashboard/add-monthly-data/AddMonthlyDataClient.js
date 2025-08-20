'use client';

import React, { useState, useEffect } from 'react';
import { addMonthlyData } from '@/app/lib/studentActions';
import { supabase } from '@/app/supabaseClient';

export default function AddMonthlyDataClient() {
    const [students, setStudents] = useState([]);
    const [studentId, setStudentId] = useState('');
    const [month, setMonth] = useState('');
    const [isPaid, setIsPaid] = useState(false);
    const [examScore, setExamScore] = useState('');

    useEffect(() => {
        // جلب الطلاب المرتبطين بالمدرس الحالي فقط
        const fetchStudents = async () => {
            const { data: user } = await supabase.auth.getUser();
            const { data, error } = await supabase
                .from('students')
                .select('*')
                .eq('teacher_id', user.user.id);

            if (error) {
                console.error('Error fetching students:', error.message);
            } else {
                setStudents(data);
            }
        };

        fetchStudents();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addMonthlyData({
                studentId,
                month,
                isPaid,
                examScore: Number(examScore),
            });
            alert('✅ تم حفظ البيانات الشهرية بنجاح');
            setStudentId('');
            setMonth('');
            setIsPaid(false);
            setExamScore('');
        } catch (err) {
            console.error(err);
            alert('❌ حدث خطأ أثناء حفظ البيانات');
        }
    };

    return (
        <div className="container my-5">
            <h2 className="mb-4">تسجيل بيانات شهرية للطالب</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
                <div className="mb-3">
                    <label className="form-label">اختر الطالب</label>
                    <select
                        className="form-select"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        required
                    >
                        <option value="">-- اختر طالب --</option>
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">الشهر (مثال: 2025-07)</label>
                    <input
                        type="month"
                        className="form-control"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        checked={isPaid}
                        onChange={(e) => setIsPaid(e.target.checked)}
                    />
                    <label className="form-check-label">دفع المصاريف</label>
                </div>

                <div className="mb-3">
                    <label className="form-label">درجة الامتحان الشهرية</label>
                    <input
                        type="number"
                        className="form-control"
                        value={examScore}
                        onChange={(e) => setExamScore(e.target.value)}
                        min={0}
                        max={30}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">حفظ البيانات</button>
            </form>
        </div>
    );
}
