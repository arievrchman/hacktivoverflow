<template>
  <div class="question--content">
    <div class="question--head border-bottom">
      <h3 class="my-3">{{ title }}</h3>
    </div>
    <div class="container">
      <div class="question--body d-flex align-items-center py-4 border-bottom">
        <div class="question-votes p-2 mx-3">
          <button @click.prevent="upQuestion" class="btn btn-light px-3">
            <img src="https://img.icons8.com/ios/16/000000/sort-up.png">
          </button>
          <div class="d-flex justify-content-center my-3">
            <span>{{ totalVotes }}</span>
          </div>
          <button @click.prevent="downQuestion" class="btn btn-light px-3">
            <img src="https://img.icons8.com/ios/16/000000/sort-down.png">
          </button>
        </div>

        <div class="question-description mt-3">
          <p>{{ description }}</p>
        </div>
      </div>

      <div class="subheader--answer mt-3 border-bottom">
        <h2 class="totalAnswer text-muted">{{answers.length}} Answer</h2>
      </div>

      <div
        v-for="(answer, index) in answers"
        :key="index"
        class="answer--body d-flex py-4 border-bottom">
        <div class="question-votes p-2 mx-3">
          <button class="btn btn-light px-3">
            <img src="https://img.icons8.com/ios/16/000000/sort-up.png">
          </button>
          <div class="d-flex justify-content-center my-3">
            <span>0</span>
          </div>
          <button class="btn btn-light px-3">
            <img src="https://img.icons8.com/ios/16/000000/sort-down.png">
          </button>
        </div>

        <div class="answer-description mt-3">
          <p>{{answer.description}}</p>
        </div>
      </div>

      <!-- <div class="mt-5 w-75">
        <wysiwyg v-model="myHTML" />
      </div> -->

    </div>
  </div>
</template>

<script>
export default {
  name: "questions",
  data() {
    return {
      title: "",
      description: "",
      answers: [],
      upVotes: [],
      downVotes: []
    };
  },
  mounted() {
    this.$axios({
      method: "GET",
      url: "/questions/" + this.$route.params.id
    })
      .then(({ data }) => {
        // console.log(data.data);
        this.title = data.data.title;
        this.description = data.data.description;
        this.upVotes = data.data.upvotes;
        this.downVotes = data.data.downvotes;

        return this.$axios({
          method: "GET",
          url: "/answer/" + this.$route.params.id
        });
      })
      .then(question => {
        this.answers = question.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    upQuestion() {
      this.$axios({
        method: "POST",
        url: `/questions/${this.$route.params.id}/upvotes`,
        headers: { token: localStorage.getItem("token") }
      })
        .then(response => {
          // console.log(response);
          this.upVotes = response.data.upvotes;
          this.downVotes = response.data.downvotes;
        })
        .catch(error => {});
    },
    downQuestion() {
      this.$axios({
        method: "POST",
        url: `/questions/${this.$route.params.id}/downvotes`,
        headers: { token: localStorage.getItem("token") }
      })
        .then(response => {
          console.log(response);
          this.upVotes = response.data.upvotes;
          this.downVotes = response.data.downvotes;
        })
        .catch(error => {});
    }
  },
  computed: {
    totalVotes() {
      return this.upVotes.length - this.downVotes.length;
    }
  }
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.question--head h3 {
  font-weight: lighter;
  font-size: 25px;
}

.subheader--answer {
  box-sizing: border-box;
  margin: 10px 0;
  height: 50px;
}

.subheader--answer .totalAnswer {
  font-weight: 400;
  font-size: 20px;
}
</style>
