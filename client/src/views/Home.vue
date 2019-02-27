<template>
  <div id="home">
    <div class="container">
      <div class="title--home border-bottom">
        <h3>Top Questions</h3>
        <button class="btn btn-primary btn-text my-3">
          <span>Ask Question</span>
        </button>
      </div>

      <div v-for="(question, index) in questions" :key="index" class="listQuestion w-100 card mt-3">
        <div class="card-body d-flex">
          <div class="cp mr-3">
            <div class="votes">
              <div class="counts">{{ countVotes(question)}}</div>
              <div>votes</div>
            </div>
            <div class="answer">
              <div class="counts">0</div>
              <div>answer</div>
            </div>
          </div>
          <div class="summary--question">
            <router-link :to="{ name: 'questions', params: {id: question._id }}">
              <h6 href>{{question.title}}</h6>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- <router-view/> -->
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      totalAnswer: 0,
    };
  },
  mounted() {
    this.$store.dispatch('getAllQuestions');
  },
  methods: {
    countVotes(data) {
      return data.upvotes.length - data.downvotes.length;
    },
  },
  computed: {
    questions() {
      return this.$store.state.listQuestions;
    },
  },
};
</script>

<style scoped>
.btn-text span {
  font-size: 13px;
  padding: 5px;
}

.votes,
.answer {
  display: inline-block;
  min-width: 38px;
  margin: 0 10px 0 0;
  color: #848d95;
  padding: 7px 6px;
  text-align: center;
  font-size: 12px;
}
.votes .counts {
  font-size: 17px;
  margin-bottom: 4px;
}

.answer .counts {
  font-size: 17px;
  margin-bottom: 4px;
}

.summary--question {
  display: flex;
  flex-direction: column;
  width: auto;
}

.summary--question p {
  font-size: 13px;
}
</style>
