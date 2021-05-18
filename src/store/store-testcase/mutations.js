import Vue from "vue";
import state from "../store-auth/state";

export function addTestCase(state, payload) {
  Vue.set(state.testCases, payload.id, payload.test);
}

export function deleteTest(state, testId) {
  Vue.delete(state.testCases, testId);
}

export function updateTestCases(state, payload) {
  Object.assign(state.testCases[payload.id], payload.updates);
}

export function clearTestCases(state) {
  state.testCases = {};
}

export function setTestCaseNode(state, node) {
  state.testCaseNode = node;
}

export function userTest(state, test) {
  state.test = test;
}
