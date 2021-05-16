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
  const fs = require("fs").promises;
  const b64Data = await fs.readFile(
    "C:\\Users\\sgopala2\\Desktop\\Report.html",
    {
      encoding: "base64"
    }
  );

  const blob = b64toBlob(b64Data, "text/html");
  const testref = storageBucket.ref("image");

  testref.put(blob).then(snapshot => {
    snapshot.ref.getDownloadURL().then(downloadURL => {
      dispatch("addResult", downloadURL);
    });
  });
}

export function addResult({}, payload) {
  console.log("result added", payload);
  firebaseFireStore.collection("repots").add({ date: Date.now() });
}
