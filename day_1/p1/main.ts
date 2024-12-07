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
left = left.sort()
right = right.sort()

let differences: number = 0;
for (let i = 0; i < left.length; i++) {
    differences += Math.abs(left[i] - right[i]);
}

console.log(differences);

