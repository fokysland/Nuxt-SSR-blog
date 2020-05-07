export default ({ $axios, redirect, store }) => {
  $axios.interceptors.request.use(req => {
    if (store.getters["auth/token"] && !req.headers.common.Authorization) {
      const token = store.getters["auth/token"];
      req.headers.common.Authorization = `Bearer ${token}`;
    }

    return req;
  });

  $axios.onError(e => {
    if (e.response) {
      if (e.response.status === 401) {
        redirect("/admin/login?message=session");
        store.dispatch("auth/logout");
      }

      if (e.response.status === 500) {
        console.error("Server 500 error");
      }
    }
  });
};
