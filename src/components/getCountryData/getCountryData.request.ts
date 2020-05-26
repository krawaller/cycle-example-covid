import dropRepeats from "xstream/extra/dropRepeats";
import { GetCountryDataSources } from "./getCountryData.types";
import { Stream } from "xstream";
import { isLoadingState } from "../../types";
import { RequestInput } from "@cycle/http";

export function request(sources: GetCountryDataSources): Stream<RequestInput> {
  return sources.state.stream.filter(isLoadingState).map((s) => ({
    url: `https://api.covid19api.com/total/country/${s.country}`,
    category: "countryData",
  }));
}

export default request;
