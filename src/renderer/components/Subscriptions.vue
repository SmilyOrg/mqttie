<template>
  <div>
    <main-menu></main-menu>
    subs
  </div>
</template>

<script>
import MainMenu from './MainMenu';
import MessageTable from './MessageTable';

export default {
  name: 'main',
  components: {
    MainMenu,
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
