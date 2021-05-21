<template>
  <q-page class="flex flex-center">
    <div class="row q-mt-xl q-pl-xl">
      <div class="col">
        <q-btn
          :color="tcpClientStatus ? 'positive' : 'negative'"
          text-color="white"
          label="TCP Connection"
        />
        <q-input
          outlined
          v-model="testBench"
          label="Outlined"
          class="q-mt-md"
        />
        <q-btn
          color="primary"
          icon="check"
          label="Update"
          @click="onUpdate"
          class="q-mt-md"
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
      model: null,
      testBench: ""
    };
  },
  methods: {
    ...mapActions("tcp", [
      "tcpClientOpen",
      "tcpClientWrite",
      "tcpClientClose",
      "createServer"
    ]),
    ...mapActions("database", ["getCommand"]),
    getTestBench() {
      this.testBench = this.$q.localStorage.getItem("testBench");
      if (this.testBench) this.getCommand(this.testBench);
    },
    onUpdate() {
      this.$q.localStorage.set("testBench", this.testBench);
    }
  },
  computed: {
    ...mapGetters("tcp", ["tcpClientStatus"])
  },
  mounted() {
    this.getTestBench();
    this.tcpClientOpen();
    this.createServer();
  }
};
</script>
