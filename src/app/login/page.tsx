"use client";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    function setAccount(e: any) {
        // so that when deployed in vercel, the deployment doesn't fail
        if (typeof window === "undefined") return;

        e.preventDefault();
        const usernameValue = localStorage.getItem("username");

        if (usernameValue === null) {
            localStorage.setItem("username", JSON.stringify(username));
            router.push("/");
        }
    }

    return (
        <>
            <main className="w-full flex justify-center">
                <div className="w-5/12">
                    <form
                        onSubmit={setAccount}
                        className="flex flex-wrap gap-8 justify-center bg-indigo-400 rounded-2xl border-8 border-black p-8 text-2xl"
                    >
                        <h2 className="md:text-3xl lg:text-5xl font-bold">
                            SpeedTypers
                        </h2>
                        <div className="flex flex-wrap justify-center gap-8 max-w-2/3">
                            <div className="flex flex-wrap">
                                <label className="w-full" htmlFor="username">
                                    Username:
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="username"
                                    name="username"
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    value={username}
                                    required
                                    className="w-full"
                                />
                            </div>
                            <div className="flex flex-wrap">
                                <label className="w-full" htmlFor="password">
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    value={password}
                                    required
                                    className="w-full"
                                />
                            </div>
                        </div>
                        <Button prompt={"Login"} type="submit"></Button>
                    </form>
                </div>
            </main>
        </>
    );
}
