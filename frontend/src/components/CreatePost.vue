<template>
  <div class="post">
    <form @submit.prevent="createPost">
      <h1>Créer un nouvel article</h1>
      <div class="image-upload">
        <label for="post__picture"
          >Ajoutez une photo :
          <img class="icone__upload" src="../assets/upload-pictures.png" />
          {{ this.filename }}
        </label>
        <input
          @change="updatePhoto"
          type="file"
          v-on="postData.picture"
          id="post__picture"
          name="picture"
          accept="image/png, image/jpeg"
        />
      </div>
      <div>
        <label for="post__body" class="post__title"
          >Partagez vos idées et actualités :</label
        >
        <input
          required
          type="text"
          id="post__body"
          v-model="postData.content"
          placeholder="Mon nouvel article"
        />
      </div>
      <button class="create__post">Create Post</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "CreatePost",
  props: {
    post: {
      type: Object,
    },
  },
  data() {
    return {
      postData: {
        picture: "",
        content: "",
      },
      filename: "",
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  methods: {
    createPost() {
      let data = new FormData();
      data.append("post", JSON.stringify({ content: this.postData.content }));
      data.append("image", document.querySelector("#post__picture").files[0]);
      fetch("http://localhost:3000/api/post", {
        method: "POST",
        headers: {
          Authorization: "bearer " + this.user.token,
        },
        body: data,
      })
        .then((res) => res.json())
        .then(() => {
          window.location.reload();
        });
    },
    updatePhoto() {
      this.filename = document.querySelector("#post__picture").files[0].name;
    },
  },
  mounted() {},
};
</script>
<style>
.post {
  margin: 20px 0 50px 0;
  background-color: #eb91ac;
  padding: 20px;
  border-radius: 16px;
  width: 100%;
  max-width: 700px;
}

.image-upload {
  display: flex;
  align-items: center;
}

.icone__upload {
  width: 35px;
  height: 35px;
  cursor: pointer;
}

.image-upload > input {
  display: none;
}

.post__title {
  margin: 20px 0;
}
#post__body {
  border: none;
  border-radius: 8px;
  background: #fcfbfb;
  font-weight: 500;
  font-size: 16px;
  min-height: 100px;
  color: black;
  padding: 10px;
  width: 100%;
}

.create__post {
  margin-top: 20px;
  border-radius: 3px;
  border: 1px;
  height: 35px;
  width: 90px;
  color: white;
  background-color: #fe4a85;
  cursor: pointer;
}

.create__post:hover {
  background-color: #ec195f;
}
</style>
