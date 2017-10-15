<template>
  <div class="content">

    <div v-if="content.type === ContentType.UNKNOWN">
      {{ content.text }}
    </div>

    <div
      v-if="content.type === ContentType.BOOL"
      class="ui big circular label"
      :class="{ green: content.value }"
      >
      {{ content.text }}
    </div>

    <div
      v-if="content.type === ContentType.NUMBER"
      class="ui tiny horizontal statistic"
      >
      <div class="value">
        {{ content.value }}
      </div>
    </div>

    <tree-view
      v-if="content.type === ContentType.JSON"
      :data="content.value">
    </tree-view>

  </div>
</template>

<script>
import { ContentType } from "../constants.js"; // eslint-disable-line
export default {
  name: 'topic-content',
  props: [
    "content",
  ],
  components: {
  },
  computed: {
    ContentType() { return ContentType; },
  },
};
</script>

<style>

.content {
  display: inline-block;
}

</style>
