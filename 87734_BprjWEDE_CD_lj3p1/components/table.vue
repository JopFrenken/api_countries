<template>
  <div class="container mt-5 d-flex flex-column justify-content-start">
    <h1 class=" mb-4 h1">All countries</h1>
    <table class="table" v-if="!isLoading && loadedCountries.length">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Flag</th>
          <th scope="col">Name</th>
          <th scope="col">Capital city</th>
          <th scope="col">Currency</th>
          <th scope="col">Population</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(country, index) in loadedCountries" :key="country.id">
          <td>{{ index + 1 + (currentPage - 1) * 12 }}</td>
          <td class="table-flag">{{ country.flag }}</td>
          <td>{{ country.name.common }}</td>
          <td>{{ country.capital ? country.capital[0] : "" }}</td>
          <td>{{ country.currencies ? Object.values(country.currencies)[0].name : "" }}</td>
          <td>{{ country.population }}</td>
           <td><button class="btn btn-primary" @click="getMoreInfo(country)" :disabled="modalOpen">More info</button></td>
          <td><button @click='addToList(country.name.common)' class='btn btn-success'><i class="fa-solid fa-square-plus"></i><span class="ms-2">Add to list</span></button></td>
        </tr>
      </tbody>
    </table>
    <div v-else-if="isLoading">Loading...</div>
    <div v-else>No data available.</div>

    <info-modal :country="selectedCountry" @modal-closed="onChildModalClose"></info-modal>

    <nav>
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ 'disabled': previousPage === -1 }">
          <a class="page-link" href="#" @click="goToPage(previousPage)">Previous</a>
        </li>
        <li class="page-item" v-for="page in maxPages" :key="page" :class="{ 'active': currentPage === page }">
          <a class="page-link" href="#" @click="goToPage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ 'disabled': nextPage === -1  }">
          <a class="page-link" href="#" @click="goToPage(nextPage)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
export default {
  data() {
    return {
      countries: [],
      loadedCountries: [],
      selectedCountry: null,
      isLoading: false,
      modalOpen: false,
      maxPages: 0,
      pageSize: 12, // Number of items per page
      currentPage: 1, // Current page number
      nextPage: 0,
      previousPage: 0,
    };
  },

  methods: {
    // loads all countries per page
    async loadData(page) {
      this.isLoading = true;
      try {
        // sends page number to backend to decide what 12 countries are being
        const response = await fetch(`http://localhost:3000/api/countries/countries?page=${page}`);
        const countriesData = await response.json();
        this.maxPages = countriesData.maxPages
        this.countries.push(...countriesData.countries);
        this.currentPage = countriesData.page; // Reset to the first page after loading data
        this.nextPage = countriesData.nextPage;
        this.previousPage = countriesData.previousPage

      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        this.loadedCountries = this.countries;
        this.isLoading = false;
        this.countries = [];
      }
    },

    // go to specific pagination page
    goToPage(page) {
      if (page >= 1 && page <= this.maxPages) {
        this.currentPage = page;
        this.loadData(page);
      }
    },

    // opens the modal with the chart
    getMoreInfo(country) {
      this.selectedCountry = country;
      this.modalOpen = true;
      $('#infoModal').modal('show');
    },

    // adds country to user's travel list
    async addToList(country){
      const requestBody = {
        countryName: country,
        user_id: localStorage.getItem('user_id')
      };

      const response = await fetch('http://localhost:3000/api/travel_list/add',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      const json = await response.json();

      if(json.success === true) {
        Toastify({
          text: json.message,
          position: 'left',
          style: {
            background: "green",
          }
        }).showToast();
      }
      else {
        Toastify({
          text: json.message,
          position: 'left',
          style: {
            background: "red",
          }
        }).showToast();
      }
    },

    onChildModalClose() {
      setTimeout(() => {
        this.modalOpen = false;
      }, 300);
    },
  },

  async mounted() {
    this.loadData(1);
  },

};
</script>

<style>
@media (max-width: 768px) {
  .table th:nth-child(3),
  .table td:nth-child(3),
  .table th:nth-child(4),
  .table td:nth-child(4),
  .table th:nth-child(5),
  .table td:nth-child(5) {
    display: none;
  }
}
</style>
