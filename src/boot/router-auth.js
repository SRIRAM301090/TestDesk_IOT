import { LocalStorage } from "quasar";
export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    const loggedIn = LocalStorage.getItem("loggedIn");
    console.log(loggedIn);
    if (!loggedIn && to.path !== "/auth") {
      next("/auth");
    } else if (loggedIn && to.path === "/auth") {
      next("/");
    } else {
      next();
    }
  });
};