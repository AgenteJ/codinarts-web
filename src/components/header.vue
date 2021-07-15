<template>
  <b-navbar variant="info" type="light" >
    <b-navbar-brand href="#">
      <img
        src="https://cdn.iconscout.com/icon/free/png-512/code-280-460136.png"
        class="d-inline-block align-top logo"
        alt="Kitten"
      />
      CODINARTS
    </b-navbar-brand>
  </b-navbar>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<style>
.logo{
  max-width: 25px;
}
</style>