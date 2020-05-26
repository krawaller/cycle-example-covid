import dropRepeats from "xstream/extra/dropRepeats";
import { GetCountryDataSources } from "./getCountryData.types";
import { Stream } from "xstream";
import { isLoadingState } from "../../common";
import { initRequest, GetCountryDataAction } from "./getCountryData.actions";

export function request(
  sources: GetCountryDataSources
): Stream<GetCountryDataAction> {
  // Convert the input state stream to a stream of countries to be loaded
  const country$ = sources.state.stream
    .filter(isLoadingState)
    .compose(dropRepeats((s1, s2) => !s1.force && s1.country === s2.country))
    .map((s) => (s as { country: string }).country);

  // Turn those countries into request actions
  return country$.map((country) =>
    initRequest({
      url: `https://api.covid19api.com/total/country/${country}`,
      category: "countryData",
    })
  );
}

export default request;