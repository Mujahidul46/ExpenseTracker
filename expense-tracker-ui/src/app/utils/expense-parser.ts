import { WORD_TO_NUMBER_MAPPING } from "../components/constants/wordToNumberMapping";
import { getTextWithoutFillerWords } from "./transcript-cleaner";

export function parseUserInput(input: string): {expenseName: string, amountAsNumber: number} {
    console.log('User Input:', input);
    const amountAsNumber = getAmount(input);
    const allTextExceptAmount = input.replace(/(\d+)\s*pounds?\s*(\d+)/, '')
                        .replace(/(\w+)\s*pounds?\s*(\w+)/, '')
                        .replace(/(\d+)\s*pounds?/, '')
                        .replace(/(\w+)\s*pounds?/, '')
                        .replace(/\d+\.?\d*/, '')
                        .replaceAll(/[£$€]/g, '')
                        .trim();
    const expenseName = getTextWithoutFillerWords(allTextExceptAmount);
    console.log('Parsed Name:', expenseName);
    return {expenseName, amountAsNumber};
}

function getAmount(input: string): number {
    const amountAsWordMatch0 = input.match(/(\d+)\s*pounds?\s*(\d+)/); // 2 pound 50
    const amountAsWordMatch1 = input.match(/(\w+)\s*pounds?\s*(\w+)/); // two pound fifty
    const amountAsWordMatch2 = input.match(/(\d+)\s*pounds?/); // 20 pounds
    const amountAsWordMatch3 = input.match(/(\w+)\s*pounds?/); // two pounds
    const amountAsNumberMatch = input.match(/\d+\.?\d*/); // 2.50 or 3

    if (amountAsWordMatch0) {
        const poundsAsNumber = parseFloat(amountAsWordMatch0[1]); // 2
        const penceAsNumber = parseFloat(amountAsWordMatch0[2]); // 50
        const amountAsNumber = poundsAsNumber + (penceAsNumber / 100); // 2.50
        console.log('Parsed Amount:', amountAsNumber);
        return amountAsNumber;
    }
    else if (amountAsWordMatch1 && amountAsWordMatch1[1] in WORD_TO_NUMBER_MAPPING && amountAsWordMatch1[2] in WORD_TO_NUMBER_MAPPING) { // two pound fifty
        const poundsAsWord = amountAsWordMatch1[1]; // two
        const penceAsWord = amountAsWordMatch1[2]; // fifty
        const poundsAsNumber = WORD_TO_NUMBER_MAPPING[poundsAsWord]; // 2
        const penceAsNumber = WORD_TO_NUMBER_MAPPING[penceAsWord]; // 50
        const amountAsNumber = poundsAsNumber + (penceAsNumber / 100); // 2.50
        console.log('Parsed Amount:', amountAsNumber);
        return amountAsNumber;
    }
    else if (amountAsWordMatch2) { // 20 pounds
        const poundsAsNumber = parseFloat(amountAsWordMatch2[1]); // 20
        console.log('Parsed Amount:', poundsAsNumber);
        return poundsAsNumber;
    }
    else if (amountAsWordMatch3) { // two pounds
        const numberAsWord = amountAsWordMatch3[1]; // two
        const amountAsNumber = numberAsWord ? WORD_TO_NUMBER_MAPPING[numberAsWord] : 0;
        console.log('Parsed Amount', amountAsNumber);
        return amountAsNumber;
    }
    else if (amountAsNumberMatch) { // 2.50 or 3
        const amountAsNumber = parseFloat(amountAsNumberMatch[0]);
        console.log('Parsed Amount:', amountAsNumber);
        return amountAsNumber;
    }
    else {
        console.log('no pattern match found for amount, defaulting to 0');
        return 0;
    }
}
