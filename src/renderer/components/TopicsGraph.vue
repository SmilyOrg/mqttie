<template>
  <div class="topics">
    <main-menu></main-menu>
    <graph id="topics-graph" :nodes="nodes" :edges="edges"></graph>
  </div>
</template>

<script>
import MainMenu from './MainMenu';
import Graph from './Graph';

export default {
  name: 'main',
  props: {},
  components: {
    MainMenu,
    Graph,
  },
  computed: {
    nodes() {
      return this.$store.getters.nodes;
    },
    edges() {
      return this.$store.getters.edges;
    },
  },
};
</script>

<style>

.topics {
  display: flex;
  flex-flow: column;
  height: 100%;
}

#topics-graph {
  flex: 1;
}
</style>
