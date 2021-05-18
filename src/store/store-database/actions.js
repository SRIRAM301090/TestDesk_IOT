import { firebaseRealTimeDB } from "boot/firebase";

const userTask = firebaseRealTimeDB
  .ref(`bench/CHE7-L26526`)
  .orderByChild("date")
  .limitToLast(1);

export function getCommand({ dispatch }) {
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

export function updateTest({}, payload) {
  const updateDB = firebaseRealTimeDB.ref(`bench/CHE7-L26526/${payload.id}`);
  updateDB.update(payload.updates);
}

export function addTestResult({}, payload) {
  const key = Object.keys(payload.result)[0];
  const addToDB = firebaseRealTimeDB.ref(`bench/CHE7-L26526/${payload.id}/result/${key}`);
  addToDB.set(payload.result[key]);
}
