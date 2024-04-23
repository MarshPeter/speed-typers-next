class PromptStatsCalculator {
    calculateWordsPerMinute(startTime: number, wordsComplete: number): number {
        const currentTime = performance.now();
        const timeDifference = currentTime - startTime;
        const timeDifferenceInMinutes = timeDifference / (1000 * 60);
        const currentWordsPerMinute = wordsComplete / timeDifferenceInMinutes;

        return currentWordsPerMinute;
    }

    adjusNumberBasedOnPercentage(
        startingNumber: number,
        correctCount: number,
        totalCount: number
    ): number {
        const percentage = correctCount / totalCount;

        return startingNumber * percentage;
    }
}

export default new PromptStatsCalculator();
