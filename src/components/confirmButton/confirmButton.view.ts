import { span, button } from "@cycle/dom";
import { Stream } from "xstream";
import { ConfirmButtonMode } from "./confirmButton.types";

export function view(state$: Stream<ConfirmButtonMode>) {
  return state$.map((state) => {
    if (state === "areyousure") {
      return span(".confirmbutton", [
        button(".cancel", { key: "cancel" }, "Cancel"),
        button(".confirm", { key: "confirm" }, "Confirm"),
      ]);
    }
    return span(".confirmbutton", [
      button(
        ".maybe",
        { attrs: { key: "submit", disabled: state === "disabled" } },
        "Submit"
      ),
    ]);
  });
}

export default view;
