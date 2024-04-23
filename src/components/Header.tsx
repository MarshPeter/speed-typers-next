"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const loggedIn = localStorage.getItem("username");

        if (loggedIn) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [loggedIn]);

    return (
        <header className="flex justify-center bg-black p-3 mb-8 text-4xl text-white border-b-2 border-white">
            <div className="w-10/12 flex justify-between">
                <div>
                    <p>SpeedTypers</p>
                </div>
                <div>
                    <nav className="flex gap-4">
                        <Link href="/">Home</Link>
                        <Link href="/prompt">Race</Link>
                        {!loggedIn ? (
                            <Link href="/login">Login</Link>
                        ) : (
                            <>
                                <Link href="/logout">Logout</Link>
                                <Link href="/profile">Profile</Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}
