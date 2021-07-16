<template>
  <b-navbar toggleable type="dark" variant="dark" class="px-4">
    <b-navbar-brand href="#">
      <img
        src="https://cdn.iconscout.com/icon/free/png-512/code-280-460136.png"
        class="d-inline-block align-top logo"
        alt="Kitten"
      />
      CODINARTS
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-nav-item v-b-modal.relatorio
        ><BIconNewspaper /> Ver relatórios</b-nav-item
      >
    </b-navbar-nav>
    <b-modal id="relatorio" size="xl" centered title="Relatórios" hide-footer>
      <b-row align-h="center">
        <b-col cols="6">
          <div class="d-block text-center">
            <h5>Quantidade de endereços por clientes</h5>
          </div>
          <apexchart type="bar" :options="options" :series="series"></apexchart>
        </b-col>
        <b-col cols="6">
          <div class="d-block text-center">
            <h5>Quantidade de inquilinos por endereços</h5>
          </div>
          <apexchart
            type="bar"
            :options="optionsInq"
            :series="seriesInq"
          ></apexchart>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <div class="d-block text-center">
          <h5>Contatos cadastratos: {{qtd}}</h5>
        </div>
      </b-row>
    </b-modal>
  </b-navbar>
</template>

<script>
import { BIconNewspaper } from "bootstrap-vue";
import HTTP from "../req/api";

export default {
  data: function () {
    return {
      options: [{}],
      series: [{}],
      optionsInq: [{}],
      seriesInq: [{}],
      qtd: "",
    };
  },
  props: {
    msg: String,
  },
  components: {
    BIconNewspaper,
  },
  mounted() {
    HTTP.get(`/person/more/`)
      .then((response) => {
        const data = response.data;
        (this.options = {
          chart: {
            id: "qtdEnd",
          },
          xaxis: {
            categories: data.map((a) => a.name),
          },
        }),
          (this.series = [
            {
              name: "Qtd de endereços",
              data: data.map((a) => a.Total),
            },
          ]);
      })
      .catch((e) => {
        this.errors.push(e);
      });

    HTTP.get(`/guest/more/`)
      .then((response) => {
        const data = response.data;
        (this.optionsInq = {
          chart: {
            id: "qtdInq",
          },
          xaxis: {
            categories: data.map((a) => a.name),
          },
        }),
          (this.seriesInq = [
            {
              name: "Qtd de inquilinos",
              data: data.map((a) => a.Total),
            },
          ]);
      })
      .catch((e) => {
        this.errors.push(e);
      });

    HTTP.get(`/contact/total/`)
      .then((response) => {
        this.qtd = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
};
</script>

<style>
.logo {
  max-width: 25px;
}
</style>