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
          placeholder="Digite seu nome"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="CPF:"
        label-for="input-3"
        class="py-2"
        :hidden="person ? true : false"
      >
        <b-form-input
          id="input-3"
          type="number"
          v-model="form.cpf"
          placeholder="Digite seu cpf"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="Data de Nascimento:"
        label-for="input-4"
        class="py-2"
      >
        <b-form-input
          id="input-4"
          type="date"
          v-model="form.dataNasc"
          placeholder="Data de aniversário"
          required
        ></b-form-input>
      </b-form-group>
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
  props: ["person"],
  data() {
    return {
      form: {
        dataNasc: this.person ? this.person.dataNasc : "",
        name: this.person ? this.person.name : "",
        cpf: this.person ? this.person.cpf : "",
      },
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.person
        ? HTTP.put('/person/' + this.form.cpf, this.form)
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
        : HTTP.post("/person/add", this.form)
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
