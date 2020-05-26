import { Stream } from "xstream";
import { ConfirmButtonMode, ConfirmButtonAction } from "./confirmButton.types";

export function model(
  action$: Stream<ConfirmButtonAction>
): Stream<ConfirmButtonMode> {
  return action$.map((action) => {
    if (action === "DISABLE") {
      return "disabled";
    }
    if (action === "MAYBE") {
      return "areyousure";
    }
    // CANCEL, CONFIRM and ENABLE all means we go to waiting mode
    return "waiting";
  });
}

export default model;
