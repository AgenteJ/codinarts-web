<template>
  <b-container class="mt-5 border px-0">
    <b-navbar toggleable class="border px-4" type="light" variant="light">
      <b-navbar-brand>Lista de Pessoas</b-navbar-brand>
      <b-button v-b-modal.modal-lg variant="success"
        ><BIconPlus /> Novo cadastro</b-button
      >
    </b-navbar>
    <b-modal id="modal-lg" size="lg" centered title="Novo cadastro" hide-footer>
      <Form :person="null" />
    </b-modal>

    <b-row class="px-3">
      <b-col cols="3" v-for="item in items" :key="item.cpf">
        <b-card-group deck class="mt-2 mb-3 flex">
          <b-card class="max-width card mr">
            <div @click="changePage(item)">
              <b-col class="text-center">
                <b-card-img
                  :src="photoUrl"
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
                  ><BIconCardChecklist /> {{ item.cpf }}</b-list-group-item
                >
                <b-list-group-item
                  ><BIconCalendar4Week /> {{ item.dataNasc }}</b-list-group-item
                >
              </b-list-group>
            </div>
            <b-card-body class="border-top">
              <b-row align-h="center">
                <b-col cols="5">
                  <b-button
                    variant="warning dark text-light"
                    @click="$bvModal.show('' + item.cpf)"
                    >Editar</b-button
                  >
                  <b-modal
                    :id="item.cpf"
                    size="lg"
                    centered
                    title="Editar"
                    hide-footer
                  >
                    <Form :person="item" />
                  </b-modal>
                </b-col>
                <b-col cols="5">
                  <b-button
                    variant="danger"
                    @click="$bvModal.show('excluir' + item.cpf)"
                    >Excluir</b-button
                  >
                  <b-modal
                    :id="'excluir' + item.cpf"
                    centered
                    title="Excluir"
                    hide-footer
                  >
                    <div class="text-center">
                      <b-alert class="text-start" show variant="danger"
                        >CONFIRMAR EXCLUSÃO</b-alert
                      >
                      <hr />
                      <b-button
                        variant="danger"
                        @click="deletePerson(item.cpf)"
                      >
                        CONFIRMAR
                      </b-button>
                    </div>
                  </b-modal>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
        </b-card-group>
      </b-col>
      <b-row class="px-5 py-3" :hidden="items.length === 0 ? false : true">
        <b-alert show variant="dark" class="text-center"
          >Nenhum registro até o momento :(
        </b-alert>
      </b-row>
    </b-row>
  </b-container>
</template>

<script>
import Form from "../components/personForm.vue";
import HTTP from "../req/api";
import photo from "../assets/person.png";
import {
  BIconFilePerson,
  BIconCardChecklist,
  BIconCalendar4Week,
  BIconPlus,
} from "bootstrap-vue";
export default {
  name: "App",
  data() {
    return {
      isHovered: false,
      fields: ["Nome", "DataNasc", "CPF"],
      items: [],
      photoUrl: photo,
    };
  },
  components: {
    Form,
    BIconFilePerson,
    BIconCardChecklist,
    BIconCalendar4Week,
    BIconPlus,
  },
  methods: {
    changePage(item) {
      this.$router.push({ path: "./contactAdress/:id" + item.cpf });
    },
    deletePerson(cpf) {
      HTTP.delete("/person/" + cpf)
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
    HTTP.get(`/person/`)
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
