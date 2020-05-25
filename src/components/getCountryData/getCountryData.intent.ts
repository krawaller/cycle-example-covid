import xs, { Stream } from "xstream";
import { GetCountryDataSources } from "./getCountryData.types";

import { GetCountryDataAction } from "./getCountryData.actions";
import handleResponse from "./getCountryData.intent.handleResponse";
import initRequest from "./getCountryData.intent.initRequest";

export function intent(
  sources: GetCountryDataSources
): Stream<GetCountryDataAction> {
  return xs.merge(handleResponse(sources), initRequest(sources));
}

export default intent;
