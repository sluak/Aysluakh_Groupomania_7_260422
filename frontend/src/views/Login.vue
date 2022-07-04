<template>
  <div class="card">
    <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
    <h1 class="card__title" v-else>Inscription</h1>
    <p class="card__subtitle" v-if="mode == 'login'">
      Tu n'as pas encore de compte ?
      <span class="card__action" @click="switchToCreateAccount()"
        >Créer un compte</span
      >
    </p>
    <p class="card__subtitle" v-else>
      Tu as déjà un compte ?
      <span class="card__action" @click="switchToLogin()">Se connecter</span>
    </p>
    <span id="loginerror"></span>
    <div class="form-row">
      <input
        id="email"
        @keyup="validate()"
        v-model="email"
        class="form-row__input"
        type="email"
        placeholder="Adresse mail"
        ref="inputRef"
      />
    </div>

    <div class="form-row" v-if="mode == 'create'">
      <input
        id="username"
        v-model.trim="username"
        class="form-row__input"
        type="text"
        placeholder="Nom et Prénom"
      />
    </div>
    <div class="form-row">
      <input
        id="password"
        @keyup="validate()"
        minlength="8"
        v-model="password"
        class="form-row__input"
        type="password"
        placeholder="Mot de passe"
      />
    </div>
    <div class="form-row">
      <button
        @click="login()"
        class="button"
        :class="{ 'button--disabled': !validatedFields }"
        v-if="mode == 'login'"
      >
        <span v-if="status == 'loading'">Connexion en cours...</span>
        <span v-else>Connexion</span>
      </button>
      <button
        @click="createAccount()"
        class="button"
        :class="{ 'button--disabled': !validatedFields }"
        v-else
      >
        <span v-if="status == 'loading'">Création en cours...</span>
        <span v-else>Créer mon compte</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  mounted() {
    this.$refs.inputRef.focus();
  },
  data() {
    return {
      username: null,
      password: null,
      email: null,
      mode: "create",
      validatedFields: false,
    };
  },
  methods: {
    login() {
      fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      })
        .then(async (result) => {
          if (result.status == 200) {
            return result.json();
          } else {
            return Promise.reject(await result.json());
          }
        })
        .then((data) => {
          localStorage.setItem("user", JSON.stringify(data));
          this.$router.push({ name: "posts" });
        })
        .catch((error) => {
          document.querySelector("#loginerror").innerHTML = error.error;
        });
    },

    createAccount() {
      fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          email: this.email,
          password: this.password,
        }),
      })
        .then((result) => result.json())
        .then((data) => {
          this.mode = "login";
        });
    },
    switchToLogin() {
      this.mode = "login";
    },
    switchToCreateAccount() {
      this.mode = "create";
    },
    validate() {
      if (
        document.querySelector("#email").reportValidity() &&
        document.querySelector("#password").reportValidity()
      ) {
        this.validatedFields = true;
      } else {
        this.validatedFields = false;
      }
    },
  },
};
</script>

<style scoped>
.form-row {
  display: flex;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
}
.form-row__input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
}
.form-row__input::placeholder {
  color: #aaaaaa;
}
#loginerror {
  color: red;
}
</style>
