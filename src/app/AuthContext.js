// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';
// import { supabase } from '../supabaseClient';
// import { useRouter } from 'next/navigation';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const getSession = async () => {
//       const {
//         data: { session },
//         error,
//       } = await supabase.auth.getSession();

//       if (session?.user) {
//         setUser(session.user);
//         await handleProfileInsert(session);
//       }

//       setLoading(false);
//     };

//     getSession();

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(async (event, session) => {
//       if (session?.user) {
//         setUser(session.user);
//         await handleProfileInsert(session);
//       } else {
//         setUser(null);
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   const handleProfileInsert = async (session) => {
//     const userId = session.user.id;

//     // Check if already exists
//     const { data: existingProfile } = await supabase
//       .from('profiles')
//       .select('id')
//       .eq('id', userId)
//       .single();

//     if (!existingProfile) {
//       const metadata = session.user.user_metadata;

//       const insertData = {
//         id: userId,
//         email: session.user.email,
//         mobile: metadata.mobile || '',
//         role: metadata.user_type === 'مدرس' ? 'teacher' : 'center',
//         ...(metadata.user_type === 'مدرس' && {
//           teacher_name: metadata.teacher_name || '',
//           teacher_age: parseInt(metadata.teacher_age) || null,
//           subject: metadata.subject || '',
//           grades: metadata.grades || [],
//         }),
//         ...(metadata.user_type === 'سنتر' && {
//           center_name: metadata.center_name || '',
//           center_address: metadata.center_address || '',
//         }),
//       };

//       const { error } = await supabase.from('profiles').insert([insertData]);
//       if (error) console.error('Insert profile error:', error.message);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
