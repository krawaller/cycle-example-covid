import { Stream } from "xstream";
import sampleCombine from "xstream/extra/sampleCombine";

import { FormSources, FormState } from "./form.types";
import { Reducer } from "@cycle/state";
import { submit } from "./form.actions";

export function intent(
  sources: FormSources,
  confirmButtonClick$: Stream<undefined>
): Stream<Reducer<FormState>> {
  const field$ = sources.state.stream.map((s) => s.fieldContent);
  return confirmButtonClick$
    .compose(sampleCombine(field$))
    .map(([_, v]) => submit(v));
}

export default intent;
