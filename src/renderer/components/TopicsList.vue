<template>
  <div class="ui basic segment">
    <topic-table :topics="topicList"></topic-table>
  </div>
</template>

<script>
import TopicTable from './TopicTable';

export default {
  name: 'topics-list',
  props: {},
  components: {
    TopicTable,
  },
  computed: {
    topicList() {
      return this.$store.getters.topics.list;
    },
  },
};
</script>

<style>
</style>
