<template>
  <div></div>
</template>

<script>
import 'vis/dist/vis.css';
import vis from 'vis/dist/vis.js';

const nodes = new vis.DataSet();
const edges = new vis.DataSet();

export default {
  name: 'graph',
  props: {
    nodes: {
      default: () => [],
      type: Array,
    },
    edges: {
      default: () => [],
      type: Array,
    },
  },
  components: {
  },
  watch: {
    nodes(val) {
      const newNodes = val.slice(nodes.length);
      nodes.add(newNodes);
    },
    edges(val) {
      const newEdges = val.slice(edges.length);
      edges.add(newEdges);
    },
  },
  mounted() {
    // nodes.add(this.nodes);
    // edges.add(this.edges);

    // create a network
    const container = this.$el;
    const data = {
      nodes,
      edges,
    };

    const options = {
      edges: {
        color: {
          color: "#a9cbe7",
        },
      },
      nodes: {
        color: {
          background: "#eaf3fb",
        },
        borderWidth: 0,
        shape: 'box',
      },
      physics: {
        repulsion: {
          nodeDistance: 70,
          springLength: 30,
        },
        hierarchicalRepulsion: {
          nodeDistance: 70,
          springLength: 30,
        },
      },
      // layout: {
      //   hierarchical: {
      //     direction: 'LR',
      //   },
      // },
    };

    new vis.Network(container, data, options); // eslint-disable-line
  },
};
</script>

<style>
</style>
