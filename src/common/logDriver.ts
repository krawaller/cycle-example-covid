import { Stream } from "xstream";

export const makeLogDriver = function (prefix) {
  return function (log$: Stream<any>) {
    log$.subscribe({
      next: function (item) {
        console.log(prefix, item);
      },
    });
  };
};
