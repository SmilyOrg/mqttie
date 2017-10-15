<template>
  <div>
    <main-menu></main-menu>
    <message-table :rows="allMessages"></message-table>
  </div>
  <!-- <div>
    <div>Status: {{ status }}</div>

    <table id="duh"></table>

    <div class="messages" v-chat-scroll="{always: false}">
      <div class="message" v-for="msg in allMessages" :key="msg.id">
        {{ msg.id }} {{ msg.topic }} {{ msg.text }}
      </div>
    </div>
  </div> -->
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
    status() {
      return this.$store.getters.status;
    },
    allMessages() {
      return this.$store.getters.messages;
    },
  },
  created() {
  },
};
</script>

<style>
.messages {
  height: 300px;
  overflow: scroll;
}
</style>
