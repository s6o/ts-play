/**
 * https://rlee.dev/writing/practical-guide-to-fp-ts-part-2
 * Learning to use fp-ts Option, Map, Chain
 */

import { pipe } from 'fp-ts/pipeable';
import { flow } from 'fp-ts/lib/function';
import * as O from 'fp-ts/Option';

const foo1 = {
  bar: 'hello',
};

interface Foo {
  bar: string;
}

const foo2 = {
  bar: 'hello',
} as Foo | undefined;

const fooStr1 = pipe(foo1, (f) => f.bar);
const fooStr2 = pipe(foo2, (f) => f?.bar);

const opt1: O.Option<string> = pipe(
  foo2,
  O.fromNullable,
  O.map(({ bar }) => bar),
);
const opt2: O.Option<string> = pipe(
  undefined,
  O.fromNullable,
  O.map(({ bar }) => bar),
);

interface Fizz {
  buzz: string;
}
interface Fuzz {
  bar?: Fizz;
}

const foo3 = { bar: undefined } as Fuzz | undefined;
const fooStr3 = pipe(foo3, (f: any) => f?.bar?.buzz);
const opt3: O.Option<O.Option<string>> = pipe(
  foo3,
  O.fromNullable,
  O.map(({ bar }) =>
    pipe(
      bar,
      O.fromNullable,
      O.map(({ buzz }) => buzz),
    ),
  ),
);
const opt4: O.Option<string> = pipe(
  foo3,
  O.fromNullable,
  O.map(({ bar }) =>
    pipe(
      bar,
      O.fromNullable,
      O.map(({ buzz }) => buzz),
    ),
  ),
  O.flatten,
);
const opt5: O.Option<string> = pipe(
  foo3,
  O.fromNullable,
  O.map(({ bar }) => bar),
  O.chain(
    flow(
      O.fromNullable,
      O.map(({ buzz }) => buzz),
    ),
  ),
);

console.log(
  `Foo str\n\t${fooStr1}\n\t${fooStr2}\n\t${fooStr3} \nOpts\n\t${JSON.stringify(
    opt1,
  )}\n\t${JSON.stringify(opt2)}\n\t${JSON.stringify(opt3)}\n\t${JSON.stringify(
    opt4,
  )}\n\t${JSON.stringify(opt5)}`,
);
