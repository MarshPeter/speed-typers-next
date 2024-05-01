import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
    faKeyboard,
    faRankingStar,
    faRightToBracket,
    faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default async function Home() {
    const { userId } = auth();
    console.log(userId);

    if (userId) {
        // UploadWPM(userId, "50.5");
        const user = await currentUser();
        // console.log(user);
    }

    return (
        <main className="flex justify-center items-center min-w-screen mt-16">
            <div className="flex flex-col justify-center text-center gap-6 p-6 lg:p-12 w-1/3 text-neutral-800 bg-white border-4 rounded-lg shadow-2xl border-gray-400">
                <div>
                    <h1 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold">
                        SPEEDTYPERS
                    </h1>
                </div>
                <SignedOut>
                    <div className="flex items-center justify-center">
                        <Link
                            className="flex justify-center items-center gap-4 text-3xl w-10/12 p-3 text-white bg-gray-800 hover:bg-gray-300 hover:text-neutral-800 rounded-md border-2 hover:border-gray-700 shadow-lg hover:shadow-none"
                            href="/sign-in"
                        >
                            <p>Sign In</p>
                            <FontAwesomeIcon
                                icon={faRightToBracket}
                                className="w-7"
                            />
                        </Link>
                    </div>
                    <div className="flex items-center justify-center">
                        <Link
                            className="flex justify-center items-center gap-4 text-3xl w-10/12 p-3 text-white bg-gray-800 hover:bg-gray-300 hover:text-neutral-800 rounded-md border-2 hover:border-gray-700"
                            href="/sign-up"
                        >
                            <p>Sign Up</p>
                            <FontAwesomeIcon icon={faUserPlus} className="w-7" />
                        </Link>
                    </div>
                    <div className="flex items-center justify-center">
                        <Link
                            className="flex justify-center items-center gap-2 text-3xl w-10/12 p-3 text-white bg-gray-800 hover:bg-gray-300 hover:text-neutral-800 rounded-md border-2 hover:border-gray-700"
                            href="/prompter"
                        >
                            <p>Play as Guest</p>
                            <FontAwesomeIcon className="w-7" icon={faKeyboard} />
                        </Link>
                    </div>
                </SignedOut>
                <SignedIn>
                    <div className="flex items-center justify-center">
                        <Link
                            className="flex justify-center items-center gap-2 text-3xl w-10/12 p-3 text-white bg-gray-800 hover:bg-gray-300 hover:text-neutral-800 rounded-md border-2 hover:border-gray-700"
                            href="/prompter"
                        >
                            <p>Race</p>
                            <FontAwesomeIcon className="w-7" icon={faKeyboard} />
                        </Link>
                    </div>
                    <div className="flex items-center justify-center">
                        <Link
                            className="flex justify-center items-center gap-2 text-3xl w-10/12 p-3 text-white bg-gray-800 hover:bg-gray-300 hover:text-neutral-800 rounded-md border-2 hover:border-gray-700"
                            href="/leaderboard"
                        >
                            <p>Leaderboard</p>
                            <FontAwesomeIcon className="w-7" icon={faRankingStar} />
                        </Link>
                    </div>
                </SignedIn>
            </div>
        </main>
    );
}
