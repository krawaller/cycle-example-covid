import xs, { Stream } from "xstream";
import { StatsAction, isReloadAction, isClearAction } from "./stats.actions";
import { StatsState } from "./stats.types";
import { CountryDataContentState } from "../../common";
import { Reducer } from "@cycle/state";

export function model(
  action$: Stream<StatsAction>
): Stream<Reducer<StatsState>> {
  return xs.merge(
    action$.filter(isReloadAction).mapTo((oldState) => ({
      country: (oldState as CountryDataContentState).country,
      state: "loading",
      force: true,
    })),
    action$.filter(isClearAction).mapTo(() => ({ state: "idle" }))
  );
}

export default model;
