<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-2"
        label="Nome:"
        label-for="input-2"
        class="py-2"
      >
        <b-form-input
          id="input-2"
          v-model="form.name"
          placeholder="Digite o nome do contato"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Email ou Telefone:"
        label-for="input-3"
        class="py-2"
      >
        <b-form-input
          id="input-3"
          type="text"
          v-model="form.contato"
          placeholder="Digite o contato"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-input
        id="input-3"
        type="text"
        v-model="form.personCpf"
        placeholder="Digite o contato"
        hidden
        required
      ></b-form-input>
      
      <b-row align-h="center">
        <b-col sm="2">
          <b-button class="px-3" type="submit" variant="success"
            >Salvar</b-button
          >
        </b-col>
        <b-col sm="2">
          <b-button class="px-3" type="reset" variant="danger">Limpar</b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import HTTP from "../req/api";
export default {
  props: ["contact", "id"],
  data() {
    return {
      form: {
        name: this.contact ? this.contact.name : "",
        contato: this.contact ? this.contact.contact : "",
        personCpf: this.id
      },
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.contact
        ? HTTP.put("/contact/" + this.contact.id, this.form)
            .then((res) => {
              console.log(res);
              this.$router.go(this.$router.currentRoute);
            })
            .catch((error) => {
              console.log(error.response.status);
            })
            .finally(() => {
              console.log("algo deu errado");
            })
        : HTTP.post("/contact/add", this.form)
            .then((res) => {
              console.log(res);
              this.$router.go(this.$router.currentRoute);
            })
            .catch((error) => {
              console.log(error.response.status);
            })
            .finally(() => {
              console.log("algo deu errado");
            });
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
