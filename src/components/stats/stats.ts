import { StatsSources, StatsSinks } from "./stats.types";
import view from "./stats.view";
import intent from "./stats.intent";

export function Stats(sources: StatsSources): StatsSinks {
  const vdom$ = view(sources.state.stream);
  const reducer$ = intent(sources);
  return {
    DOM: vdom$,
    state: reducer$,
  };
}

export default Stats;
