import {
  AssignableInputSinks,
  AssignableInputSources,
} from "./assignableInput.types";

import intent from "./assignableInput.intent";
import view from "./assignableInput.view";

export function AssignableInput(
  sources: AssignableInputSources
): AssignableInputSinks {
  const reducer$ = intent(sources);
  const vtree$ = view(sources.state.stream);

  return {
    DOM: vtree$,
    state: reducer$,
  };
}

export default AssignableInput;
