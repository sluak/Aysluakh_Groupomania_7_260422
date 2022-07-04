<template>
  <div class="card">
    <div class="message">
      <p v-if="isLoading">Loading...</p>
      <h1 class="card__title">Articles</h1>
      <p class="card__subtitle">les derniers articles publiés</p>
      <CreatePost> </CreatePost>
      <h3 v-if="errorMsg">{{ errorMsg }}</h3>
      <!-- <div v-else-if="data"> -->
      <post
        class="posts"
        :post="post"
        v-for="post in posts"
        v-bind:key="post.id"
      >
      </post>
      <!-- </div> -->
      <!-- <p v-else class="test-center">Soyez le premier à publier un article !</p> -->
    </div>
  </div>
</template>

<script>
import Post from "../components/Post.vue";
import CreatePost from "../components/CreatePost.vue";

export default {
  name: "AllPosts",
  created() {
    this.getAllPosts();
  },
  data() {
    return {
      posts: [],
      comment: null,
      isLoading: false,
      errorMsg: "",
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  methods: {
    getAllPosts() {
      fetch("http://localhost:3000/api/post/", {
        headers: { Authorization: "bearer " + this.user.token },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          this.posts = data;
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.errorMsg = "Erreur de récupération des données";
        });
    },
  },

  components: { Post, CreatePost },
};
</script>
<style scoped>
.card__subtitle {
  padding-bottom: 20px;
}
.message {
  margin: 20px 10px;
  background-color: rgb(255, 255, 255);
  border-radius: 16px;
}
.row_form {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  margin: 1em auto;
}
</style>
