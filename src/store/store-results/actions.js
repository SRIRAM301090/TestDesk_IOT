import { storageBucket, firebaseFireStore } from "boot/firebase";

const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export async function uploadFile({ dispatch }, payload) {
  const results = JSON.parse(payload.updates.status);
  results.id = payload.id;
  results.user = payload.user;
  results.time = Date.now();
  results.project = payload.project;
  results.variant = payload.variant;

  let mainData = payload;
  mainData.updates.status = {};

  const reportName = results.report;
  const fs = require("fs").promises;
  const b64Data = await fs.readFile(
    `C:\\Sriram\\test-desk-automation\\Libraries\\Test_Libraries\\TestBuilds\\${reportName}`,
    {
      encoding: "base64"
    }
  );

  const blob = b64toBlob(b64Data, "text/html");
  const testref = storageBucket.ref(`${reportName}`);

  testref.put(blob).then(snapshot => {
    snapshot.ref.getDownloadURL().then(downloadURL => {
      results.url = downloadURL;
      mainData.results = results;
      dispatch("addResult", mainData);
    });
  });
}

export function addResult({ dispatch }, payload) {
  firebaseFireStore.collection("reports").add(payload.results);

  const results = payload.results;
  const updateDb = {};
  const updates = {};

  const testResult = {};
  testResult.id = results.id;
  testResult.result = {};
  Object.assign(testResult.result, {
    [results.testId]: {
      url: results.url,
      status: results.status,
      date: Date.now()
    }
  });

  dispatch("database/addTestResult", testResult, { root: true });

  updateDb.id = results.id;
  updates.status = results.last ? "finished" : "progress";
  updateDb.updates = updates;
  dispatch("database/updateTest", updateDb, { root: true });
}
