<template>
  <div class="posts--editable-main">
    <label for="description">Answer</label>
    <wysiwyg v-model="description"/>
    <button @click.prevent="updateAnswer" class="btn btn-sm btn-primary my-4">Save edit</button>
  </div>
</template>

<script>
export default {
  name: 'posts',
  mounted() {
    // console.log(this.$route.params.id);
    this.$axios({
      method: 'GET',
      url: `/answer/${this.$route.params.id}`,
    })
      .then(({ data }) => {
        this.description = data.data.description;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      description: '',
    };
  },
  methods: {
    updateAnswer() {
      this.$axios({
        method: 'PUT',
        url: `/answer/${this.$route.params.id}`,
        data: {
          description: this.description,
        },
        headers: { token: localStorage.getItem('token') },
      })
        .then((response) => {
          this.$router.back();
          this.$alertify.success(response.data.message);
          this.description = '';
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>
