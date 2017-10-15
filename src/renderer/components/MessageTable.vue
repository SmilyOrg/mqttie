<template>
  <table id="message-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Topic</th>
        <th>Text</th>
      </tr>
    </thead>
  </table>
</template>

<script>
const $ = require('jquery');
export default {
  name: 'message-table',
  props: {
    rows: {
      default: [],
      type: Array,
    },
  },
  components: {},
  methods: {},
  computed: {},
  data() {
    return {
      columns: [
        { data: 'id', orderable: true },
        { data: 'topic' },
        { data: 'content.text' },
      ],
      order: [[0, "desc"]],
      dtHandle: null,
    };
  },
  watch: {
    rows(val) {
      const newRows = val.slice(this.dtHandle.rows().count());
      this.dtHandle.rows.add(newRows);
      this.dtHandle.draw(false);
    },
  },
  mounted() {
    this.dtHandle = $(this.$el).DataTable({
      columns: this.columns,
      order: this.order,
      data: this.rows,
      paging: false,
    // scroller: true,
    // deferRender: true,
    // scrollY: 200,
    // searching: false,
    // fixedHeader: true,
    // fixedColumns: true,
    // scrollY: `${0}px`,
    // scrollX: true,
    // info: false,
    });
  },
};
</script>

<style>
</style>
