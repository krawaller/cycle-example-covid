import isolate from "@cycle/isolate";
import { ConfirmButton, ConfirmButtonSources } from "../confirmButton";
import { FormSources } from "./form.types";

export function useConfirmButton(sources: FormSources) {
  // The ConfirmButton isn't built to take a StateSource, so
  // instead of defining a Lens we create the needed streams
  // manually.
  const disabled$ = sources.state.stream.map((s) => !s.fieldContent);
  const confSources: ConfirmButtonSources = {
    DOM: sources.DOM,
    disabled$,
  };
  return isolate(ConfirmButton, "conf")(confSources);
}

export default useConfirmButton;
