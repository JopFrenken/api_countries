<template>
  <div>
    <table class="table" v-if="!isLoading && paginatedCountries.length">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Capital city</th>
          <th>Currency</th>
          <th>Population</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(country, index) in paginatedCountries" :key="country.id">
          <td>{{ index + 1 }}</td>
          <td>{{ country.name.common }}</td>
          <td>{{ country.capital ? country.capital[0] : "" }}</td>
          <td>{{ country.currencies ? Object.values(country.currencies)[0].name : "" }}</td>
          <td>{{ country.population }}</td>
           <td><button class="btn btn-primary" @click="getMoreInfo(country)" :disabled="modalOpen">More info</button></td>
          <td><button @click='addToList(country.name.common)' class='btn btn-primary'><i class="fa-solid fa-square-plus"></i><span class="ms-2">Add to list</span></button></td>
        </tr>
      </tbody>
    </table>
    <div v-else-if="isLoading">Loading...</div>
    <div v-else>No data available.</div>

    <info-modal :country="selectedCountry" @modal-closed="onChildModalClose"></info-modal>

    <nav>
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
          <a class="page-link" href="#" @click="prevPage">Previous</a>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ 'active': currentPage === page }">
          <a class="page-link" href="#" @click="goToPage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
          <a class="page-link" href="#" @click="nextPage">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countries: [],
      selectedCountry: null,
      isLoading: false,
      modalOpen: false,
      pageSize: 13, // Number of items per page
      currentPage: 1, // Current page number
    };
  },

  computed: {
    // Calculate the total number of pages based on pageSize
    totalPages() {
      return Math.ceil(this.countries.length / this.pageSize);
    },

    // Calculate the countries to display on the current page
    paginatedCountries() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.countries.slice(startIndex, endIndex);
    },
  },

  methods: {
    async loadData() {
      this.isLoading = true;
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countriesData = await response.json();
        this.countries.push(...countriesData);
        this.currentPage = 1; // Reset to the first page after loading data
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        this.isLoading = false;
      }
    },

    // Pagination control methods
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },

    getMoreInfo(country) {
      this.selectedCountry = country;
      this.modalOpen = true;
      $('#infoModal').modal('show');
    },

    async addToList(country){
      const requestBody = {
        countryName: country
      }

      const response = await fetch('http://localhost:3000/api/travel_list/add',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      const json = await response.json();
      console.log(json);
    },

    onChildModalClose() {
      setTimeout(() => {
        this.modalOpen = false;
      }, 300);
    },
  },

  async mounted() {
    this.loadData();
  },
};
</script>

<style>
/* Your styles here */
</style>
