<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-row>
        <b-form-group
          id="input-group-2"
          label="Nome do endereço:"
          label-for="input-2"
          class="py-2 col-md-6"
        >
          <b-form-input
            id="input-2"
            v-model="form.name"
            placeholder="Digite aqui"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="CEP:"
          label-for="input-3"
          class="py-2 col-md-6"
        >
          <b-form-input
            id="input-3"
            type="text"
            v-model="form.cep"
            placeholder="Digite o cep"
            required
          ></b-form-input>
        </b-form-group>
      </b-row>
      <b-row>
        <b-form-group
          id="input-group-3"
          label="Logradouro:"
          label-for="input-3"
          class="py-2 col-md-8"
        >
          <b-form-input
            id="input-3"
            type="text"
            v-model="form.logradouro"
            placeholder="Digite o logradouro"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Número:"
          label-for="input-3"
          class="py-2 col-md-4"
        >
          <b-form-input
            id="input-3"
            type="text"
            v-model="form.numero"
            placeholder="Digite o numero"
            required
          ></b-form-input>
        </b-form-group>
      </b-row>
      <b-row>
        <b-form-group
          id="input-group-3"
          label="Bairro:"
          label-for="input-3"
          class="py-2 col-md-6"
        >
          <b-form-input
            id="input-3"
            type="text"
            v-model="form.bairro"
            placeholder="Digite o bairro"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Cidade:"
          label-for="input-3"
          class="py-2 col-md-6"
        >
          <b-form-input
            id="input-3"
            type="text"
            v-model="form.cidade"
            placeholder="Digite o cidade"
            required
          ></b-form-input>
        </b-form-group>
      </b-row>
      <b-row>
        <b-form-group
          id="input-group-3"
          label="Estado:"
          label-for="input-3"
          class="py-2 col-md-4"
        >
          <b-form-input
            id="input-3"
            type="text"
            v-model="form.estado"
            placeholder="Digite o estado"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Complemento:"
          label-for="input-3"
          class="py-2 col-md-8"
        >
          <b-form-input
            id="input-3"
            type="text"
            v-model="form.complemento"
            placeholder="Digite o complemento"
            required
          ></b-form-input>
        </b-form-group>
      </b-row>
      <b-form-input
        id="input-3"
        type="text"
        v-model="form.personCpf"
        required
        hidden
      ></b-form-input>
      <b-row align-h="center" class="mt-2">
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
  props: ["adress", "id"],
  data() {
    return {
      form: {
        name: this.adress ? this.adress.name : "",
        cep: this.adress ? this.adress.cep : "",
        logradouro: this.adress ? this.adress.logradouro : "",
        numero: this.adress ? this.adress.numero : "",
        bairro: this.adress ? this.adress.bairro : "",
        cidade: this.adress ? this.adress.cidade : "",
        estado: this.adress ? this.adress.estado : "",
        complemento: this.adress ? this.adress.complemento : "",
        personCpf: this.id,
      },
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.adress
        ? HTTP.put("/adress/" + this.adress.id, this.form)
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
        : HTTP.post("/adress/add", this.form)
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
