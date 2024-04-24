import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
    return (
        <header className="flex justify-center bg-black p-3 text-2xl text-white border-b-2 border-gray-300">
            <div className="w-10/12 flex justify-between">
                <div>
                    <Link href="/" className="font-bold">
                        SpeedTypers
                    </Link>
                </div>
                <div>
                    <nav className="flex gap-8">
                        <Link
                            className="border-b-2 border-black hover:border-gray-600"
                            href="/"
                        >
                            Home
                        </Link>
                        <Link
                            className="border-b-2 border-black hover:border-gray-600"
                            href="/prompter"
                        >
                            Race
                        </Link>
                        <SignedOut>
                            <Link
                                className="border-b-2 border-black hover:border-gray-600"
                                href="/sign-in"
                            >
                                Sign In
                            </Link>
                            <Link
                                className="border-b-2 border-black hover:border-gray-600"
                                href="/sign-up"
                            >
                                Sign Up
                            </Link>
                        </SignedOut>
                        <SignedIn>
                            <Link
                                className="border-b-2 border-black hover:border-gray-600"
                                href="/profile"
                            >
                                Profile
                            </Link>
                            <UserButton></UserButton>
                        </SignedIn>
                    </nav>
                </div>
            </div>
        </header>
    );
}
