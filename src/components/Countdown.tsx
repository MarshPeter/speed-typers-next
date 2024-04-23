import { useEffect, useState } from "react";

interface Props {
    increments?: number;
    period?: number;
    onConclusionFunction?: Function;
}

export default function Countdown({
    increments = 3,
    period = 1000,
    onConclusionFunction,
}: Props) {
    const [currentNumber, setCurrentNumber] = useState(increments);

    useEffect(() => {
        if (currentNumber > 0) {
            setTimeout(() => setCurrentNumber(currentNumber - 1), period);
        } else if (currentNumber === 0 && onConclusionFunction !== undefined) {
            onConclusionFunction();
        }
    }, [currentNumber]);

    return (
        <div className="flex flex-wrap justify-center content-center w-36 h-36 border-black text-8xl border-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <p>{currentNumber}</p>
        </div>
    );
}
