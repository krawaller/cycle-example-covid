import {
  GetCountryDataSinks,
  GetCountryDataSources,
} from "./getCountryData.types";
import intent from "./getCountryData.intent";
import request from "./getCountryData.request";

export function GetCountryData(
  sources: GetCountryDataSources
): GetCountryDataSinks {
  const reducer$ = intent(sources);
  const request$ = request(sources);

  return {
    HTTP: request$,
    state: reducer$,
  };
}

export default GetCountryData;
