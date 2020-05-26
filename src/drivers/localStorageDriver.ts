import xs from "xstream";

export const makeLocalStorageDriver = function (key) {
  return function (save$) {
    // save values from sink to localstorage
    save$.subscribe({
      next: function (i) {
        localStorage.setItem(key, JSON.stringify(i));
      },
    });
    // return existing saved value as a source
    const saveStr = localStorage.getItem(key);
    if (saveStr) {
      try {
        const hydratedState = JSON.parse(saveStr);
        return xs.of(hydratedState);
      } catch (e) {}
    }
    return xs.empty();
  };
};
