import ResultList from "@/components/ResultList";
import { Result } from "@/models/result";
import { auth } from "@clerk/nextjs/server";
import { faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
    const { userId } = auth();

    if (!userId) {
        redirect('/')
    }

    const response =  await fetch(`https://speed-typers-next.vercel.app/api/get-account-best?id=${userId}`, {cache: 'no-store'});
    const bestResults = await response.json() as Array<Result>;

    return (
    <main className="flex justify-center items-center min-w-screen mt-8 pb-8">
        <div className="flex flex-col justify-center text-center gap-6 p-10 w-1/3 xl:w-1/3 text-neutral-800 bg-white border-4 rounded-md shadow-2xl border-gray-600">
            <div>
                <h1 className="text-4xl font-extrabold pb-2">Best Results</h1>
            </div>
            <div className="flex flex-col gap-5 justify-center content-center">
                {bestResults && bestResults.length > 0 ?
                    <ResultList results={bestResults}></ResultList>
                : <p className="text-2xl">You haven&apost done any races yet! Get some races in and see your progress!</p> }
            </div>
            <div className="flex flex-col items-center justify-center">
                <Link
                    className="flex justify-center items-center gap-2 text-3xl w-10/12 p-3 text-white bg-gray-800 hover:bg-gray-300 hover:text-neutral-800 rounded-md border-2 hover:border-gray-700"
                    href="/prompter"
                >
                    <p>Race Now!</p>
                    <FontAwesomeIcon className="w-7" icon={faKeyboard} />
                </Link>
            </div>
        </div>
    </main>
    );
}
