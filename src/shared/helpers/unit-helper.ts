import { unitMap } from "@/shared/interfaces/UnitKi";

export const match = (ki: string): number => {
    if (!ki) return 0;

    const match = ki.match(/([\d,.]+)\s*([A-Za-z]*)/);
    if (!match) return parseFloat(ki.replace(/,/g, "")) || 0;

    let [, numberPart, unit] = match;
    let numericValue = parseFloat(numberPart.replace(/,/g, ""));

    if (unit && unitMap[unit]) {
        numericValue *= unitMap[unit];
    }

    return numericValue;

}
