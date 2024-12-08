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

let reports: number[][] = loadData("puzzle_input.txt");
let unsafeScore: number = 0;
reports.forEach((levels) => {
    let levelsIncreasing: boolean | null = null;
    for (let i = 1; i < levels.length; i++) {
        let prevLevel: number = levels[i-1];
        let level: number = levels[i];
        let increasing: boolean = prevLevel - level < 0;
        if (levelsIncreasing == null) {
            levelsIncreasing = increasing;
        }
        let difference: number = Math.abs(prevLevel - level);
        if (difference < 1 || difference > 3 || levelsIncreasing != increasing) {
            unsafeScore += 1;
            break;
        }
    }
});
let safeScore: number = reports.length - unsafeScore;
console.log(safeScore);