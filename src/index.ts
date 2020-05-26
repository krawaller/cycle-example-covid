import { run } from "@cycle/run";
import { makeDOMDriver } from "@cycle/dom";
import { withState } from "@cycle/state";
import { makeHTTPDriver } from "@cycle/http";
import { makeLogDriver } from "./common";

import { App } from "./components/app";

const DOM = makeDOMDriver("#app-container");
const HTTP = makeHTTPDriver();
const log = makeLogDriver("COVID");

run(withState(App), { DOM, HTTP, log });
