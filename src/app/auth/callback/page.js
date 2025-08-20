// app/auth/callback/page.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabaseClient";

export default function AuthCallback() {
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (data.session) {
                router.push("/dashboard"); // أو أي مسار آخر
            } else {
                router.push("/login");
            }
        };

        checkSession();
    }, []);

    return <p className="p-5 text-center">جارٍ التحقق من البريد...</p>;
}
