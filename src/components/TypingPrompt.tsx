import React, { useEffect, useState } from "react";
import PromptStatsCalculator from "../services/PromptStatsCalculator";
import Countdown from "./Countdown";

interface Props {
    phrase: string;
    currentAverage: number;
    correctCharacterCount: number;
    wordsPerMinute: number;
    showPrompt: boolean;
    setWordsPerMinute: React.Dispatch<number>;
    setCurrentAverage: React.Dispatch<number>;
    setShowPrompt: React.Dispatch<boolean>;
    setCorrectCharacterCount: React.Dispatch<number>;
}

export default function TypingPrompt({
    phrase,
    currentAverage,
    correctCharacterCount,
    wordsPerMinute,
    showPrompt,
    setCorrectCharacterCount,
    setShowPrompt,
    setCurrentAverage,
    setWordsPerMinute,
}: Props) {
    const [correctCharacterArray, setCorrectCharacterArray] = useState(
        new Array<number>(phrase.length).fill(0)
    );
    const [wordsComplete, setWordsComplete] = useState(0);
    const [highlightIndex, setHighlightIndex] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [countdownOngoing, setCountdownOngoing] = useState(true);

    function handleKeyDown(e: any) {
        if (countdownOngoing) return;
        if (startTime === 0) {
            setStartTime(performance.now());
        }

        if (highlightIndex >= phrase.length) {
            setHighlightIndex(highlightIndex + 1);
            return;
        }

        const key = e.key;
        if (key.toLowerCase() === "shift" || key.toLowerCase() === "capslock") {
            return;
        }

        let correct = correctCharacterCount;
        if (phrase[highlightIndex] === key) {
            setCorrectCharacterCount(correctCharacterCount + 1);
            correct++;
        }

        const newCorrectArray = correctCharacterArray.map(
            (val: number, index: number) => {
                if (index !== highlightIndex) return val;

                if (phrase[highlightIndex] === key) {
                    return 1;
                } else {
                    return -1;
                }
            }
        );

        if (phrase[highlightIndex] === " " || highlightIndex === (phrase.length - 1)) {
            setWordsComplete(wordsComplete + 1);
        }

        setHighlightIndex(highlightIndex + 1);
        setCurrentAverage((correct / (highlightIndex + 1)) * 100);
        setCorrectCharacterArray(newCorrectArray);
        setWordsPerMinute(
            PromptStatsCalculator.calculateWordsPerMinute(
                startTime,
                wordsComplete
            )
        );
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        if (phrase && highlightIndex >= phrase.length) {
            setShowPrompt(false);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [
        highlightIndex,
        correctCharacterCount,
        correctCharacterArray,
        wordsPerMinute,
        wordsComplete,
        countdownOngoing,
        currentAverage,
        showPrompt,
    ]);

    function finishCountdown() {
        setCountdownOngoing(false);
    }

    return (
        <main className="flex flex-col w-11/12 md:w-9/12 lg:w-7/12 xl:w-6/12 align-center gap-4 p-5 bg-white text-neutral-800 shadow-2xl border-2 rounded  border-gray-800">
            {countdownOngoing ? (
                <Countdown onConclusionFunction={finishCountdown}></Countdown>
            ) : null}
            <div className="border-gray-300 border-b-2 pb-6">
                <p className="text-4xl">
                    {phrase.split("").map((char, index) => {
                        if (index > highlightIndex) return char;

                        if (highlightIndex === index) {
                            return (
                                <span
                                    key={index}
                                    className="bg-red-400 bg-opacity-40 border-l-2 border-black border-border"
                                >
                                    {char}
                                </span>
                            );
                        }

                        if (correctCharacterArray[index] === 1) {
                            return (
                                <span key={index} className="text-green-600">
                                    {char}
                                </span>
                            );
                        }

                        if (correctCharacterArray[index] === -1) {
                            return (
                                <span key={index} className="text-red-600">
                                    {char}
                                </span>
                            );
                        }

                        return char;
                    })}
                </p>
            </div>
            <div className="flex justify-center text-5xl font-bold">
                <p>
                    <span className="font-bold">
                        {wordsPerMinute.toFixed(2)}
                    </span>{" "}
                    <span className="text-lg">WPM</span>
                </p>
            </div>
        </main>
    );
}
