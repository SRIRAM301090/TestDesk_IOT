import Vue from "vue";
import Vuex from "vuex";

import auth from "./store-auth";
import tcp from "./store-tcp";
import database from "./store-database";
import results from "./store-results";
import testCase from "./store-testcase";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      tcp,
      database,
      results,
      testCase
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  });

  return Store;
}
