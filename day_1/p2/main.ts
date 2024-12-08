import * as fs from 'fs';

function loadData(filePath: string): [number[], number[]] {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const left: number[] = [];
    const right: number[] = [];
    fileContent
        .trim()
        .split('\n')
        .forEach(line => {
            const [a, b] = line.split(/\s+/).map(Number);
            left.push(a);
            right.push(b);
        });
    return [left, right]
}

let [left, right]: [number[], number[]] = loadData("puzzle_input.txt");

let similarityScore: number = 0;
left.forEach((leftValue) => {
    let appearances = right.filter(rightValue => leftValue == rightValue).length;
    similarityScore += leftValue * appearances;
});

console.log(similarityScore);
