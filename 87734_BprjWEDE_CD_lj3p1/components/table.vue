<template>
  <table class="table">
    <thead class="table-dark">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Capital city</th>
        <th>Currency</th>
        <th>Population</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(country, index) in countries" :key="country.id">
        <td>{{ index }}</td>
        <td>{{ country.name.common }}</td>
        <td>{{ country.capital ? country.capital[0] : "" }}</td>
        <td>{{ country.currencies ? Object.values(country.currencies)[0].name : "" }}</td>
        <td>{{ country.population }}</td>
        <td><button class="btn btn-primary" @click="getMoreInfo">More info</button></td>
      </tr>
    </tbody>
  </table>
  <info-modal></info-modal>
</template>

<script>
export default {
  data() {
    return {
      countries: []
    }
  },

  methods: {
    async getData () {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const json = await response.json();
      this.countries = json;
      console.log(json[0].currencies);
    },

    getMoreInfo() {
      $('#infoModal').modal('show')
    }
  },

  async mounted() {
    await this.getData();
    console.log(this.countries);
  }
}
</script>

<style>

</style>