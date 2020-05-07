<template>
  <el-card shadow="always" :style="{ width: '600px' }">
    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
    >
      <h1>Login</h1>

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
          Login
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "login",
  layout: "empty",
  head: {
    title: `Login | ${process.env.appName}`
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

            await this.$store.dispatch("auth/login", formData);
            await this.$router.push("/admin");
          } catch (e) {
            this.loading = false;
          }
        }
      });
    }
  },
  mounted() {
    const messages = {
      login: () => this.$message.info("Login first"),
      logout: () => this.$message.success("Logout"),
      session: () => this.$message.warning("Session expired"),
      DEFAULT: () => {}
    };

    const { message } = this.$route.query;
    const handler = messages[message] || messages.DEFAULT;
    handler();
  }
};
</script>

<style lang="sass" scoped></style>
