<template>
  <b-container class="mt-5 mb-5 border px-0">
    <b-navbar toggleable class="border px-4" type="light" variant="light">
      <b-navbar-brand>Lista de Endereços</b-navbar-brand>
      <b-button v-b-modal.modal-adress variant="dark text-light"
        >Novo Endereço</b-button
      >
    </b-navbar>
    <b-modal
      id="modal-adress"
      size="lg"
      centered
      title="Novo cadastro"
      hide-footer
    >
      <Form :person="null" :id="id" />
    </b-modal>

    <b-row class="px-3">
      <b-col cols="3" v-for="item in items" :key="item.cpf">
        <b-card-group deck class="mt-2 mb-3 flex">
          <b-card class="max-width card mr">
            <div @click="changePage(item)">
              <b-col class="text-center">
                <b-card-img
                  src="https://icons.iconarchive.com/icons/johnathanmac/mavrick/512/Maps-icon.png"
                  alt="Image"
                  style="max-width: 100px"
                  class="rounded-0"
                ></b-card-img>
              </b-col>
              <b-card-text>
                <BIconMap />
                {{ item.name }} {{ item.numero }} - {{ item.cep }},
                {{ item.bairro }}, {{ item.complemento }}, {{ item.cidade }}/{{ item.estado }}
              </b-card-text>
            </div>
            <b-card-body class="border-top">
              <b-row align-h="center">
                <b-col cols="5">
                  <b-button
                    variant="warning dark text-light"
                    @click="$bvModal.show('' + item.name + item.id)"
                    >Editar</b-button
                  >
                  <b-modal
                    :id="item.name+item.id"
                    size="lg"
                    centered
                    title="Editar"
                    hide-footer
                  >
                    <Form :adress="item" :id="id" />
                  </b-modal>
                </b-col>
                <b-col cols="5">
                  <b-button variant="danger" @click="deletePerson(item.id)"
                    >Excluir</b-button
                  >
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Form from "../components/adressForm.vue";
import HTTP from "../req/api";

import { BIconMap } from "bootstrap-vue";
export default {
  name: "App",
  props: ["id"],
  data() {
    return {
      isHovered: false,
      fields: ["Nome", "DataNasc", "CPF"],
      items: [],
    };
  },
  components: {
    Form,
    BIconMap
  },
  methods: {
    changePage(item) {
      this.$router.push({ path: "./guest/:id" + item.id });
    },
    deletePerson(id) {
      HTTP.delete("/adress/" + id)
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
  },
  mounted() {
    HTTP.get(`/adress/` + this.id)
      .then((response) => {
        this.items = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
};
</script>

<style>
.max-width {
  width: 280px;
  transition: transform 0.01s;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.flex {
  display: flex;
}

.mr {
  transition: 0.3s;
}
</style>
