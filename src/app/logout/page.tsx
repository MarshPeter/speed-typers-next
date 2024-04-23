"use client";
import { useRouter } from "next/navigation";

export default function Logout() {
    const router = useRouter();
    if (typeof window === "undefined") return;
    const userName = localStorage.getItem("username");

    if (userName) {
        localStorage.removeItem("username");
    }

    router.push("/");
}
