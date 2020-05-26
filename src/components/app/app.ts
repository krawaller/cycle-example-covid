import xs from "xstream";
import { AppState, AppSinks, AppSources } from "./app.types";
import useForm from "./app.useForm";
import useGetCountryData from "./app.useGetCountryData";
import useStats from "./app.useStats";
import view from "./app.view";

const initialState: AppState = {
  ui: { fieldContent: "" },
  data: { state: "idle" },
};

export function App(sources: AppSources) {
  const formSinks = useForm(sources);
  const statsSinks = useStats(sources);
  const getCountryDataSinks = useGetCountryData(sources);

  const vdom$ = view(formSinks.DOM, statsSinks.DOM);
  const reducer$ = xs
    .merge(
      formSinks.state,
      getCountryDataSinks.state,
      statsSinks.state,
      sources.store.map((s) => () => s)
    )
    .startWith(() => initialState);

  const sinks: AppSinks = {
    DOM: vdom$,
    state: reducer$,
    HTTP: getCountryDataSinks.HTTP,
    log: sources.state.stream.map((s) => JSON.stringify(s, null, 2)),
    store: sources.state.stream,
  };

  return sinks;
}

export default App;
