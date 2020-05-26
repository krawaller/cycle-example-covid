import produce from "immer";
import { Lens, Reducer } from "@cycle/state";
import isolate from "@cycle/isolate";

import { AppState, AppSources } from "./app.types";
import { Form, FormState } from "../form";
import { Stream } from "xstream";

const formLens: Lens<AppState, FormState> = {
  get: (state: AppState) => ({
    fieldContent: state.ui.fieldContent,
    submittedName: state.data.country || "",
  }),
  set: (oldParentState: AppState, newChildState: FormState) =>
    produce(oldParentState, (draft) => {
      console.log("NEWFORM", newChildState);
      draft.ui.fieldContent = newChildState.fieldContent;
      if (
        newChildState.submittedName &&
        draft.data.country != newChildState.submittedName
      ) {
        draft.data = {
          state: "loading",
          country: newChildState.submittedName,
        };
      }
    }),
};

export function useForm(sources: AppSources) {
  const formSinks = isolate(Form, { state: formLens, "*": "form" })(sources);
  return {
    ...formSinks,
    // Types get mangled somehow
    state: formSinks.state as Stream<Reducer<AppState>>,
  };
}

export default useForm;
