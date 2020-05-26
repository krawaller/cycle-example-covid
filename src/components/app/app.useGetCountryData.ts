import produce from "immer";
import { Lens, Reducer } from "@cycle/state";
import isolate from "@cycle/isolate";

import { GetCountryData, GetCountryDataState } from "../getCountryData";

import { AppState, AppSources } from "./app.types";
import { Stream } from "xstream";

const getCountryDataLens: Lens<AppState, GetCountryDataState> = {
  get: (state: AppState) => state.data,
  set: (oldParentState: AppState, newChildState) =>
    produce(oldParentState, (draft) => {
      draft.data = newChildState!;
    }),
};

export function useGetCountryData(sources: AppSources) {
  const sinks = isolate(GetCountryData, {
    state: getCountryDataLens,
  })(sources);
  return {
    ...sinks,
    // Types get wrangled somehow
    state: sinks.state as Stream<Reducer<AppState>>,
  };
}

export default useGetCountryData;
