<template>
  <el-table :data="posts" style="width: 100%">
    <el-table-column prop="title" label="Title"></el-table-column>

    <el-table-column label="Date" width="180">
      <template slot-scope="{ row: { date: postDate } }">
        <i class="el-icon-time"></i>
        <span>{{ postDate | date }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="views" label="Views">
      <template slot-scope="{ row: { views } }">
        <i class="el-icon-view"></i>
        <span>{{ views }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="comments" label="Comments">
      <template slot-scope="{ row: { comments } }">
        <i class="el-icon-message"></i>
        <span>{{ comments.length }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Actions">
      <template slot-scope="{ row }">
        <el-tooltip effect="dark" content="Edit post" placement="top">
          <el-button
            type="primary"
            @click="open(row._id)"
            icon="el-icon-edit"
            circle
          />
        </el-tooltip>
        <el-tooltip effect="dark" content="Remove post" placement="top">
          <el-button
            icon="el-icon-delete"
            type="danger"
            circle
            @click="remove(row._id)"
          />
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "list",
  layout: "admin",
  middleware: ["admin-auth"],
  async asyncData({ store }) {
    const posts = await store.dispatch("post/fetchAdmin");
    return { posts };
  },
  head: {
    title: `Posts | ${process.env.appName}`
  },
  methods: {
    open(id) {
      this.$router.push(`/admin/post/${id}`);
    },
    async remove(id) {
      try {
        await this.$confirm("Remove post?", "Attention", {
          type: "warning",
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel"
        });
        await this.$store.dispatch("post/remove", id);

        this.posts = this.posts.filter(p => p._id !== id);

        this.$message.success("Post removed");
      } catch (e) {}
    }
  }
};
</script>

<style lang="sass" scoped></style>
