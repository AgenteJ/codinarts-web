<template>
  <div id="app">
    <Contacts :id="id" />
    <Adress :id="id"/>
  </div>
</template>

<script>
import Contacts from "./listContacts.vue";
import Adress from "./listAddress.vue";

export default {
  props: ["id"],
  name: "App",
  components: {
    Contacts,
    Adress
  },
};
</script>

