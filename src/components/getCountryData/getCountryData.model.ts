import xs, { Stream } from "xstream";
import { GetCountryDataInputState } from "./getCountryData.types";
import {
  GetCountryDataAction,
  isSetDataAction,
  isSetErrorAction,
} from "./getCountryData.actions";

export function model(
  action$: Stream<GetCountryDataAction>
): Stream<GetCountryDataInputState> {
  return xs.merge(
    action$.filter(isSetDataAction).map((action) => ({
      state: "data",
      data: action.payload.data,
      country: action.payload.country,
    })),
    action$.filter(isSetErrorAction).map((action) => ({
      state: "error",
      error: action.payload.error,
    }))
  );
}

export default model;
