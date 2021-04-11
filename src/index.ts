/**
 * https://rlee.dev/writing/practical-guide-to-fp-ts-part-1
 * Learning to use fp-ts pipe, flow
 */

import { pipe } from 'fp-ts/pipeable';
import { flow } from 'fp-ts/lib/function';

function addOne(num: number): number {
  return num + 1;
}

function mulTwo(num: number): number {
  return num * 2;
}

function toStr(num: number): string {
  return `${num}`;
}

function concat(
  a: number,
  transformer: (a: number) => string,
): [number, string] {
  return [a, transformer(a)];
}

const pipeResult = pipe(1, addOne, mulTwo, toStr);
const flowResult1 = pipe(1, flow(addOne, mulTwo, toStr));
const flowResult2 = flow(addOne, mulTwo, toStr)(1);
const concatResult1 = concat(1, (n) => pipe(n, addOne, mulTwo, toStr)); // not ideal
const concatResult2 = concat(1, flow(addOne, mulTwo, toStr));

console.log(
  `Pipe ${pipeResult} | Flow ${flowResult1}, ${flowResult2} | Concat ${concatResult1} - ${concatResult2}`,
);
