"use client";
import { useRouter } from "next/navigation";

export default function Logout() {
    if (typeof window === "undefined") return;
    const router = useRouter();
    const userName = localStorage.getItem("username");

    if (userName) {
        localStorage.removeItem("username");
    }

    router.push("/");
}
