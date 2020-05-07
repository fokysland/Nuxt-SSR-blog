<template>
  <div class="wrap">
    <el-container :style="{ height: '100%' }">
      <el-aside width="250px">
        <app-aside />
      </el-aside>
      <el-main>
        <nuxt />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AppAside from "@/components/admin/AppAside";
export default {
  components: { AppAside },
  name: "admin",
  computed: {
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    error(value) {
      this.$message.error(value.response.data.message);
    }
  }
};
</script>

<style lang="sass" scoped>
.wrap
  width: 100%
  height: 100vh
</style>
