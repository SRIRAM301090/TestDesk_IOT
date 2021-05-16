import { firebaseRealTimeDB } from "boot/firebase";

export function getTestCase({ commit, state }, sheetId) {
  const testCaseNode = sheetId;
  if (state.testCaseNode && state.testCaseNode === testCaseNode) {
    return;
  }

  if (state.testCaseNode && state.testCaseNode !== testCaseNode) {
    commit("clearTestCases");
    const loadedTestCases = firebaseRealTimeDB.ref(state.testCaseNode);
    loadedTestCases.off("child_added");
    loadedTestCases.off("child_changed");
    loadedTestCases.off("child_removed");
  }

  commit("setTestCaseNode", testCaseNode);
  const testCases = firebaseRealTimeDB.ref(testCaseNode);

  testCases.on("child_added", snapshot => {
    const test = snapshot.val();
    const payload = {
      id: snapshot.key,
      test: test
    };
    commit("addTestCase", payload);
  });

  testCases.on("child_changed", snapshot => {
    const test = snapshot.val();
    const payload = {
      id: snapshot.key,
      updates: test
    };
    commit("updateTestCases", payload);
  });

  testCases.on("child_removed", snapshot => {
    const testId = snapshot.key;
    commit("deleteTest", testId);
  });
}
