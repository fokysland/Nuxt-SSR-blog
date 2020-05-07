<template>
  <el-form
    :model="controls"
    :rules="rules"
    ref="form"
    @submit.native.prevent="onSubmit"
  >
    <h1 class="mb">Create new post</h1>

    <el-form-item label="Post title" prop="title" class="mb2">
      <el-input v-model="controls.title" />
    </el-form-item>

    <el-form-item label="Text in format .md or .html" prop="text" class="mb2">
      <el-input
        v-model="controls.text"
        type="textarea"
        resize="none"
        :rows="10"
      />
    </el-form-item>

    <el-button type="success" @click="previewDialog = true" class="mb">
      Preview
    </el-button>

    <el-dialog title="Preview" :visible.sync="previewDialog">
      <div :key="controls.text">
        <vue-markdown>{{ controls.text }}</vue-markdown>
      </div>
    </el-dialog>

    <el-upload
      class="mb"
      drag
      ref="upload"
      action="https://vk.com"
      :on-change="onChange"
      :auto-upload="false"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">Drag image <em>or click</em></div>
      <div class="el-upload__tip" slot="tip">
        Files with extension jpeg or png
      </div>
    </el-upload>

    <el-form-item>
      <el-button type="primary" native-type="submit" :loading="loading">
        Create
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "create",
  layout: "admin",
  middleware: ["admin-auth"],
  head: {
    title: `Create new post | ${process.env.appName}`
  },
  data: () => ({
    loading: false,
    img: null,
    controls: {
      text: "",
      title: ""
    },
    previewDialog: false,
    rules: {
      text: [
        {
          required: true,
          message: "Please type text",
          trigger: "blur"
        }
      ],
      title: [
        {
          required: true,
          message: "Please type title",
          trigger: "blue"
        }
      ]
    }
  }),
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid && this.img) {
          this.loading = true;

          try {
            await this.$store.dispatch("post/create", {
              title: this.controls.title,
              text: this.controls.text,
              img: this.img
            });

            this.controls.text = "";
            this.controls.title = "";
            this.img = null;
            this.$refs.upload.clearFiles();
            this.$message.success("Post created");
          } finally {
            this.loading = false;
          }
        } else {
          this.$message.warning("Form isn't valid");
        }
      });
    },
    onChange(file, fileList) {
      this.img = file.raw;
    }
  }
};
</script>

<style lang="sass" scoped>
form
  width: 600px
</style>
