import { MainDOMSource, VNode } from "@cycle/dom";
import { Stream } from "xstream";

// Just for giggles, this component is not built with Cycle State in mind.
// It just defines what it needs directly in the source (a disabled$), and
// has its own internal state type (the ConfirmButtonMode type below)

export type ConfirmButtonSources = {
  DOM: MainDOMSource;
  disabled$: Stream<boolean>;
};

// Since the Confirmbutton only uses the input state as a signal,
// it isn't included in the sink.
export type ConfirmButtonSinks = {
  DOM: Stream<VNode>;
  submit$: Stream<undefined>; // clicks on the final confirm button
};

// This is an internal state, tracking what mode the button
// is currently in
export type ConfirmButtonMode =
  | "areyousure" // Confirming mode, show confirm and cancel buttons
  | "waiting" // Idle mode, show submit button
  | "disabled"; // Idle but disabled

// Internal action type
export type ConfirmButtonAction =
  | "ENABLE"
  | "DISABLE"
  | "MAYBE"
  | "CANCEL"
  | "CONFIRM";
