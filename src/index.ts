import { run } from "@cycle/run";
import { makeDOMDriver } from "@cycle/dom";
import { withState } from "@cycle/state";
import { makeHTTPDriver } from "@cycle/http";
import { makeLogDriver, makeLocalStorageDriver } from "./drivers";

import { App } from "./components/app";

const DOM = makeDOMDriver("#app-container");
const HTTP = makeHTTPDriver();
const log = makeLogDriver("STATE");
const store = makeLocalStorageDriver("covid");

run(withState(App), { DOM, HTTP, log, store });
