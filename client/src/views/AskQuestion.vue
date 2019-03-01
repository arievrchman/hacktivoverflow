<template>

      <div class="ask--question w-75">
        <h3 class="mb-5">Ask a Question</h3>
        <div class="d-flex flex-column">
          <label for="title" class="title">Title</label>
          <input v-model="title" type="text" class="mb-4">
          <label for="title" class="title">Body</label>
          <wysiwyg v-model="description"/>
          <div class="btn d-flex justify-content-start">
            <button @click.prevent="askQuestion" class="btn btn-sm btn-primary my-4">Post Question</button>
          </div>
        </div>
      </div>

</template>

<script>
export default {
  name: 'ask',
  data() {
    return {
      title: '',
      description: '',
    };
  },
  methods: {
    askQuestion() {
      this.$axios({
        method: 'POST',
        url: '/questions',
        data: {
          title: this.title,
          description: this.description,
        },
        headers: { token: localStorage.getItem('token') },
      })
        .then((response) => {
          // console.log(response.data.message);
          this.$alertify.success(response.data.message);
          this.title = '';
          this.description = '';
        })
        .catch((error) => {});
    },
  },
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.title {
  font-weight: bold;
}
</style>
