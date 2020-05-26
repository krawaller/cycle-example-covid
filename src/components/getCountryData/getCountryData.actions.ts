import { GetCountryDataState } from "./getCountryData.types";
import { Reducer } from "@cycle/state";
import { FetchedCountryData, CountryDataLoadingState } from "../../common";

export const setError = (error: string): Reducer<GetCountryDataState> => (
  oldState
) => ({
  error,
  state: "error",
});

export const setData = (
  data: FetchedCountryData
): Reducer<GetCountryDataState> => (oldState) => ({
  country: (oldState as CountryDataLoadingState).country,
  data,
  state: "data",
});
