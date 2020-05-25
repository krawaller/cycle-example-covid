import xs, { Stream } from "xstream";

import { GetCountryDataSources } from "./getCountryData.types";
import { GetCountryDataAction } from "./getCountryData.actions";
import mapToAction from "./getCountryData.intent.handleResponse.mapToAction";

export function handleResponse(
  sources: GetCountryDataSources
): Stream<GetCountryDataAction> {
  return sources.HTTP.select("countryData")
    .map((response$) =>
      // catch errors and include them in the stream
      response$.replaceError((error) => xs.of({ error } as any))
    )
    .flatten() // this is a stream of streams, so we flatten into a single stream
    .map(mapToAction); // convert network responses into proper actions
}

export default handleResponse;
