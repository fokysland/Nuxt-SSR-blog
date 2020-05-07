<template>
  <el-form
    :model="controls"
    :rules="rules"
    ref="form"
    @submit.native.prevent="onSubmit"
  >
    <h1>New user</h1>

    <el-form-item label="Login" prop="login">
      <el-input v-model.trim="controls.login" />
    </el-form-item>

    <div class="mb2">
      <el-form-item label="Password" prop="password">
        <el-input v-model.trim="controls.password" type="password" />
      </el-form-item>
    </div>

    <el-form-item>
      <el-button type="primary" round native-type="submit" :loading="loading">
        Create
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "users",
  layout: "admin",
  middleware: ["admin-auth"],
  head: {
    title: `Users | ${process.env.appName}`
  },
  data: () => ({
    loading: false,
    controls: {
      login: "",
      password: ""
    },
    rules: {
      login: [
        {
          required: true,
          message: "Please type login",
          trigger: "blur"
        }
      ],
      password: [
        {
          required: true,
          message: "Please type password",
          trigger: "blur"
        },
        {
          min: 6,
          message: "Password must be more than 6 symbols",
          trigger: "blur"
        }
      ]
    }
  }),
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true;

          try {
            const formData = {
              login: this.controls.login,
              password: this.controls.password
            };

            await this.$store.dispatch("auth/createUser", formData);
            this.$message.success("New user added");
            this.controls.login = "";
            this.controls.password = "";
            this.loading = false;
          } catch (e) {
            this.loading = false;
          }
        }
      });
    }
  }
};
</script>

<style lang="sass" scoped>
form
  width: 600px
</style>
