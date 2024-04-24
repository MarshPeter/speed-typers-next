import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Header() {
    // const [loggedIn, setLoggedIn] = useState(false);

    // useEffect(() => {
    //     const loggedInLocally = localStorage.getItem("username");

    //     if (loggedInLocally) {
    //         setLoggedIn(true);
    //     } else {
    //         setLoggedIn(false);
    //     }
    // }, []);

    return (
        <header className="flex justify-center bg-black p-3 mb-8 text-2xl text-white border-b-2 border-white">
            <div className="w-10/12 flex justify-between">
                <div>
                    <p className="font-bold">SpeedTypers</p>
                </div>
                <div>
                    <nav className="flex gap-4">
                        <Link href="/">Home</Link>
                        <Link href="/prompt">Race</Link>
                        <SignedOut>
                            <Link href="/sign-in">Sign In</Link>
                            <Link href="/sign-up">Sign Up</Link>
                        </SignedOut>
                        <SignedIn>
                            <Link href="/profile">Profile</Link>
                        </SignedIn>
                    </nav>
                </div>
            </div>
        </header>
    );
}
