<template>
  <navbar></navbar>
  <div class="table-container">
    <apiTable v-if="isAuthenticated"></apiTable>
  </div>
</template>

<script>
import apiTable from '../components/table.vue'
import navbar from '../components/navbar.vue'
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    apiTable,
    navbar
  },
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
  }
}
</script>

<style></style>
