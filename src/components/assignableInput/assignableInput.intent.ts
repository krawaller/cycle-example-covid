import xs, { Stream } from "xstream";
import {
  AssignableInputSources,
  AssignableInputState,
} from "./assignableInput.types";
import { typeStuff, clearField } from "./assignableInput.actions";
import { Reducer } from "@cycle/state";

export function intent(
  sources: AssignableInputSources
): Stream<Reducer<AssignableInputState>> {
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
