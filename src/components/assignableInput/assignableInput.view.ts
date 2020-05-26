import { input, span } from "@cycle/dom";
import { Stream } from "xstream";
import { AssignableInputState } from "./assignableInput.types";

export default function view(state$: Stream<AssignableInputState>) {
  return state$.map((state) =>
    span(".fieldContainer", [
      input(".field", {
        attrs: { type: "text" },
        props: { value: state, placeholder: "Enter country here" },
      }),
      span(".fieldClearBtn", ["🗑️"]),
    ])
  );
}
