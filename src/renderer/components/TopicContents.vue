<template>
  <div class="topic-contents">
    <div class="trend" v-if="type === ContentType.NUMBER">
      <trend
        :data="numbers"
        :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
        :height="30"
        auto-draw
        smooth>
      </trend>
    </div>
    <topic-content :content="content"></topic-content>
  </div>
</template>

<script>
import { ContentType } from "../constants.js"; // eslint-disable-line
import TopicContent from "./TopicContent";

export default {
  name: 'topic-contents',
  props: [
    "contents",
  ],
  components: {
    TopicContent,
  },
  computed: {
    content() {
      if (!this.contents || !this.contents.length) return null;
      return this.contents[this.contents.length - 1];
    },
    type() {
      const c = this.content;
      if (!c) return ContentType.UNKNOWN;
      return c.type;
    },
    numbers() {
      return this.contents.map(content => content.value);
    },
    ContentType() { return ContentType; },
  },
};
</script>

<style>

.trend {
  display: inline-block;
}

.topic-contents {
  padding-left: 6px;
}

</style>
