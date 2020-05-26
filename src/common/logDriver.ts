import { Stream } from "xstream";

export const makeLogDriver = (prefix) => (log$?: Stream<any>) => {
  if (log$) {
    log$.subscribe({
      next: (item) => console.log(prefix, item),
    });
  }
};
