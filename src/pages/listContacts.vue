<template>
  <b-container class="mt-5">
    <b-navbar toggleable class="border px-4" type="light" variant="light">
      <b-navbar-brand>Lista de Contatos</b-navbar-brand>
      <b-button v-b-modal.modal-lg variant="info text-light">Novo contato</b-button>
    </b-navbar>
    <b-modal id="modal-lg" size="lg" centered title="Novo cadastro" hide-footer>
      <Form :person="null" :id="id" />
    </b-modal>

    <b-row align-h="center">
      <b-col cols="3" v-for="item in items" :key="item.cpf">
        <b-card-group deck class="mt-2 mb-3 flex">
          <b-card class="max-width card mr">
            <div @click="changePage(item)">
              <b-col class="text-center">
                <b-card-img
                  src="https://cdn.iconscout.com/icon/free/png-256/contacts-43-459935.png"
                  alt="Image"
                  style="max-width: 100px"
                  class="rounded-0"
                ></b-card-img>
              </b-col>
              <b-list-group flush class="mt-2">
                <b-list-group-item
                  ><BIconFilePerson /> {{ item.name }}</b-list-group-item
                >
                <b-list-group-item
                  ><BIconCardChecklist /> {{ item.contact }}</b-list-group-item
                >
              </b-list-group>
            </div>
            <b-card-body class="border-top">
              <b-row align-h="center">
                <b-col cols="5">
                  <b-button variant="warning dark text-light"  @click="$bvModal.show('' + item.contact)"
                    >Editar</b-button
                  >
                  <b-modal
                    :id="item.contact"
                    size="lg"
                    centered
                    title="Editar"
                    hide-footer
                  >
                    <Form :contact="item" :id="id" />
                  </b-modal>
                </b-col>
                <b-col cols="5">
                  <b-button variant="danger" @click="deletePerson(item.cpf)">Excluir</b-button>
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
import Form from "../components/contactForm.vue";
import HTTP from "../req/api";

import {
  BIconFilePerson,
  BIconCardChecklist,
} from "bootstrap-vue";
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
    BIconFilePerson,
    BIconCardChecklist,
  },
  methods: {
    changePage(item) {
      this.$router.push({ path: "./contacts/:id" + item.cpf });
    },
    deletePerson(cpf) {
      HTTP.delete('/contact/' + cpf)
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
    },
  },
  mounted() {
    HTTP.get(`/contact/` + this.id)
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
