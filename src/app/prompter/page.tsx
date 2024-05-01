"use client";
import PromptResults from "@/components/PromptResults";
import TypingPrompt from "@/components/TypingPrompt";
import TextPromptFetcher from "@/services/TextPromptFetcher";
import { useEffect, useState } from "react";

function Prompter() {
    const [phrase, setPhrase] = useState("");
    const [wordsPerMinute, setWordsPerMinute] = useState(0);
    const [currentAverage, setCurrentAverage] = useState(0);
    const [correctCharacterCount, setCorrectCharacterCount] = useState(0);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        const newPhrase = TextPromptFetcher.getPrompt();
        setPhrase(newPhrase);
        setShowPrompt(true);
    }, []);

    if (phrase === "") {
        return <main className="flex flex-col w-11/12 md:w-9/12 lg:w-7/12 xl:w-6/12 align-center gap-4 p-5 bg-white text-neutral-800 shadow-2xl border-2 rounded  border-gray-800">
            <p className="text-2xl">LOADING</p>
        </main>
    }

    return (
        <main className="w-full flex justify-center pt-8">
            {showPrompt ? (
                <TypingPrompt
                    phrase={phrase}
                    correctCharacterCount={correctCharacterCount}
                    currentAverage={currentAverage}
                    wordsPerMinute={wordsPerMinute}
                    showPrompt={showPrompt}
                    setCorrectCharacterCount={setCorrectCharacterCount}
                    setCurrentAverage={setCurrentAverage}
                    setShowPrompt={setShowPrompt}
                    setWordsPerMinute={setWordsPerMinute}
                />
            ) : (
                <PromptResults
                    correctCharacterCount={correctCharacterCount}
                    wordsPerMinute={wordsPerMinute}
                    phrase={phrase}
                />
            )}
        </main>
    );
}

export default Prompter;
