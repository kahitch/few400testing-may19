import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export function add(a: number, b: number) {
  return a + b;
}

export function getFavoriteForeignFilm(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Harakiri');
    }, 501);
  });
}

export function returnsAnObservable() {
  return of('Eggs').pipe(
    delay(20)
  );
}
