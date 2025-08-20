"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext"; // عدل حسب المسار
import { supabase } from "../supabaseClient";
import LoadingScreen from "../components/LoadingScreen";

export default function TeacherOnlyPage() {
  const { user } = useAuth(); // لازم يكون فيه user.id
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkRole = async () => {
      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error || !data) {
        router.push("/login");
        return;
      }

      if (data.role !== "teacher") {
        router.push("/unauthorized"); // أو صفحة غير مسموح
      } else {
        setAllowed(true);
      }

      setLoading(false);
    };

    checkRole();
  }, [user, router]);

  if (loading) return <LoadingScreen />;

  if (!allowed) return null;

  return (
    <div className="container py-5">
      <h2>مرحبًا بالمدرس 👨‍🏫</h2>
      <p>محتوى خاص بالمدرسين فقط</p>
    </div>
  );
}
