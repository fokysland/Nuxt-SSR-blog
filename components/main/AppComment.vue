<template>
  <el-card class="comment">
    <div class="comment-header">
      <span class="name">{{ comment.name }}</span>
      <span> <i class="el-icon-time"></i>{{ comment.date | date }} </span>
    </div>
    <div class="comment-text">
      {{ comment.text }}
    </div>
  </el-card>
</template>

<script>
export default {
  name: "Comment",
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="sass" scoped>
.comment
  margin-bottom: 1rem

.comment-header
  font-size: 0.75rem
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 0.5rem

.comment-text
  white-space: pre-line
</style>
