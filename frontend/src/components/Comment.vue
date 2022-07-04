<template>
  <div class="mypost__comment">
    <div class="mycomment">
      <div class="commentbox">
        <div class="mycomment__img">
          <img
            :src="
              this.comment.User.picture || './src/assets/defaultpicture.png'
            "
            alt="user picture"
          />
        </div>
        <div class="comment__username">{{ this.comment.User.username }}</div>
        <div class="comment__date">
          {{ new Date(this.comment.createdAt).toLocaleString() }}
        </div>
      </div>
      <div class="buttons">
        <div
          v-if="comment.UserId == this.user.userId || this.user.isAdmin"
          @click="deleteComment()"
          class="comment__delete"
        >
          <img alt="delete bin" src="@/assets/deletecomment.png" />
        </div>
      </div>
    </div>
    <div class="mycomment__comment">
      <span>{{ this.comment.comment }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    comment: {
      type: Object,
    },
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      comment: this.comment,
      updateMode: false,
    };
  },

  methods: {
    deleteComment() {
      fetch("http://localhost:3000/api/comment/" + this.comment.id, {
        method: "DELETE",
        headers: {
          Authorization: "bearer " + this.user.token,
          "Content-Type": "application/json",
        },
      }).then(() => {
        alert("Votre comment a été supprimé");
        window.location.reload();
      });
    },

    // modifyComment() {
    //   this.updateMode = true;
    // },

    // updateComment() {
    //   let data = new FormData();
    //   data.append("comment", JSON.stringify({ comment: this.comment.comment }));
    //   fetch("http://localhost:3000/api/comment/" + this.comment.id, {
    //     method: "PUT",
    //     headers: {
    //       Authorization: "bearer " + this.token,
    //     },
    //     body: JSON.stringify({
    //       comment: this.comment,
    //     }),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       window.location.reload();
    //     })
    //     .catch((err) => console.log(err));
    // },
  },
};
</script>
<style scoped>
.mypost__comment {
  border: 1px solid rgb(225, 124, 184);
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 5px;
}

.mycomment__img {
  margin-right: 10px;
}

.mycomment__img img {
  object-fit: cover;
  height: 35px;
  width: 35px;
  border-radius: 8px;
}
.commentbox {
  display: flex;
}
.mycomment {
  display: flex;
  justify-content: space-between;
}
.comment__username {
  font-size: 13px;
  color: #ec195f;
  font-weight: 500;
  padding-right: 10px;
}
.comment__date {
  color: grey;
  font-size: 12px;
}

.mycomment__comment {
  padding: 10px;
  margin-top: 10px;
  width: 100%;
  background-color: #f8f8f8;
  border: 2px solid #ccc;
  border-radius: 8px;
}

.comment__update textarea {
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 8px;
  background-color: #f8f8f8;
  font-size: 14px;
  resize: none;
}

.comment__delete {
  max-width: 20px;
  cursor: pointer;
}

.mycomment__update {
  height: 20px;
  width: 20px;
  cursor: pointer;
}

.button__modify img {
  height: 20px;
  width: 20px;
  cursor: pointer;
}
</style>
