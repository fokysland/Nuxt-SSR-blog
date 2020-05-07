<template>
  <div>
    <h1>Posts analytics</h1>
    <app-analytics-chart
      title="Views"
      :labels="views.labels"
      :data="views.data"
    />
    <app-analytics-chart
      title="Comments"
      :labels="comments.labels"
      :data="comments.data"
    />
  </div>
</template>

<script>
import AppAnalyticsChart from "@/components/admin/AnalyticsChart";
export default {
  name: "index",
  components: {
    AppAnalyticsChart
  },
  head: {
    title: `Analytics | ${process.env.appName}`
  },
  layout: "admin",
  async asyncData({ store }) {
    const { views, comments } = await store.dispatch("post/getAnalytics");
    return { views, comments };
  },
  middleware: ["admin-auth"]
};
</script>

<style lang="sass" scoped></style>
