import { HTTPSource, RequestInput, Response } from "@cycle/http";
import xstream, { Stream } from "xstream";
import { StateSource } from "@cycle/state";

type FetchedCountryData = {
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Date: string;
};

export type CountryDataState =
  | { state: "idle" }
  | { state: "loading"; country: string }
  | { state: "error"; error: string }
  | { state: "data"; data: FetchedCountryData };

const response2state = (res: Response | Error): CountryDataState => {
  if (res instanceof Error) return { state: "error", error: res.message };
  if (res.error) return { state: "error", error: res.error.message };
  try {
    const data: FetchedCountryData[] = res.body;
    if (!Array.isArray(data)) throw new Error();
    if (!data.length)
      return { state: "error", error: "The API had no data for this country" };
    return { state: "data", data: data[data.length - 1] }; // latest entry is the newest
  } catch (e) {
    return { state: "error", error: "Failed to parse response from server" };
  }
};

export type CountryDataSources = {
  HTTP: HTTPSource;
  state: StateSource<string>; // Stream of country names to load
};

export type CountryDataSinks = {
  HTTP: Stream<RequestInput>;
  countryData: Stream<CountryDataState>;
};

export function CountryData(sources: CountryDataSources): CountryDataSinks {
  const request$ = sources.state.stream.map((country) => ({
    url: `https://api.covid19api.com/total/country/${country}`,
    category: "countryData",
  }));

  const response$ = sources.HTTP.select("countryData")
    .map((response$) =>
      response$.replaceError((error) => xstream.of({ error } as any))
    )
    .flatten()
    .map(response2state);

  const countryData$: Stream<CountryDataState> = xstream
    .merge(
      sources.state.stream.map(
        (country) => ({ state: "loading", country } as const)
      ),
      response$
    )
    .startWith({ state: "idle" });

  return {
    HTTP: request$,
    countryData: countryData$,
  };
}

export default CountryData;