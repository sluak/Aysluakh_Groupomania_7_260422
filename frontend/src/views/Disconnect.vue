<script>
export default {
  mounted() {
    localStorage.removeItem("user");
    this.$router.push({ name: "login" });
  },
};
</script>
