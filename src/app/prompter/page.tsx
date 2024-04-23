"use client";
import Header from "@/components/Header";
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
        return <div>Loading Prompt</div>;
    }

    return (
        <>
            <Header />
            <main className="w-full flex justify-center">
                <div className="w-2/3">
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
                </div>
            </main>
        </>
    );
}

export default Prompter;
