import { AssignableInputState } from "./assignableInput.types";
import { Reducer } from "@cycle/state";

export const typeStuff = (txt: string): Reducer<AssignableInputState> => (
  oldState
) => ({
  ...oldState!,
  field: txt,
});

export const clearField = (): Reducer<AssignableInputState> => (oldState) => ({
  ...oldState!,
  field: "",
});
