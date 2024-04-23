interface Props {
    onPressFunction?: (arg: any) => void;
    prompt: string;
    type?: "button" | "submit" | "reset";
}

export default function StartPrompt({ onPressFunction, prompt, type }: Props) {
    return (
        <button
            className="bg-yellow-200 text-3xl font-semibold border-4 p-2 border-blue-800 rounded-3xl hover:bg-yellow-900 hover:text-gray-100 hover:border-blue-500"
            onClick={onPressFunction}
            type={type || "button"}
        >
            {prompt}
        </button>
    );
}
