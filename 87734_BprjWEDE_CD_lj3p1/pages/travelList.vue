<template>
  <navbar></navbar>
  <div class="container mt-5 d-flex flex-column justify-content-start">
    <h1 class=" mb-4 h1">Travel List</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Country Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(country, index) in countries" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ country.country }}</td>
          <td><button @click="removeList(country.id)" class="btn btn-danger">Remove from list</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
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
    async getList() {
      let userId = localStorage.getItem('user_id');
      try {
        const response = await fetch(`http://localhost:3000/api/travel_list/list?userId=${userId}`);
        const json = await response.json();
        this.countries = json.list;
      } catch (error) {
        console.error(error);
      }
    },

    async removeList(id) {

    }
  },

  created(){
    this.getList();
  }
}
</script>

<style>

</style>