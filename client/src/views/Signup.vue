<template>
  <div class="d-flex justify-content-center pt-3 pb-2 mb-3 w-80">
    <div class="pt-5">
      <div class="title--signup">
        <h5
          style="text-align: center;"
        >Create your Hacktiv Overflow account now. It's free and only takes a minute.</h5>
      </div>

      <div class="container d-flex justify-content-center">
        <div class="signup--form-container mt-3">
          <div class="form p-4 h-100 d-flex flex-column flex-wrap">
            <form>
              <div class="form-group">
                <label for="name">Display Name</label>
                <input
                  v-model="name"
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Your name"
                >
              </div>
              <div class="form-group">
                <label for="email">Email (required, but never shown)</label>
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
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="********"
                >
              </div>
              <button @click.prevent="signup" type="submit" class="btn btn-primary mt-3">Signup</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'signup',
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    signup() {
      this.$axios({
        method: 'POST',
        url: '/users/signup',
        data: {
          name: this.name,
          email: this.email,
          password: this.password,
        },
      })
        .then((response) => {
          this.name = '';
          this.email = '';
          this.password = '';
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.signup--form-container {
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
