<template>
  <q-page class="flex flex-center">
    <div class="row q-mt-xl q-pl-xl">
      <div class="col">
        <q-btn
          :color="tcpClientStatus ? 'positive' : 'negative'"
          text-color="white"
          label="TCP Connection"
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
      "tcpClientOpen",
      "tcpClientWrite",
      "tcpClientClose",
      "createServer"
    ]),
    ...mapActions("database", ["getCommand"])
  },
  computed: {
    ...mapGetters("tcp", ["tcpClientStatus"])
  },
  mounted() {
    this.tcpClientOpen();
    this.getCommand();
    this.createServer();
  }
};
</script>
