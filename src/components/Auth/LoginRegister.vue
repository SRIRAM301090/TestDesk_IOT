<template>
  <q-page>
    <div class="q-mb-md">
      <q-banner class="bg-grey-3">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        {{ type | capitalize }} to access your Test Desk App.
      </q-banner>
    </div>
    <q-form @submit="onSubmit">
      <div>
        <q-input
          outlined
          lazy-rules
          v-model="email"
          label="Email"
          ref="email"
          :rules="[
            val => validateEmail(val) || 'Please enter a valid email address'
          ]"
        />
      </div>
      <div>
        <q-input
          outlined
          lazy-rules
          v-model="password"
          label="Password"
          type="password"
          ref="password"
          :rules="[val => val.length >= 6 || 'Please use maximum 6 characters']"
        />
      </div>
      <div class="text-center">
        <q-btn
          :label="type | capitalize"
          type="submit"
          color="primary"
          style="width: 200px"
          no-caps
        />
      </div>
    </q-form>

    <p class="text-center q-mt-md">or</p>

    <div class="text-center">
      <q-btn
        style="width: 200px"
        color="negative"
        no-caps
        icon="person"
        label="Sign in with Google"
        @click="googleSignup"
      />
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  filters: {
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  },
  props: ["type"],
  computed:{
    ...mapState("auth", ["loggedIn"])
  },
  methods: {
    ...mapActions("auth", ["registerUser", "loginUser", "googleSignup"]),
    onSubmit() {
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        if (this.type === "login") {
          console.log("user login trigger");
          this.loginUser({
            email: this.email,
            password: this.password
          });
        } else {
          console.log("user register trigger");
          this.registerUser({
            email: this.email,
            password: this.password
          });
        }
      }
    },
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  },
  watch: {
    loggedIn(value){
      if(value){
      this.$router.push("/");
      }
    }
  }
};
</script>

<style></style>
