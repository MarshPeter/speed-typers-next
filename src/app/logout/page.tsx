"use client";
import { useRouter } from "next/navigation";

export default function Logout() {
    const router = useRouter();
    const userName = localStorage.getItem("username");

    if (userName) {
        localStorage.removeItem("username");
    }

    router.push("/");
}
