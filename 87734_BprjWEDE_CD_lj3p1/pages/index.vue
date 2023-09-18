<template>
  <navbar></navbar>
  <div class="table-container">
    <apiTable></apiTable>
  </div>
</template>

<script>
import apiTable from '../components/table.vue'
import navbar from '../components/navbar.vue'
export default {
  components: {
    apiTable,
    navbar
  }
}
</script>

<style></style>