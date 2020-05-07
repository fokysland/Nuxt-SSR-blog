<template>
  <el-menu
    :router="true"
    :default-active="$route.path"
    :style="{ height: '100%' }"
  >
    <el-menu-item index="/admin">
      <i class="el-icon-menu"></i>
      <span>Analytics</span>
    </el-menu-item>
    <el-menu-item index="/admin/create">
      <i class="el-icon-edit-outline"></i>
      <span>Create</span>
    </el-menu-item>
    <el-menu-item index="/admin/list">
      <i class="el-icon-tickets"></i>
      <span>Posts</span>
    </el-menu-item>
    <el-menu-item index="/admin/users">
      <i class="el-icon-service"></i>
      <span>Users</span>
    </el-menu-item>
    <el-menu-item index="/admin/logout">
      <i class="el-icon-setting"></i>
      <span>Logout</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Aside"
};
</script>

<style lang="sass" scoped></style>
