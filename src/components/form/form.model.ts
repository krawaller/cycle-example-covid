import { Stream } from "xstream";
import { FormState, FormAction } from "./form.types";
import { Reducer } from "@cycle/state";
export * from "./form.types";

export function model(action$: Stream<FormAction>): Stream<Reducer<FormState>> {
  return action$
    .map((action) => (s: FormState) => ({
      submittedName: action,
      fieldContent: "",
    }))
    .startWith(() => ({ submittedName: "", fieldContent: "" }));
}

export default model;
