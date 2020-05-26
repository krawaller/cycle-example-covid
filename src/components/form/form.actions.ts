import { FormState } from "./form.types";
import { Reducer } from "@cycle/state";

export const submit = (txt: string): Reducer<FormState> => (oldState) => ({
  fieldContent: "", // clear field when we submit
  submission: txt,
  placeholder: oldState!.placeholder,
});
