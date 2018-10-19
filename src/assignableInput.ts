import {input, MainDOMSource} from '@cycle/dom';
import isolate from '@cycle/isolate'
import xstream, {Stream} from 'xstream';

export function AssignableInput(sources: { DOM: MainDOMSource, assign$: Stream<string> }) {

  const newValue$ = sources.DOM
    .select('.field').events('input')
    .map((e: Event) => e && e.target && (e.target as HTMLInputElement).value);

  const state$ = xstream.merge(
    newValue$, sources.assign$
  );

  const vtree$ = state$.map(state => input('.field', {attrs: {type: 'text'}, props:{value: state}}));

  return { DOM: vtree$, value$: newValue$ as Stream<string> };
};

export default (sources) => isolate(AssignableInput)(sources);
