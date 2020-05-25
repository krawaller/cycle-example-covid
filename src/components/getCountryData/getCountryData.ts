import {
  GetCountryDataSinks,
  GetCountryDataSources,
} from "./getCountryData.types";
import intent from "./getCountryData.intent";
import model from "./getCountryData.model";
import { isInitRequestAction } from "./getCountryData.actions";

export function GetCountryData(
  sources: GetCountryDataSources
): GetCountryDataSinks {
  const action$ = intent(sources);
  const state$ = model(action$);

  return {
    HTTP: action$.filter(isInitRequestAction).map((a) => a.payload),
    state: state$.map((s) => () => s),
  };
}

export default GetCountryData;
