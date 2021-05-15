<template>
  <q-page padding>
    <div class="auth-tabs">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Register" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <login-register :type="tab" />
        </q-tab-panel>

        <q-tab-panel name="register">
          <login-register :type="tab" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script>

export default {
  data() {
    return {
      tab: "login"
    };
  },
  components: {
    "login-register": () => import("../components/Auth/LoginRegister.vue")
  },
};
</script>

<style lang="sass" scoped>
.auth-tabs
  max-width: 500px
  margin: 0 auto
.q-tab-panels
  background-color:#fafafa
</style>
