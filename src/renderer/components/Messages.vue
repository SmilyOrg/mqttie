<template>
  <div>
    <message-table :rows="allMessages"></message-table>
  </div>
</template>

<script>
import MessageTable from './MessageTable';

export default {
  name: 'main',
  components: {
    MessageTable,
  },
  methods: {},
  computed: {
    allMessages() {
      return this.$store.getters.messages;
    },
  },
};
</script>

<style>
</style>
