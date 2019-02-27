<template>
  <div id="app">
    <Navbar :is-login="login"/>
    <div class="row">
      <div class="col-2 col-md-2">
        <Sidebar/>
      </div>
      <div class="col-md-9 ml-sm-auto col-lg-10 p-4" style="height: 100vh; margin-top: 80px;">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'app',
  components: {
    Navbar,
    Sidebar,
  },
  mounted() {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('checkUser');
    }
  },
  computed: {
    login() {
      return this.$store.state.isLogin;
    },
  },
};
</script>


<style>
</style>
