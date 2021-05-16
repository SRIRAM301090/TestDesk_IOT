<template>
  <q-page class="flex flex-center">
    <div class="row">
      <div class="col">
        <p>TCP Client Status: {{ tcpClientStatus }}</p>
      </div>
      <div class="col">
        <q-btn
          color="primary"
          class="q-mr-sm"
          icon="check"
          label="Reconnect"
          @click="connectTCPClient"
        />
        <q-btn
          color="primary"
          class="q-mr-sm"
          icon="check"
          label="Send"
          @click="tcpClientWrite(Date.now())"
        />
        <q-btn
          color="primary"
          class="q-mr-sm"
          icon="check"
          label="Close"
          @click="tcpClientClose"
        />
        <q-file outlined v-model="model">
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
        <q-btn
          color="primary"
          class="q-mr-sm"
          icon="check"
          label="Upload"
          @click="upload(model)"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";


export default {
  name: "PageIndex",
  data() {
    return {
      model: null
    };
  },
  methods: {
    ...mapActions("tcp", [
      "connectTCPClient",
      "tcpClientWrite",
      "tcpClientClose"
    ]),
    ...mapActions("database", ["getCommand", "upload"]),
  },
  computed: {
    ...mapGetters("tcp", ["tcpClientStatus"])
  },
  mounted() {
    this.connectTCPClient();
    this.getCommand();
    this.createServer();
  }
};
</script>
