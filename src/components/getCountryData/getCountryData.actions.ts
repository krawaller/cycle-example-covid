import { basicFactory, FetchedCountryData } from "../../common";
import { RequestInput } from "@cycle/http";

export const [setError, isSetErrorAction] = basicFactory<{ error: string }>(
  "GETDATA::ERROR"
);

export const [setData, isSetDataAction] = basicFactory<{
  data: FetchedCountryData;
  country: string;
}>("GETDATA::DATA");

export const [initRequest, isInitRequestAction] = basicFactory<RequestInput>(
  "GETDATA::REQUEST"
);

export type GetCountryDataAction =
  | ReturnType<typeof setError>
  | ReturnType<typeof setData>
  | ReturnType<typeof initRequest>;
