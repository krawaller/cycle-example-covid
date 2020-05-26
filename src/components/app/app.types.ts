import { MainDOMSource, VNode } from "@cycle/dom";
import { StateSource, Reducer } from "@cycle/state";
import { HTTPSource, RequestInput } from "@cycle/http";
import { Stream } from "xstream";

import { CountryDataState } from "../../types";

export type AppSources = {
  DOM: MainDOMSource;
  HTTP: HTTPSource;
  state: StateSource<AppState>;
  store: Stream<AppState>;
};

export type AppSinks = {
  DOM: Stream<VNode>;
  state: Stream<Reducer<AppState>>;
  HTTP: Stream<RequestInput>;
  log: Stream<any>;
  store: Stream<AppState>;
};

export type AppState = {
  data: {
    submittedName: string;
    countryData: CountryDataState;
  };
  ui: {
    fieldContent: string;
  };
};
