import isolate from "@cycle/isolate";
import { Reducer, Lens } from "@cycle/state";
import { Stream } from "xstream";

import { FormSources, FormState } from "./form.types";
import { AssignableInput, AssignableInputState } from "../assignableInput";

const assignableInputLens: Lens<FormState, AssignableInputState> = {
  get: (s: FormState) => ({
    field: s.fieldContent,
    placeholder: s.placeholder,
  }),
  set: (oldFormState, newInputState) => ({
    ...oldFormState!,
    fieldContent: newInputState!.field || "",
  }),
};

function useAssignableInput(sources: FormSources) {
  const sinks = isolate(AssignableInput, {
    state: assignableInputLens,
  })(sources);
  return {
    ...sinks,
    // Types get wrangled somehow
    state: sinks.state as Stream<Reducer<FormState>>,
  };
}

export default useAssignableInput;
