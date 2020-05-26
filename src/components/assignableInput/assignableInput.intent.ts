import xs, { Stream } from "xstream";
import { AssignableInputSources } from "./assignableInput.types";
import {
  typeStuff,
  clearField,
  AssignableInputAction,
} from "./assignableInput.actions";

export function intent(
  sources: AssignableInputSources
): Stream<AssignableInputAction> {
  return xs.merge(
    // typing in field
    sources.DOM.select(".field")
      .events("input")
      .filter((e) =>
        Boolean(
          e.target && typeof (e.target as HTMLInputElement).value === "string"
        )
      )
      .map((e: Event) => typeStuff((e.target as HTMLInputElement).value)),
    // clear field content
    sources.DOM.select(".fieldClearBtn").events("click").mapTo(clearField())
  );
}

export default intent;
