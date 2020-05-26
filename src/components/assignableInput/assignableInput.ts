import {
  AssignableInputSinks,
  AssignableInputSources,
} from "./assignableInput.types";
export * from "./assignableInput.types";

import intent from "./assignableInput.intent";
import view from "./assignableInput.view";
import model from "./assignableInput.model";

export function AssignableInput(
  sources: AssignableInputSources
): AssignableInputSinks {
  const action$ = intent(sources);
  const reducer$ = model(action$);
  const vtree$ = view(sources.state.stream);

  return {
    DOM: vtree$,
    state: reducer$,
  };
}

export default AssignableInput;
