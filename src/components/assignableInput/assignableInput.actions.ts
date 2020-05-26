import { basicFactory } from "../../common";

export const [typeStuff, isTypeStuffAction] = basicFactory<string>(
  "ASSIGNABLEINPUT::TYPE"
);

export const [clearField, isClearFieldAction] = basicFactory(
  "ASSIGNABLEINPUT::CLEAR"
);

export type AssignableInputAction =
  | ReturnType<typeof typeStuff>
  | ReturnType<typeof clearField>;
