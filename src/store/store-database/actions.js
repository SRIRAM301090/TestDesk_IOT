import { firebaseRealTimeDB } from "boot/firebase";

export function getCommand({ commit, dispatch }, testBench) {

  commit("setTestBench", testBench);

  const userTask = firebaseRealTimeDB
    .ref(`bench/${testBench}`)
    .orderByChild("date")
    .limitToLast(1);

  userTask.on("child_added", snapshot => {
    const task = snapshot.val();
    const payload = {
      id: snapshot.key,
      task: task
    };

    // Check if last task in not finished to process
    if (payload.task.status !== "finished") {
      if (payload.task.sheetId) {
        // Load Testcase
        dispatch("testCase/getTestCase", payload.task.sheetId, {
          root: true
        }).then(() => {
          dispatch("testCase/getTests", payload.task.test, { root: true }).then(
            () => {
              dispatch("tcp/tcpClientWrite", payload, { root: true });
            }
          );
        });
      }
    }
  });
}

export function updateTest({state}, payload) {
  const testBench = state.testBench;
  const updateDB = firebaseRealTimeDB.ref(`bench/${testBench}/${payload.id}`);
  updateDB.update(payload.updates);
}

export function addTestResult({state}, payload) {
  const testBench = state.testBench;
  const key = Object.keys(payload.result)[0];
  const addToDB = firebaseRealTimeDB.ref(
    `bench/${testBench}/${payload.id}/result/${key}`
  );
  addToDB.set(payload.result[key]);
}
