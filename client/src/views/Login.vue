<template>
  <div class="d-flex justify-content-center pt-3 pb-2 mb-3 w-80">
    <div class="head--title pt-5">
      <div class="title-head">
        <h5
          style="text-align: center;"
        >Join with Hacktiv Overflow now!</h5>
      </div>
      <div class="container d-flex justify-content-center">
        <div class="login--form-container mt-3">
          <div class="form p-4 h-100 d-flex flex-column flex-wrap">
            <form>
              <div class="form-group mt-5">
                <label for="email">Email</label>
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                >
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input v-model="password" type="password" class="form-control" id="password" placeholder="********">
              </div>
              <button @click.prevent="login" type="submit" class="btn btn-primary mt-3">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      this.$axios({
        method: 'POST',
        url: '/users/login',
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then((response) => {
          this.email = '';
          this.password = '';
          this.$router.replace('/');
          localStorage.setItem('token', response.data.token);
          this.$store.dispatch('checkUser');
          console.log(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.login--form-container {
  border: 1px solid #e0e0ea;
  width: 350px;
  height: 400px;
  border-radius: 3px;
}
.form-group label {
  font-size: 13px;
  font-weight: 700;
}
</style>
