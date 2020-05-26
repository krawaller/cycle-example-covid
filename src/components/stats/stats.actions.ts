import { StatsState } from "./stats.types";
import { Reducer } from "@cycle/state";
import { CountryDataContentState } from "../../common";

export const reload = (): Reducer<StatsState> => (oldState) => ({
  country: (oldState as CountryDataContentState).country,
  state: "loading",
  force: true,
});

export const clear = (): Reducer<StatsState> => (oldState) => ({
  state: "idle",
});
