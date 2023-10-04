<template>
  <nav class="navbar bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand text-light" href="#">Countries</a>
      <button class="navbar-toggler" @click="toggleNavbar" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div v-if="showNavbar" class="navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
              <a class="nav-link active text-light" aria-current="page" href="/">Home</a>
            </li>
          <li class="nav-item">
            <a class="nav-link active text-light" aria-current="page" href="/travelList">Travel List</a>
          </li>
          <li class="nav-item">
              <a class="nav-link active text-light logout-link" aria-current="page" @click="logout">Logout</a>
            </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showNavbar: false,
    };
  },
  methods: {
    toggleNavbar() {
      this.showNavbar = !this.showNavbar;
    },

    logout() {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('user_id');
      window.location.replace('/login');
    }
  },
};
</script>

<style>
  .logout-link{
    cursor: pointer;
  }

  .nav-link:hover{
    transform: scale(1.01);
  }
</style>