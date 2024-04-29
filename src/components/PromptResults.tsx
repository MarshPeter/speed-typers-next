import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PromptStatsCalculator from "../services/PromptStatsCalculator";
import {
    faA,
    faCheck,
    faClock,
    faGripLines,
    faPercent,
    faRankingStar,
    faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import * as classic from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

interface Props {
    correctCharacterCount: number;
    wordsPerMinute: number;
    phrase: string;
}

export default function PromptResults({
    correctCharacterCount,
    wordsPerMinute,
    phrase,
}: Props) {
    const [uploadedResult, setUploadedResult] = useState(false);
    const characterCount = phrase.length;
    const wordCount = phrase.split(" ").length;
    const adjustedWordsPerMinute =
        PromptStatsCalculator.adjusNumberBasedOnPercentage(
            wordsPerMinute,
            correctCharacterCount,
            characterCount
        ).toFixed(2);
    const averageCorrect = (
        (correctCharacterCount / characterCount) *
        100
    ).toFixed(2);

    const { userId} = useAuth();

    function playAgain() {
        window.location.reload();
    }

    if (userId) {
        console.log(userId);
    }

    useEffect(() => {
        if (!uploadedResult) {
            const options = {
                method: "POST",
                mode: "cors",
                body: JSON.stringify({})
            }
            fetch("http://localhost:3000/api/uploadWPM", {
                method: "POST",
                mode: "cors",
                body: JSON.stringify({
                    userId: userId,
                    WPM: adjustedWordsPerMinute
                }),
            })
            .then(res => res.json())
            .then(res => console.log(res));
            setUploadedResult(true);
        }
    }, [])

    return (
        <div className="flex flex-wrap justify-between w-2/3 lg:w-1/3 text-3xl p-8 text-neutral-800 bg-white rounded border-2 border-black shadow-2xl">
            <h1 className="text-center font-bold w-full pb-4">
                Prompt Results
            </h1>
            <div className="flex items-center justify-start gap-3 w-6/12 p-2">
                <div className="">
                    <FontAwesomeIcon icon={faA} />
                </div>
                <div className="flex flex-col">
                    <h4 className="text-sm font-bold text-neutral-400 border-b-2">
                        Characters
                    </h4>
                    <p className="font-bold">{characterCount}</p>
                </div>
            </div>
            <div className="flex justify-end items-center gap-2 w-6/12 p-2">
                <div className="flex flex-col">
                    <h4 className="text-sm font-bold text-neutral-400 border-b-2">
                        Correct Characters
                    </h4>
                    <p className="text-end font-bold">
                        {correctCharacterCount}
                    </p>
                </div>
                <div className="place-self-end">
                    <FontAwesomeIcon icon={faCheck} />
                </div>
            </div>
            <div className="flex items-center justify-start gap-3 w-6/12 p-2">
                <div className="">
                    <FontAwesomeIcon icon={faGripLines} />
                </div>
                <div className="flex flex-col">
                    <h4 className="text-sm font-bold text-neutral-400 border-b-2">
                        Words
                    </h4>
                    <p className="font-bold">{wordCount}</p>
                </div>
            </div>
            <div className="flex justify-end items-center gap-2 w-6/12 p-2">
                <div className="flex flex-col">
                    <h4 className="text-sm font-bold text-neutral-400 border-b-2">
                        Average Correct
                    </h4>
                    <p className="text-end font-bold">{averageCorrect}</p>
                </div>
                <div className="place-self-end">
                    <FontAwesomeIcon icon={faPercent} />
                </div>
            </div>
            <div className="flex items-center justify-start gap-3 w-6/12 p-2">
                <div className="">
                    <FontAwesomeIcon icon={faClock} />
                </div>
                <div className="flex flex-col">
                    <h4 className="text-sm font-bold text-neutral-400 border-b-2">
                        Words Per Minute
                    </h4>
                    <p className="font-bold">{wordsPerMinute.toFixed(2)}</p>
                </div>
            </div>
            <div className="flex justify-end items-center gap-3 w-6/12 p-2">
                <div className="flex flex-col">
                    <h4 className="text-sm font-bold text-neutral-400 border-b-2">
                        Effective WPM
                    </h4>
                    <p className="text-end font-bold">
                        {adjustedWordsPerMinute}
                    </p>
                </div>
                <div>
                    <FontAwesomeIcon icon={classic.faClock} type="regular" />
                </div>
            </div>
            <div className="w-full pt-4">
                <div className="flex items-center justify-center">
                    <button
                        className="flex justify-center items-center gap-4 text-3xl w-full p-3 text-white bg-gray-800 hover:bg-gray-300 hover:text-neutral-800 rounded-md border-2 hover:border-gray-700"
                        onClick={playAgain}
                    >
                        <p>Play Again</p>
                        <FontAwesomeIcon icon={faRotateRight} flip="both" />
                    </button>
                </div>
            </div>
            <div className="w-full pt-4">
                <div className="flex items-center justify-center">
                    <button
                        className="flex justify-center items-center gap-4 text-3xl w-full p-3 text-white bg-gray-800 hover:bg-gray-300 hover:text-neutral-800 rounded-md border-2 hover:border-gray-700"
                        onClick={playAgain}
                    >
                        <p>Leaderboard</p>
                        <FontAwesomeIcon icon={faRankingStar} />
                    </button>
                </div>
            </div>
        </div>
    );
}
