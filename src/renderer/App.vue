<template>
  <div id="app">
    <main-menu></main-menu>
    <div class="main content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import 'semantic-ui/dist/semantic.min.css';
import 'datatables.net-se/css/dataTables.semanticui.css';
import 'datatables.net-scroller-se/css/scroller.semanticui.min.css';
import MainMenu from './components/MainMenu';
export default {
  name: 'mqttie',
  components: {
    MainMenu,
  },
  created() {
    this.$store.dispatch('connect', "");
    this.$store.dispatch('subscribe', '#');
  },
};
</script>

<style>
#app {
  height: 100%;
}

.main.content {
  margin-top: 3em;
}

</style>
