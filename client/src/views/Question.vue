<template>
  <div class="question--content">
    <div class="question--head border-bottom">
      <h3 class="mx-3">{{ title }}</h3>
    </div>
    <div class="container">
      <!-- Question Section -->
      <div class="question--body d-flex align-items-center py-4 border-bottom">
        <div class="question-votes p-2 mx-3">
          <button @click.prevent="upQuestion" class="btn btn-light px-3">
            <img src="https://img.icons8.com/ios/16/000000/sort-up.png">
          </button>
          <div class="d-flex justify-content-center my-3">
            <span>{{ totalVotesQuestion }}</span>
          </div>
          <button @click.prevent="downQuestion" class="btn btn-light px-3">
            <img src="https://img.icons8.com/ios/16/000000/sort-down.png">
          </button>
        </div>

        <div class="question-description mt-3 w-100">
          <p>
            <span v-html="description"></span>
          </p>
          <div
            v-if="ownerQuestion == $store.state.currentUserId"
            class="btn--updel d-flex justify-content-end"
          >
            <button
              class="btn btn-ligh"
              type="button"
              data-toggle="collapse"
              data-target="#updateQuestion"
              aria-expanded="false"
              aria-controls="updateQuestion"
            >
              <span class="text-muted">edit</span>
            </button>

            <button @click.prevent="deleteQuestion" class="btn btn-link">
              <span class="text-muted">delete</span>
            </button>
          </div>

          <div class="collapse mt-3" id="updateQuestion">
            <label for="title">
              <span class="question--edit">Title</span>
            </label>
            <input v-model="title" type="text" class="form-control mb-3" placeholder="Title">
            <label for="description">
              <span class="question--edit">Body</span>
            </label>
            <div class="d-flex flex-row">
              <wysiwyg v-model="description"/>
            </div>

            <div class="btn-answer mt-4 border-top">
              <button
                @click.prevent="updateQuestion"
                class="btn btn-sm btn-primary my-4"
              >Edit Question</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Count Answer -->
      <div class="subheader--answer mt-3 border-bottom">
        <h2 class="totalAnswer text-muted">{{getAnswers.length}} Answer</h2>
      </div>

      <!-- Answer Section -->
      <div
        v-for="(answer, index) in getAnswers"
        :key="index"
        class="answer--body d-flex py-4 border-bottom"
      >
        <div class="question-votes p-2 mx-3">
          <button @click.prevent="upAnswer(answer._id)" class="btn btn-light px-3">
            <img src="https://img.icons8.com/ios/16/000000/sort-up.png">
          </button>
          <div class="d-flex justify-content-center my-3">
            <span>{{countAnswer(answer)}}</span>
          </div>
          <button @click.prevent="downAnswer(answer._id)" class="btn btn-light px-3">
            <img src="https://img.icons8.com/ios/16/000000/sort-down.png">
          </button>
        </div>

        <div class="answer-description mt-3 w-100">
          <p>
            <span v-html="answer.description"></span>
          </p>
          <div
            v-if="answer.owner == $store.state.currentUserId"
            class="btn--updel d-flex justify-content-end"
          >
            <router-link :to="{name: 'posts', params: {id: answer._id} }">
              <button class="btn btn-link">
                <span class="text-muted">edit</span>
              </button>
            </router-link>

            <button @click.prevent="deleteAnswer(answer._id)" class="btn btn-link">
              <span class="text-muted">delete</span>
            </button>
          </div>
        </div>
      </div>

      <div class="w-75">
        <h5 class="my-3">Your Answer</h5>
        <wysiwyg v-model="answerDescription"/>
        <div class="btn-answer mt-4 border-top">
          <button @click.prevent="createAnswer" class="btn btn-sm btn-primary my-4">Post Your Answer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'questions',
  data() {
    return {
      title: '',
      description: '',
      ownerQuestion: '',

      upVotes: [],
      downVotes: [],

      upvotesAnswer: [],
      downvotesAnswer: [],
      answerDescription: '',
    };
  },

  mounted() {
    this.$axios({
      method: 'GET',
      url: `/questions/${this.$route.params.id}`,
    })
      .then(({ data }) => {
        // console.log(data.data);
        this.title = data.data.title;
        this.description = data.data.description;
        this.ownerQuestion = data.data.owner;
        this.upVotes = data.data.upvotes;
        this.downVotes = data.data.downvotes;

        this.$store.dispatch('getAllAnswers', this.$route.params.id);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    upQuestion() {
      if (this.ownerQuestion != this.$store.state.currentUserId) {
        this.$axios({
          method: 'POST',
          url: `/questions/${this.$route.params.id}/upvotes`,
          headers: { token: localStorage.getItem('token') },
        })
          .then((response) => {
            // console.log(response);
            this.upVotes = response.data.upvotes;
            this.downVotes = response.data.downvotes;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.$alertify.alertWithTitle(
          'Warning',
          'You cannot vote your own question!',
          () => {
            // this.$alertify.warning("alert is closed")
          },
        );
      }
    },
    downQuestion() {
      if (this.ownerQuestion != this.$store.state.currentUserId) {
        this.$axios({
          method: 'POST',
          url: `/questions/${this.$route.params.id}/downvotes`,
          headers: { token: localStorage.getItem('token') },
        })
          .then((response) => {
            // console.log(response);
            this.upVotes = response.data.upvotes;
            this.downVotes = response.data.downvotes;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.$alertify.alertWithTitle(
          'Warning',
          'You cannot vote your own question!',
          () => {
            // this.$alertify.warning("alert is closed")
          },
        );
      }
    },
    updateQuestion() {
      this.$axios({
        method: 'PUT',
        url: `/questions/${this.$route.params.id}`,
        data: {
          title: this.title,
          description: this.description,
        },
        headers: { token: localStorage.getItem('token') },
      })
        .then((response) => {
          // console.log(response);
          this.$alertify.success(response.data.message);
        })
        .catch((error) => {});
    },
    deleteQuestion() {
      this.$alertify.confirmWithTitle(
        'Delete Confirmation',
        'Are you sure want to delete question?',
        () => {
          this.$axios({
            method: 'DELETE',
            url: `/questions/${this.$route.params.id}`,
            headers: { token: localStorage.getItem('token') },
          })
            .then((response) => {
              console.log(response);
              this.$router.replace('/');
              this.$alertify.success(response.data.message);
            })
            .catch((error) => {
              console.log(error);
            });
        },
        () => {
          // this.$alertify.error("cancel");
        },
      );
    },
    createAnswer() {
      this.$axios({
        method: 'POST',
        url: `/answer/${this.$route.params.id}`,
        data: {
          description: this.answerDescription,
        },
        headers: { token: localStorage.getItem('token') },
      })
        .then((response) => {
          // console.log(response.data.data);
          this.$store.dispatch('getAllAnswers', this.$route.params.id);
          this.$alertify.success(response.data.message);
          this.answerDescription = '';
        })
        .catch((error) => {
          if (error.response.status == 401) {
            this.$router.push('/users/login');
          }
        });
    },
    deleteAnswer(answerId) {
      this.$alertify.confirmWithTitle(
        'Delete Confirmation',
        'Are you sure want to delete this answer?',
        () => {
          this.$axios({
            method: 'DELETE',
            url: `/answer/${answerId}`,
            headers: { token: localStorage.getItem('token') },
          })
            .then((response) => {
              this.$store.dispatch('getAllAnswers', this.$route.params.id);
              this.$alertify.success(response.data.message);
            })
            .catch((error) => {
              console.log(error);
            });
        },
        () => {
          // this.$alertify.error("cancel");
        },
      );
    },
    upAnswer(ansId) {
      const data = this.$store.state.listAnswers;
      const owner = data.filter(e => e.owner == this.$store.state.currentUserId);

      if (!owner.length) {
        this.$axios({
          method: 'POST',
          url: `/answer/${ansId}/upvotes`,
          headers: { token: localStorage.getItem('token') },
        })
          .then((response) => {
            // console.log(response.data._id);
            this.$store.dispatch('getAllAnswers', this.$route.params.id);
            // this.upvotesAnswer = response.data.upvotes;
            // console.log(this.upvotesAnswer);
            // this.downvotesAnswer = response.data.downvotes;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.$alertify.alertWithTitle(
          'Warning',
          'You cannot vote your own answer!',
          () => {
            // this.$alertify.warning("alert is closed")
          },
        );
      }
    },
    downAnswer(ansId) {
      const data = this.$store.state.listAnswers;
      const owner = data.filter(e => e.owner == this.$store.state.currentUserId);

      if (!owner.length) {
        this.$axios({
          method: 'POST',
          url: `/answer/${ansId}/downvotes`,
          headers: { token: localStorage.getItem('token') },
        })
          .then((response) => {
            // console.log(response.data._id);
            this.$store.dispatch('getAllAnswers', this.$route.params.id);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.$alertify.alertWithTitle(
          'Warning',
          'You cannot vote your own answer!',
          () => {
            // this.$alertify.warning("alert is closed")
          },
        );
      }
    },
    countAnswer(data) {
      return data.upvotes.length - data.downvotes.length;
    },
  },
  computed: {
    totalVotesQuestion() {
      return this.upVotes.length - this.downVotes.length;
    },
    getAnswers() {
      return this.$store.state.listAnswers;
    },
  },
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

.question--edit {
  font-weight: bold;
}

.btn--updel .btn span {
  font-size: 12px;
  cursor: pointer;
}
</style>
