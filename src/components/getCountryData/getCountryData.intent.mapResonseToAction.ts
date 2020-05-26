import { Response } from "@cycle/http";
import { setError, setData } from "./getCountryData.actions";
import { Reducer } from "@cycle/state";
import { GetCountryDataState } from "./getCountryData.types";

export const mapToAction = (
  res: Response | Error
): Reducer<GetCountryDataState> => {
  if (res instanceof Error)
    return setError("Fetching 'COUNTRY': " + res.message);
  if (res.error) return setError("Fetching 'COUNTRY': " + res.error.message);
  try {
    const data = res.body;
    if (!Array.isArray(data)) return setError("Unknown response for 'COUNTRY'");
    if (!data.length) return setError("The API had no data for 'COUNTRY'");
    return setData(data[data.length - 1]); // latest entry is the newest
  } catch (e) {
    return setError("Failed to parse response from server for 'COUNTRY'");
  }
};

export default mapToAction;
