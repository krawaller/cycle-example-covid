import { Response } from "@cycle/http";
import { setError, setData } from "./getCountryData.actions";
import { Reducer } from "@cycle/state";
import { GetCountryDataState } from "./getCountryData.types";

export const mapToAction = (
  res: Response | Error
): Reducer<GetCountryDataState> => {
  if (res instanceof Error) return setError(res.message);
  if (res.error) return setError(res.error.message);
  try {
    const data = res.body;
    if (!Array.isArray(data)) throw new Error();
    if (!data.length) return setError("The API had no data for 'COUNTRY'");
    return setData(data[data.length - 1]); // latest entry is the newest
  } catch (e) {
    return setError("Failed to parse response from server");
  }
};

export default mapToAction;
