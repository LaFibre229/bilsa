"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function withAuth(Component) {
  return function ProtectedPage(props) {
    const router = useRouter();

    useEffect(() => {
      // Vérifie si le token existe dans localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/login"); // Redirection si pas connecté
      }
    }, [router]);

    return <Component {...props} />;
  };
}
