<template>
  <div class="card">
    <div class="user">
      <h1>Welcome {{ user.username }} !</h1>
      <label for="user__picture" class="title__profile">Ma photo</label>
      <div class="user__picture" v-if="updateMode == false">
        <img :src="this.user.picture || './src/assets/defaultpicture.png'" />
      </div>
      <div v-if="updateMode">
        <input type="file" class="user__picture" id="user__picture" />
      </div>

      <label for="profession" class="title__profile">Mon poste actuel</label>
      <div class="details__profile" v-if="updateMode == false">
        <span v-if="user.job">{{ user.job }}</span>
        <span v-else>Aucun emploi n'est spécifié.</span>
      </div>
      <div class="details__profile" v-if="updateMode">
        <input type="text" v-model="user.job" />
      </div>
      <label for="name" class="title__profile">Mon nom d'utilisateur</label>
      <div class="details__profile" v-if="updateMode == false">
        <span>{{ user.username }}</span>
      </div>
      <div class="details__profile" v-if="updateMode">
        <input type="text" v-model="user.username" />
      </div>
      <label for="email" class="title__profile">Mon adresse électronique</label>
      <div class="details__profile" v-if="updateMode == false">
        <span>{{ user.email }}</span>
      </div>
      <div class="details__profile" v-if="updateMode">
        <input type="text" v-model="user.email" />
      </div>

      <label for="bio" class="title__profile"
        >Informations intéressantes sur moi (Bio)</label
      >
      <div class="details__profile" v-if="updateMode == false">
        <span v-if="user.bio">{{ user.bio }}</span>
        <span v-else>Pas de biographie spécifiée.</span>
      </div>
      <div class="details__profile" v-if="updateMode">
        <textarea v-model="user.bio"></textarea>
      </div>
    </div>
    <div class="form-row">
      <div v-if="updateMode == false">
        <button @click="modifyUser()" class="button__modify">
          Modifier mon profil
        </button>
      </div>
      <div v-if="updateMode">
        <button @click="save()" class="button__modify">
          Enregistrer mon profil
        </button>
      </div>
      <button @click="deleteUser()" class="button__delete">
        Supprimer mon profil
      </button>
    </div>
  </div>
  <div></div>
</template>

<script>
export default {
  name: "Profile",
  created() {
    this.getOneUser();
  },
  data() {
    return {
      user: {
        username: "",
        job: "",
        bio: "",
        picture: "",
        id: JSON.parse(localStorage.getItem("user")).userId,
      },
      token: JSON.parse(localStorage.getItem("user")).token,
      updateMode: false,
    };
  },

  methods: {
    getOneUser() {
      fetch("http://localhost:3000/api/auth/" + this.user.id, {
        headers: { Authorization: "bearer " + this.token },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          this.user = data.user;
        });
    },

    modifyUser() {
      this.updateMode = true;
    },

    save() {
      let data = new FormData();
      data.append("user", JSON.stringify(this.user));
      data.append("image", document.querySelector("#user__picture").files[0]);
      fetch("http://localhost:3000/api/auth/", {
        method: "PUT",
        headers: {
          Authorization: "bearer " + this.token,
        },
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.user = data.user;
          this.updateMode = false;
        })
        .catch((err) => console.log(err));
    },
    deleteUser() {
      fetch("http://localhost:3000/api/auth/", {
        method: "DELETE",
        headers: { Authorization: "bearer " + this.token },
      }).then(() => {
        localStorage.clear();
        this.$router.push({ name: "home" });
      });
    },
  },
};
</script>

<style scoped>
.user {
  display: grid;
}

.user__picture {
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user__picture img {
  object-fit: cover;
  height: 250px;
  width: 250px;
  border-radius: 8px;
}

.details__profile {
  background-color: rgb(244, 243, 250);
  border: 2px solid rgb(250, 248, 248);
  border-radius: 8px;
  padding: 16px;
}

.title__profile {
  background: rgb(178, 108, 218);
  background: linear-gradient(
    90deg,
    rgba(178, 108, 218, 1) 35%,
    rgba(227, 25, 155, 1) 100%
  );
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 17px;
  align-content: center;
  border: none;
  width: 100%;
  padding: 16px;
  margin: 10px 0;
}

.details__profile textarea {
  width: 100%;
  height: 150px;
  box-sizing: border-box;
  padding: 12px 20px;
  border: 2px solid #ccc;
  border-radius: 8px;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
}

.details__profile input {
  box-sizing: border-box;
  padding: 12px 20px;
  border: 2px solid #ccc;
  border-radius: 8px;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
}
.form-row {
  justify-content: space-between;
}
.button__delete {
  background-color: #f13337;
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  padding: 16px;
  margin-top: 10px;
  cursor: pointer;
  width: 100%;
  min-width: 50px;
}

.button__delete:hover {
  background-color: #de2528;
}

.button__modify {
  margin-top: 40px;
  background-color: #613ead;
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  padding: 16px;
  cursor: pointer;
  width: 100%;
  min-width: 50px;
}

.button__modify:hover {
  background-color: #492b89;
}
</style>
