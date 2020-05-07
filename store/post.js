import ca from "element-ui/src/locale/lang/ca";

export const actions = {
  async fetch({ commit }) {
    try {
      return await this.$axios.$get("/api/post");
    } catch (e) {
      commit("setError", e, { root: true });
      throw e;
    }
  },
  async fetchById({ commit }, id) {
    try {
      return await this.$axios.$get(`/api/post/${id}`);
    } catch (e) {
      commit("setError", e, { root: true });
      throw e;
    }
  },
  async addView({ commit }, { views, _id }) {
    try {
      return await this.$axios.$put(`/api/post/add/view/${_id}`, {
        views
      });
    } catch (e) {
      commit("setError", e, { root: true });
      throw e;
    }
  },
  async fetchAdmin({ commit }) {
    try {
      return await this.$axios.$get("/api/post/admin");
    } catch (e) {
      commit("setError", e, { root: true });
      throw e;
    }
  },
  async fetchAdminById({ commit }, id) {
    try {
      return await this.$axios.$get(`/api/post/admin/${id}`);
    } catch (e) {
      commit("setError", e, { root: true });
      throw e;
    }
  },
  async getAnalytics({ commit }) {
    try {
      return await this.$axios.$get("/api/post/admin/get/analytics");
    } catch (e) {
      commit("setError", e, { root: true });
      throw e;
    }
  },
  async remove({ commit }, id) {
    try {
      return await this.$axios.$delete(`/api/post/admin/${id}`);
    } catch (e) {
      commit("setError", e, { root: true });
      throw e;
    }
  },
  async update({ commit }, { id, text }) {
    try {
      return await this.$axios.$put(`/api/post/admin/${id}`, { text });
    } catch (e) {
      commit("setError", e, { root: true });
      throw e;
    }
  },
  async create({ commit }, { title, text, img }) {
    try {
      const fd = new FormData();

      fd.append("title", title);
      fd.append("text", text);
      fd.append("image", img, img.name);

      return await this.$axios.$post("/api/post/admin", fd);
    } catch (e) {
      commit("setError", e, { root: true });
      throw e;
    }
  }
};
