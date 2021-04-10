/**
 * Should I use fp-ts Task?
 * https://dev.to/anthonyjoeseph/should-i-use-fp-ts-task-h52
 */

import fetch from 'node-fetch';
import { Response } from 'node-fetch';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/pipeable';
import * as T from 'fp-ts/Task';
import * as TE from 'fp-ts/TaskEither';


function jsFetch(): Promise<any> {
 return fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))
  .catch((err: any) => {
    console.error(err.mesage)
  });
}

const safeFetch: T.Task<void> = pipe(
  TE.tryCatch(
    (): Promise<Response> => fetch('https://jsonplaceholder.typicode.com/todos/1'),
    E.toError,
  ),
  TE.chain((r: Response) => TE.tryCatch((): Promise<unknown> => r.json(), E.toError)),
  T.map(E.fold(console.error, console.log)),
);


(async () => {

  await jsFetch();
  await safeFetch();

})();

