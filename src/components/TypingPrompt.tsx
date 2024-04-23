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
        console.log(phrase.length, correctCharacterArray.length);
        // this is very much a hack - won't need this if indexes work properly
        if (highlightIndex >= phrase.length) {
            setHighlightIndex(highlightIndex + 1);
            return;
        }
        const key = e.key;
        console.log(key);
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

        if (phrase[highlightIndex] === " ") {
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
        <div className="flex flex-col align-center gap-4 p-5 rounded border-8 border-indigo-400">
            {countdownOngoing ? (
                <Countdown onConclusionFunction={finishCountdown}></Countdown>
            ) : null}
            <div>
                <p className="text-3xl">
                    {phrase.split("").map((char, index) => {
                        if (index > highlightIndex) return char;

                        if (highlightIndex === index) {
                            return (
                                <span
                                    key={index}
                                    className="bg-red-400 bg-opacity-40"
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
                <div className="flex justify-between text-lg">
                    <p>
                        Correct: {correctCharacterCount} /{" "}
                        {correctCharacterArray.length}
                    </p>
                    <p>WPM: {wordsPerMinute.toFixed(2)}</p>
                    <p>Average: {currentAverage.toFixed(0)}%</p>
                </div>
            </div>
        </div>
    );
}
