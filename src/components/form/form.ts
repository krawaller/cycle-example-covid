import xs from "xstream";
import intent from "./form.intent";
import view from "./form.view";
import model from "./form.model";
import useConfirmButton from "./form.useConfirmButton";
import useAssignableInput from "./form.useAssignableInput";
import { FormSinks, FormSources } from "./form.types";

export function Form(sources: FormSources): FormSinks {
  const assignableInputSinks = useAssignableInput(sources);
  const confirmButtonSinks = useConfirmButton(sources);

  const action$ = intent(sources, confirmButtonSinks.submit$);
  const vtree$ = view(assignableInputSinks.DOM, confirmButtonSinks.DOM);
  const reducer$ = model(action$);

  return {
    DOM: vtree$,
    state: xs.merge(reducer$, assignableInputSinks.state),
  };
}

export default Form;
