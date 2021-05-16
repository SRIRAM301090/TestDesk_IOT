import { firebaseRealTimeDB} from "boot/firebase";

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

    console.log("request", payload);
    // Load Testcase
    if(payload.task.sheetId) {
      dispatch("testCase/getTestCase", payload.task.sheetId, { root: true });
    }

    // Check if last task in not finished to process
    if (payload.task.status !== "finished") {
      dispatch("tcp/tcpClientWrite", payload, { root: true });
    }
  });
}

export function updateTest({}, payload) {
  console.log(JSON.stringify(payload));
  const updateDB = firebaseRealTimeDB.ref(`bench/CHE7-L26526/${payload.id}`);
  updateDB.update(payload.updates);
}

