<template>
  <div class="ui relaxed items">
    <div class="item" v-for="topic in topics" :key="topic.topic">
      <div class="content">
        <div class="header">
          {{ topic.topic }}
        </div>
        <topic-contents :contents="topic.contents"></topic-contents>
      </div>
    </div>
  </div>
  <!-- <table id="topic-table">
    <thead>
      <tr>
        <th>Topic</th>
        <th>Values</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="topic in topics" :key="topic.topic">
        <td>{{ topic.topic }}</td>
        <td>{{ topic.contents }}</td>
      </tr>
    </tbody>
  </table> -->
</template>

<script>
import TopicContents from './TopicContents';

export default {
  name: 'topic-table',
  props: {
    topics: {
      default: () => [],
      type: Array,
    },
    messages: {
      default: () => [],
      type: Array,
    },
  },
  components: {
    TopicContents,
  },
  methods: {},
  computed: {},
  data() {
    return {
      // columns: [
      //   {
      //     data: 'topic',
      //     orderable: true,
      //   },
      //   {
      //     data: 'contents',
      //     // render: () => {
      //     //   /*
      //     //   const contents = data.reduce((acc, cur, index, arr) => {
      //     //     acc += cur.text;
      //     //     if (index < arr.length - 1) arr += ",";
      //     //     return acc;
      //     //   }, "");
      //     //   */
      //     //   // const contents = data[data.length - 1].text;
      //     //   const contents = TopicContent;
      //     //   return contents;
      //     // },
      //     orderable: true,
      //   },
      // ],
      // order: [[0, "desc"]],
      // dtHandle: null,
    };
  },
  mounted() {
    // this.dtHandle = $(this.$el).DataTable({
    //   columns: this.columns,
    //   order: this.order,
    // data: this.rows,
    // paging: false,
    // scroller: true,
    // deferRender: true,
    // scrollY: 200,
    // searching: false,
    // fixedHeader: true,
    // fixedColumns: true,
    // scrollY: `${0}px`,
    // scrollX: true,
    // info: false,
    // });
  },
};
</script>

<style>
</style>
