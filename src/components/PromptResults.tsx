import PromptStatsCalculator from "../services/PromptStatsCalculator";
import Button from "./Button";

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

    function playAgain() {
        window.location.reload();
    }

    return (
        <div className="flex flex-wrap flex-col align-center text-3xl gap-4 p-5 rounded border-8 border-indigo-400">
            <div>
                <ul className="flex flex-wrap gap-2">
                    <li className="w-full flex justify-between">
                        <span>Characters in Prompt:</span>{" "}
                        <span>{characterCount}</span>
                    </li>
                    <li className="w-full flex justify-between">
                        <span>Words in Prompt: </span>
                        <span>{wordCount}</span>
                    </li>
                    <li className="w-full flex justify-between">
                        <span>Correct Characters: </span>
                        <span>{correctCharacterCount}</span>
                    </li>
                    <li className="w-full flex justify-between">
                        <span>Average Correct: </span>
                        <span>{averageCorrect}%</span>
                    </li>
                    <li className="w-full flex justify-between">
                        <span>Words Per Minute (WPM): </span>
                        <span>{wordsPerMinute.toFixed(2)}</span>
                    </li>
                    <li className="w-full flex justify-between">
                        <span>Effective Words Per Minute: </span>
                        <span>{adjustedWordsPerMinute}</span>
                    </li>
                </ul>
            </div>
            <div>
                {/* <InPageLink linkTo="/prompt" text="Play as guest"></InPageLink> */}
                <Button
                    onPressFunction={playAgain}
                    prompt="Play Again"
                ></Button>
            </div>
        </div>
    );
}
