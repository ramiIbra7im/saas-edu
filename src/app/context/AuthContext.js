"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateUserData = (newData) => {
    setUserData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const {
          data: { user: currentUser },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          setError("فشل في جلب المستخدم.");
          setLoading(false);
          return;
        }

        if (!currentUser) {
          setUser(null);
          setRole(null);
          setUserData(null);
          setLoading(false);
          return;
        }

        setUser(currentUser);

        // جلب بيانات session للحصول على access token
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          setError("فشل في جلب الجلسة.");
        } else {
          const { data } = await supabase.auth.getSession();

        }

        // جلب بيانات المستخدم من جدول users (اللي فيه role)
        const { data, error: fetchError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", currentUser.id)
          .single();

        if (fetchError) {
          setRole("guest");
          setUserData(null);
        } else {
          setRole(data?.role || "guest");
          setUserData(data);
        }
      } catch (err) {
        setError("فشل في تحميل بيانات المستخدم.");
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      getCurrentUser();
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);


  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
    setUserData(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, role, userData, loading, logout, error, updateUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
