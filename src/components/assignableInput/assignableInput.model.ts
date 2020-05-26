import xs, { Stream } from "xstream";

import {
  AssignableInputAction,
  isClearFieldAction,
  isTypeStuffAction,
} from "./assignableInput.actions";
import { Reducer } from "@cycle/state";
import { AssignableInputState } from "./assignableInput.types";

export function model(
  action$: Stream<AssignableInputAction>
): Stream<Reducer<AssignableInputState>> {
  return xs.merge(
    action$.filter(isClearFieldAction).mapTo(() => ""),
    action$.filter(isTypeStuffAction).map((action) => () => action.payload)
  );
}

export default model;
