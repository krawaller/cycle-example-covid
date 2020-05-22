import { div, h1, MainDOMSource, VNode } from "@cycle/dom";
import { StateSource, Reducer, Lens } from "@cycle/state";
import { HTTPSource, RequestInput } from "@cycle/http";
import isolate from "@cycle/isolate";
import xstream, { Stream } from "xstream";

import Form, { FormState } from "./form";
import GetCountryData from "./getCountryData";

import { AppState } from "./types";

type AppSources = {
  DOM: MainDOMSource;
  HTTP: HTTPSource;
  state: StateSource<AppState>;
};
type AppSinks = {
  DOM: Stream<VNode>;
  state: Stream<Reducer<AppState>>;
  HTTP: Stream<RequestInput>;
};

function App(sources: AppSources) {
  const formLens: Lens<AppState, FormState> = {
    get: (state: AppState) => ({
      fieldContent: state.ui.fieldContent,
      submittedName: state.data.submittedName,
    }),
    set: (oldParentState: AppState, newChildState: FormState): AppState => ({
      data: {
        submittedName: newChildState.submittedName,
        countryData: oldParentState.data.countryData,
      },
      ui: {
        fieldContent: newChildState.fieldContent,
      },
    }),
  };
  const formSinks = isolate(Form, { state: formLens, "*": "form" })(
    sources
  ) as AppSinks;

  const getCountryDataLens: Lens<AppState, string> = {
    get: (state: AppState) => state.data.submittedName,
    set: (s) => s,
  };

  const getCountryDataSinks = isolate(GetCountryData, {
    state: getCountryDataLens,
  })(sources);

  const vdom$ = xstream
    .combine(
      sources.state.stream,
      formSinks.DOM,
      getCountryDataSinks.countryData
    )
    .map(([appState, nameformvdom, out]) =>
      div([
        h1("Hello " + appState.data.submittedName),
        nameformvdom,
        JSON.stringify(out, null, 2),
      ])
    );

  const initialState: AppState = {
    ui: { fieldContent: "" },
    data: { submittedName: "", countryData: null },
  };

  const sinks: AppSinks = {
    DOM: vdom$,
    state: formSinks.state.startWith(() => initialState),
    HTTP: getCountryDataSinks.HTTP,
  };

  return sinks;
}

export default App;