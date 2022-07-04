<template>
  <div class="mypost">
    <div
      v-if="post.UserId == this.user.userId || this.user.isAdmin"
      @click="deletePost()"
      class="mypost__delete"
    >
      <img alt="delete bin" src="../assets/bin.png" />
    </div>

    <div v-if="updateMode == false">
      <div
        v-if="post.UserId == this.user.userId || this.user.isAdmin"
        @click="modifyPost()"
        class="mypost__update"
      >
        <img alt="update post" src="../assets/updatepost.png" />
      </div>
    </div>
    <div v-if="updateMode">
      <div @click="updatePost()" class="button__modify">
        <img alt="save post" src="../assets/save.png" />
      </div>
    </div>
    <!-- <div class="mypost__img">
      <img
        v-if="post.User.picture != null"
        src="{{ post.User.picture }}"
        alt="{{ post.User.username }}"
      />
    </div> -->

    <div class="myuser__img">
      <img
        :src="this.post.User.picture || './src/assets/defaultpicture.png'"
        alt="user picture"
      />
    </div>
    <div class="mypost__from">{{ post.User.username }}</div>
    <div class="mypost__date">
      {{ new Date(post.createdAt).toLocaleString() }}
    </div>
  </div>
  <div class="post__picture" v-if="updateMode == false">
    <img :src="post.media" />
  </div>
  <div v-if="updateMode">
    <input type="file" class="post__picture" :id="'post__picture' + post.id" />
  </div>
  <div class="update__post" v-if="updateMode">
    <textarea v-model="post.content"></textarea>
  </div>

  <div v-if="updateMode == false">
    <div class="mypost__content">
      {{ post.content }}
    </div>
  </div>
  <Comment
    v-for="comment in post.Comments"
    :comment="comment"
    class="mypost__comment"
  >
  </Comment>
  <div class="row_form">
    <label for="comment">Ajouter un commentaire</label>
    <input
      class="comment"
      v-model="comment"
      placeholder="mon commentaire"
      required
    />
    <button class="button_comment" type="submit" @click="createComment">
      Envoyer
    </button>
  </div>
</template>

<script>
import Comment from "../components/Comment.vue";

export default {
  props: {
    post: {
      type: Object,
    },
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      post: this.post,
      token: JSON.parse(localStorage.getItem("user")).token,
      updateMode: false,
    };
  },
  components: { Comment },

  methods: {
    createComment() {
      fetch("http://localhost:3000/api/comment", {
        method: "POST",
        headers: {
          Authorization: "bearer " + this.user.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: this.comment,
          postId: this.post.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          window.location.reload();
        });
    },
    deletePost() {
      fetch("http://localhost:3000/api/post/" + this.post.id, {
        method: "DELETE",
        headers: {
          Authorization: "bearer " + this.user.token,
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          alert("Votre post a été supprimé");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error + "Impossible de supprimer le post");
        });
    },

    modifyPost() {
      this.updateMode = true;
    },

    updatePost() {
      let data = new FormData();
      data.append("post", JSON.stringify({ content: this.post.content }));
      data.append(
        "image",
        document.querySelector("#post__picture" + this.post.id).files[0]
      );
      fetch("http://localhost:3000/api/post/" + this.post.id, {
        method: "PUT",
        headers: {
          Authorization: "bearer " + this.token,
        },
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          window.location.reload();
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style scoped>
.myuser__img {
  margin-left: 20px;
}

.myuser__img img {
  object-fit: cover;
  height: 35px;
  width: 35px;
}
.mypost__date {
  color: grey;
  font-size: 12px;
}

.mypost__content {
  margin: 20px 0;
  font-size: 17px;
}

.update__post textarea {
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 8px;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
}
.row_form {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin: 1em auto;
  border-top: 2px solid rgb(157, 20, 150);
  padding: 20px 0;
}
.comment {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 14px;
  flex: 1;
  min-width: 100px;
  color: black;
}

.button_comment {
  margin-top: 20px;
  border-radius: 3px;
  border: 1px;
  height: 35px;
  width: 90px;
  color: white;
  background-color: #fe4a85;
  cursor: pointer;
}

.button_comment:hover {
  background-color: #ec195f;
}

.mypost {
  display: flex;
  align-items: center;
  column-gap: 10px;
}
.post__picture img {
  border-radius: 10px;
}

.mypost__from {
  font-size: 14px;
  color: #ec195f;
  font-weight: 500;
}

.mypost__comment {
  font-size: 12px;
}

.mypost__delete {
  max-width: 20px;
  cursor: pointer;
}

.mypost__update {
  max-width: 20px;
  cursor: pointer;
}

.button__modify img {
  height: 20px;
  width: 20px;
}
</style>
