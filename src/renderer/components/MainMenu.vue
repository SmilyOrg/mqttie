<template>
  <div class="ui top fixed menu">

    <router-link to="/subscriptions" class="item" tag="a" active-class="active">
      Subscriptions
    </router-link>
    
    <router-link to="/messages" class="item" tag="a" active-class="active">
      Messages
    </router-link>
    
    <router-link to="/topics/list" class="item" tag="a" active-class="active">
      Topics List
    </router-link>

    <router-link to="/topics/graph" class="item" tag="a" active-class="active">
      Topics Graph
    </router-link>

    <div class="right menu">
      <a class="ui item">
        <!-- <broker-status></broker-status> -->
      </a>
    </div>

    </div>
  </div>
</template>

<script>
import BrokerStatus from './BrokerStatus';
console.log(BrokerStatus);
export default {
  name: 'main-menu',
  components: [
    BrokerStatus,
  ],
};
</script>

<style>
</style>
