import xs, { Stream } from "xstream";

import {
  GetCountryDataSources,
  GetCountryDataState,
} from "./getCountryData.types";
import mapResponseToAction from "./getCountryData.intent.mapResonseToAction";
import { Reducer } from "@cycle/state";

export function intent(
  sources: GetCountryDataSources
): Stream<Reducer<GetCountryDataState>> {
  return sources.HTTP.select("countryData")
    .map((response$) =>
      // catch errors and include them in the stream
      response$.replaceError((error) => xs.of({ error } as any))
    )
    .flatten() // this is a stream of streams, so we flatten into a single stream
    .map(mapResponseToAction); // convert network responses into proper actions
}

export default intent;
