import { firebaseRealTimeDB } from "boot/firebase";

export async function getTestCase({ commit, state }, sheetId) {
  return new Promise((resolve, reject) => {
    const testCaseNode = sheetId;
    if (state.testCaseNode && state.testCaseNode === testCaseNode) {
      resolve();
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
      resolve();
    });

    testCases.on("child_changed", snapshot => {
      const test = snapshot.val();
      const payload = {
        id: snapshot.key,
        updates: test
      };
      commit("updateTestCases", payload);
      resolve();
    });

    testCases.on("child_removed", snapshot => {
      const testId = snapshot.key;
      commit("deleteTest", testId);
      resolve();
    });
  });
}

export async function getTests({ commit }, test) {
  return new Promise((resolve, reject) => {
    commit("userTest", test);
    resolve()
  });
}
