<template>
  <navbar></navbar>
  <div class="container mt-5 d-flex flex-column justify-content-start">
    <h1 class=" mb-4 h1">Travel List</h1>
    <div v-if="countries.length === 0">
        <p>No country has been added.</p>
      </div>
      <table v-if="countries.length > 0" class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Country Name</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(country, index) in countries" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ country.country }}</td>
          <td><button @click="removeList(country.country)" class="btn btn-danger">Remove from list</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import navbar from '../components/navbar.vue';
export default {
  setup() {
    const isAuthenticated = ref(false);
    const router = useRouter();

    // Check if the user is authenticated
    const checkAuthentication = () => {
      isAuthenticated.value = localStorage.getItem('jwtToken');
    }

    // Redirect to the login page if not authenticated
    const redirectIfNotAuthenticated = () => {
      if (!isAuthenticated.value) {
        router.push('/login');
      }
    }

    // Call the authentication check when the component is mounted
    onMounted(() => {
      checkAuthentication();
      redirectIfNotAuthenticated();
    });

    return {
      isAuthenticated
    };
  },

  components() {
    navbar
  },

  data () {
    return {
      countries: []
    }
  },

  methods: {
    // get current user's travel list
    async getList(userId) {
      try {
        const response = await fetch(`http://localhost:3000/api/travel_list/list?userId=${userId}`);
        const json = await response.json();
        this.countries = json.list;
      } catch (error) {
        console.error(error);
      }
    },

    // removes country from user's travel list
    async removeList(country) {
      let userId = localStorage.getItem('user_id');
      
      const response = await fetch(`http://localhost:3000/api/travel_list/remove?user_id=${userId}&country=${country}`, {
        method: 'delete'
      })

      const json = await response.json();

      console.log(json);

      if(json.success) {
        Toastify({
          text: json.message,
          position: 'left',
          style: {
            background: "green",
          }
        }).showToast();
        this.countries = json.remainingCountries;
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
    }
  },

  // when component is mounted, get the user's id
  mounted(){
    let userId = localStorage.getItem('user_id');
    this.getList(userId);
  }
}
</script>

<style>

</style>