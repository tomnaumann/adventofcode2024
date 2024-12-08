import * as fs from 'fs';

function loadData(filePath: string): number[][] {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const reports: number[][] = [];
    fileContent
        .trim()
        .split('\n')
        .forEach(line => reports.push(line.split(/\s+/).map(Number)));
    return reports;
}

function isSafe(levels: number[]): boolean {
    let levelsIncreasing: boolean | null = null;

    for (let i = 1; i < levels.length; i++) {
        let prevLevel: number = levels[i - 1];
        let level: number = levels[i];
        let increasing: boolean = prevLevel < level;
        let difference: number = Math.abs(prevLevel - level);

        if (levelsIncreasing === null) {
            levelsIncreasing = increasing;
        }

        if (difference < 1 || difference > 3 || levelsIncreasing !== increasing) {
            return false;
        }
    }
    return true;
}

function isSafeWithToleration(levels: number[]): boolean {
    for (let i = 0; i < levels.length; i++) {
        let modifiedLevels = levels.slice(0, i).concat(levels.slice(i + 1));
        if (isSafe(modifiedLevels)) {
            return true;
        }
    }
    return false;
}

let reports: number[][] = loadData("puzzle_input.txt");
let safeScore: number = 0;

reports.forEach((levels) => {
    if (isSafe(levels) || isSafeWithToleration(levels)) {
        safeScore++;
    }
});

console.log(safeScore);