<template>
  <div class="page-wrap">
    <el-breadcrumb separator="/" class="mb">
      <el-breadcrumb-item to="/admin/list">Posts</el-breadcrumb-item>
      <el-breadcrumb-item>
        {{ post.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
    >
      <el-form-item label="Text in format .md or .html" prop="text" class="mb2">
        <el-input
          v-model="controls.text"
          type="textarea"
          resize="none"
          :rows="10"
        />
      </el-form-item>

      <div class="mb">
        <small class="mr">
          <i class="el-icon-time"></i>
          <span>
            {{ post.date | date }}
          </span>
        </small>

        <small>
          <i class="el-icon-view"></i>
          <span>
            {{ post.views }}
          </span>
        </small>
      </div>

      <el-form-item>
        <el-button type="primary" native-type="submit" :loading="loading">
          Update
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["admin-auth"],
  head() {
    return { title: `Post ${this.post.title} | ${process.env.appName}` };
  },
  validate({ params }) {
    return Boolean(params.id);
  },
  async asyncData({ store, params }) {
    const post = await store.dispatch("post/fetchAdminById", params.id);
    return { post };
  },
  mounted() {
    this.controls.text = this.post.text;
  },
  data: () => ({
    loading: false,
    controls: {
      text: ""
    },
    rules: {
      text: [
        {
          required: true,
          message: "Please type text",
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
            await this.$store.dispatch("post/update", {
              text: this.controls.text,
              id: this.post._id
            });
            this.$message.success("Post updated");
          } finally {
            this.loading = false;
          }
        }
      });
    }
  }
};
</script>
<style lang="sass" scoped>
.page-wrap
  width: 600px
.mr
  margin-right: 2rem
</style>
