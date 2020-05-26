import { HTTPSource, RequestInput } from "@cycle/http";
import { Stream } from "xstream";
import { StateSource, Reducer } from "@cycle/state";

import { CountryDataState } from "../../common";

export type GetCountryDataState = CountryDataState;

export type GetCountryDataSources = {
  HTTP: HTTPSource;
  state: StateSource<GetCountryDataState>;
};

export type GetCountryDataSinks = {
  HTTP: Stream<RequestInput>;
  state: Stream<Reducer<GetCountryDataState>>;
};
