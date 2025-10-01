"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function withAdminAuth(Component) {
  return function AdminProtectedPage(props) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split(".")[1])); // decode JWT
        if (payload.role !== "admin") {
          router.replace("/unauthorized"); // ou page d'erreur
        }
      } catch (e) {
        router.replace("/login");
      }
    }, [router]);

    return <Component {...props} />;
  };
}
