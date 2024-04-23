interface WordData {
    date: string;
    wordsPerMinute: number;
}

const wordData = [
    {
        date: "1/1/24",
        wordsPerMinute: 55,
    },
    {
        date: "8/1/24",
        wordsPerMinute: 60,
    },
    {
        date: "15/1/24",
        wordsPerMinute: 64,
    },
    {
        date: "22/1/24",
        wordsPerMinute: 63,
    },
    {
        date: "29/1/24",
        wordsPerMinute: 70,
    },
    {
        date: "6/2/24",
        wordsPerMinute: 67,
    },
    {
        date: "13/2/24",
        wordsPerMinute: 68,
    },
    {
        date: "20/2/24",
        wordsPerMinute: 74,
    },
];

function getWordsPerMinuteOverTime(): WordData[] {
    return wordData;
}

export default getWordsPerMinuteOverTime;
