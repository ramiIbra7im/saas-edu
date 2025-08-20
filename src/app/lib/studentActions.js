import { supabase } from "../supabaseClient";

// حفظ بيانات شهرية لطالب
export async function addMonthlyData({ studentId, month, isPaid, examScore }) {
    const fullDate = `${month}-01`; // يحول 2025-07 إلى 2025-07-01

    const { error } = await supabase.from('student_monthly_data').insert([
        {
            student_id: studentId,
            month: fullDate,
            is_paid: isPaid,
            exam_score: parseInt(examScore),
        },
    ]);

    if (error) {
        console.error("Insert error:", error.message);
        throw error;
    }
}
