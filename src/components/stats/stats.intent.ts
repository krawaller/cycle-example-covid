import xs, { Stream } from "xstream";

import { StatsSources, StatsState } from "./stats.types";
import { clear, reload } from "./stats.actions";
import { Reducer } from "@cycle/state";

export function intent(sources: StatsSources): Stream<Reducer<StatsState>> {
  return xs.merge(
    sources.DOM.select(".clearBtn").events("click").mapTo(clear()),
    sources.DOM.select(".reloadBtn").events("click").mapTo(reload())
  );
}

export default intent;
