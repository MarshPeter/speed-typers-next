import { SignedIn, SignedOut } from "@clerk/nextjs";
import { faKeyboard, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { LeaderboardResult } from "@/models/leaderboardResult";

export default async function Page() {
  const response =  await fetch("https://speed-typers-next.vercel.app/api/top-scores", {cache: 'no-store'});
  const topPlayers = await response.json() as Array<LeaderboardResult>;
  console.log(topPlayers);

  return (
    <main className="flex justify-center items-center min-w-screen mt-16 pb-8">
      <div className="flex flex-col justify-center text-center gap-6 p-10 w-5/6 xl:w-2/3 text-neutral-800 bg-white border-4 rounded-md shadow-2xl border-gray-600">
        <div>
          <h1 className="text-4xl font-extrabold pb-6">LEADERBOARD</h1>
        </div>
        <div className="flex flex-wrap justify-between pb-4">
          {topPlayers[1] ? 
            <div className="mt-8 p-2 lg:p-4 bg-gray-100 border-l-4 border-r-4 border-gray-200 text-neutral-900 shadow-xl">
              <h2 className="text-6xl font-extrabold pb-4">2nd</h2>
              <p className="text-xl lg:text-2xl pt-4 pb-4 font-bold">{topPlayers[1].username}</p>
              <p className="text-4xl font-extrabold">{topPlayers[1].WPM}<span className="text-lg font-extrabold">WPM</span></p>
            </div>
          : null}
          {topPlayers[0] ? 
          <div className="p-2 lg:p-4 bg-gray-100 border-l-4 border-r-4 border-gray-200 text-neutral-900 shadow-2xl">
            <h2 className="text-6xl font-extrabold">1st</h2>
            <p className="text-xl lg:text-2xl pt-4 pb-4 font-bold">{topPlayers[0].username}</p>
            <p className="text-4xl font-extrabold">{topPlayers[0].WPM}<span className="text-lg font-extrabold">WPM</span></p>
          </div> : null }
          {topPlayers[2] ? 
          <div className="mt-8 p-2 lg:p-4 bg-gray-100 border-l-4 border-r-4 border-gray-200 text-neutral-900 shadow-lg">
            <h2 className="text-6xl font-extrabold pb-4">3rd</h2>
            <p className="text-xl lg:text-2xl pt-4 pb-4 font-bold">{topPlayers[2].username}</p>
            <p className="text-4xl font-extrabold">{topPlayers[2].WPM}<span className="text-lg font-extrabold">WPM</span></p>
          </div> : null}
        </div>
        {topPlayers.map((row, index) => {
          if (index < 3) {
            return null;
          }
          return (
            <div className="flex flex-col" key="index">
              <div className="flex justify-between text-2xl font-bold p-4 bg-gray-100 border-gray-200 shadow-lg">
                <h3>{index + 1}th</h3>
                <p>{row.username}</p>
                <p>{row.WPM}<span className="text-sm"> WPM</span></p>
              </div>
            </div>
          )
        })}
        <div className="text-xl font-bold pt-5">
          <p className="pb-4">Think you have what it takes to make it on the leaderboard?</p>
            <div className="flex items-center justify-center">
              <SignedIn>
                <Link
                    className="flex justify-center items-center gap-2 text-3xl w-4/12 p-3 text-white bg-gray-800 hover:bg-gray-300 hover:text-neutral-800 rounded-md border-2 hover:border-gray-700"
                    href="/prompter"
                >
                    <p>Race Now!</p>
                    <FontAwesomeIcon className="w-7" icon={faKeyboard} />
                </Link>
              </SignedIn>
              <SignedOut>
                <Link
                    className="flex justify-center items-center gap-2 text-3xl w-4/12 p-3 text-white bg-gray-800 hover:bg-gray-300 hover:text-neutral-800 rounded-md border-2 hover:border-gray-700"
                    href="/sign-in"
                >
                    <p>Sign in to race!</p>
                    <FontAwesomeIcon className="w-7" icon={faRightToBracket} />
                </Link>
              </SignedOut>
            </div>
        </div>
      </div>
    </main>
  )
}
