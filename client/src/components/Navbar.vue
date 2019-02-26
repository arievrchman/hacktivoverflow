<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark flex-md-nowrap shadow fixed-top">
    <router-link to="/">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href>
        <h5>Hacktiv<span style="font-weight: bold;">Overflow</span></h5>
      </a>
    </router-link>
    <button
      class="navbar-toggler m-2"
      type="button"
      data-toggle="collapse"
      data-target="#navbarHeader"
      aria-controls="navbarHeader"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <input
      class="form-control ml-5"
      type="search"
      placeholder="Search..."
      aria-label="Search"
      style="width: 800px;"
    >

    <div v-if="isLogin == false" class="collapse navbar-collapse" id="navbarHeader">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active p-1 my-1">
          <router-link to="/users/login">
            <button class="btn btn-sm btn-light" style="background-color: #fff;">Login</button>
          </router-link>
        </li>
        <li class="nav-item p-1 my-1">
          <router-link to="/users/signup">
            <button class="btn btn-sm btn-primary">Signup</button>
          </router-link>
        </li>
      </ul>
    </div>
    <div v-else class="collapse navbar-collapse" id="navbarHeader">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item p-1 my-1">
          <button @click.prevent="signout" class="btn btn-sm btn-primary">Signout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  props: ["isLogin"],
  methods: {
    signout() {
      this.$store.commit('userStatus', false);
      localStorage.removeItem('token');
    }
  },
};
</script>

<style>
.form-control {
  font-size: 13px;
}
</style>
