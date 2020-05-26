import { MainDOMSource, VNode } from "@cycle/dom";
import { Stream } from "xstream";
import { StateSource, Reducer } from "@cycle/state";

export type AssignableInputState = {
  field: string;
  placeholder: string;
};

export type AssignableInputSources = {
  DOM: MainDOMSource;
  state: StateSource<AssignableInputState>;
};
export type AssignableInputSinks = {
  DOM: Stream<VNode>;
  state: Stream<Reducer<AssignableInputState>>;
};
