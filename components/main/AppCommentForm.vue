<template>
  <el-form
    :model="controls"
    :rules="rules"
    ref="form"
    @submit.native.prevent="onSubmit"
  >
    <h1>New comment</h1>

    <el-form-item label="Your name" prop="name">
      <el-input v-model="controls.name" />
    </el-form-item>

    <el-form-item label="Your comment" prop="text">
      <el-input
        type="textarea"
        resize="none"
        :rows="2"
        v-model="controls.text"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" round native-type="submit" :loading="loading">
        Create
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    postId: {
      type: String,
      required: true
    }
  },
  name: "CommentForm",
  data: () => ({
    loading: false,
    controls: {
      name: "",
      text: ""
    },
    rules: {
      name: [
        {
          required: true,
          message: "Please type name",
          trigger: "blur"
        }
      ],
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
          const formData = {
            name: this.controls.name,
            text: this.controls.text,
            postId: this.postId
          };

          try {
            const newComment = await this.$store.dispatch(
              "comment/create",
              formData
            );

            this.$emit("created", newComment);
            this.$message.success("Comment added");
          } catch (e) {
            this.loading = false;
          }
        }
      });
    }
  }
};
</script>

<style lang="sass" scoped></style>
