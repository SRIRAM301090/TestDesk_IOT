const net = require("net");
const buf = new Buffer.alloc(4);
const client = new net.Socket();

export function tcpClientOpen({ commit, dispatch }) {
  // connect to client
  client.connect(1338, () => {
    commit("setTcpClientStatus", true);
    console.log("Connected to TestBench Server");
  });

  // close connection on error
  client.on("error", error => {
    console.log(error);
    commit("setTcpClientStatus", false);
    dispatch("tcpClientClose");
  });
}

export function tcpClientWrite({ rootGetters }, payload) {
  // send data to TestBench server
  payload.task.testcase =
    ("root getter", rootGetters["testCase/testProcedures"]);
  console.log(payload);

  const request = JSON.stringify(payload);
  buf.write(request.length.toString().trim(), 0, "utf8");
  client.write(buf);
  client.write(request);
}

export function tcpClientClose({ commit }) {
  client.destroy();
  commit("setTcpClientStatus", false);
}

export function createServer({ dispatch }) {
  // create the server
  let server = net.createServer(connection => {
    // run all of this when a client connects
    console.log("new connection");

    connection.on("data", data => {
      // run this when data is received
      const payload = JSON.parse(data.toString().trim());
      
      if (payload.command === "self-test") {
        dispatch("database/updateTest", payload, { root: true });
      } else if (payload.command === "start-test") {
        dispatch("results/uploadFile", payload, { root: true });
      }
    });
  });
  server.listen(1337);
}
