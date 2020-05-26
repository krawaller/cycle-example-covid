import xs from "xstream";
import intent from "./form.intent";
import view from "./form.view";
import useConfirmButton from "./form.useConfirmButton";
import useAssignableInput from "./form.useAssignableInput";
import { FormSinks, FormSources } from "./form.types";

export function Form(sources: FormSources): FormSinks {
  const assignableInputSinks = useAssignableInput(sources);
  const confirmButtonSinks = useConfirmButton(sources);

  const reducer$ = intent(sources, confirmButtonSinks.submit$);
  const vtree$ = view(assignableInputSinks.DOM, confirmButtonSinks.DOM);

  return {
    DOM: vtree$,
    state: xs.merge(reducer$, assignableInputSinks.state),
  };
}

export default Form;
