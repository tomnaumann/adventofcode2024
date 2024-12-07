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

let similarity_score: number = 0;
left.forEach((left_value) => {
    let appearances = right.filter(right_value => left_value == right_value).length;
    similarity_score += left_value * appearances;
});

console.log(similarity_score);
