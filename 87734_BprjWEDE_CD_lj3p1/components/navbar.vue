<template>
  <nav class="navbar navbar-top-container">
    <div class="container-fluid">
      <span class="d-flex align-items-center ms-3"><i class="fa-solid fa-earth-americas"></i><a class="navbar-brand  ms-2" href="#"><b>Countries</b></a></span>
      <button class="navbar-toggler" @click="toggleNavbar" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div v-if="showNavbar" class="navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-3" :class="{ 'extended-navbar': showNavbar }">
          <li class="nav-item">
              <span class="d-flex align-items-center"><i class="fa-solid fa-house"></i><a class="nav-link active ms-2" aria-current="page" href="/">Home</a></span>
            </li>
          <li class="nav-item">
            <span class="d-flex align-items-center"><i class="fa-solid fa-list"></i><a class="nav-link active ms-2" aria-current="page" href="/travelList">Travel List</a></span>
          </li>
          <li class="nav-item">
              <span class="d-flex align-items-center"><i class="fa-solid fa-right-from-bracket"></i><a class="nav-link active logout-link ms-2" aria-current="page" @click="logout">Logout</a></span>
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
    // hamburger menu function
    toggleNavbar() {
      this.showNavbar = !this.showNavbar;
    },

    // logs the user out and clears localstorage
    logout() {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('user_id');
      window.location.replace('/login');
    }
  },
};
</script>

<style>
  .navbar-top-container{
    background-color: white ;
  }
  .logout-link{
    cursor: pointer;
  }

  .nav-link:hover{
    transform: scale(1.1);
  }

  .fa-earth-americas{
    font-size: 20px;
  }
</style>