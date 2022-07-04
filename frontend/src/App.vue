<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/icon.png"
      width="80"
      height="80"
    />

    <div class="wrapper">
      <nav>
        <RouterLink v-show="connected != true" to="/">Login</RouterLink>
        <RouterLink v-if="connected" to="/profile">Profile</RouterLink>
        <RouterLink v-if="connected" to="/posts">Posts</RouterLink>
        <a v-if="connected" @click="disconnect()">Disconnect</a>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
<script>
export default {
  data() {
    return {
      connected: localStorage.getItem("user") != null,
    };
  },
  watch: {
    $route: function (value) {
      this.connected = localStorage.getItem("user") != null;
    },
  },
  methods: {
    disconnect() {
      localStorage.removeItem("user");
      this.connected = false;
      this.$router.push({ name: "home" });
    },
  },
};
</script>
<style>
@import "@/assets/base.css";
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap");

header {
  line-height: 1.5;
  max-height: 100vh;
  text-align: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: rgb(227, 239, 235);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(250, 44%, 25%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  place-items: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  header {
    display: flex;
    text-align: center;
    justify-content: center;
    padding-right: calc(var(--section-gap) / 2);
    padding-bottom: 10px;
  }

  header .wrapper {
    display: flex;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: center;
    font-size: 1rem;
  }
}
</style>
