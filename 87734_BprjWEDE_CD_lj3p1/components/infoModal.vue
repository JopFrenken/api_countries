<template>
  <div class="modal" id="infoModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-if="country" class="modal-title">Languages spoken in {{ country.name.common }}</h5>
            <button type="button" class="btn-close d-flex justify-content-center align-items-center" data-bs-dismiss="modal" aria-label="Close">x</button>
          </div>
          <div class="modal-body">
            <p>{{ country ? country.name.common : '' }}</p>
            <canvas id="languagePieChart" height="350" width="580"></canvas>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import Chart from 'chart.js/auto';
export default {
  data() {
    return {
      pieChart : null,
      ctx: null
    }
  },

  props: {
    country : Object
  },

  mounted() {
    // Add an event listener for the modal's "shown.bs.modal" event
    $('#infoModal').on('shown.bs.modal', this.onModalShow);
    $('#infoModal').on('hidden.bs.modal', this.onModalClose)
  },

  methods: {
    onModalShow() {
      // timeout needed for data to be loaded
        setTimeout(() => {
          const languageValues = Object.values(this.country.languages);
          
          this.createChart(languageValues);
        }, 1);
    },

    onModalClose() {
      // Emit a custom event when the modal is closed
      this.$emit('modal-closed');
    },

    // creates piechart with country's languages
    createChart(langValues) {
      // If it exists already, deletes it
      if (this.pieChart != null) {
        this.pieChart.destroy();
      }

      this.ctx = document.getElementById('languagePieChart').getContext('2d');

      let total = langValues.length;

      // Calculate the percentage (equal parts) for each item
      let percentage = 100 / total;

      // Generate random background colors based on the number of languages
      var backgroundColors = [];
      for (var i = 0; i < langValues.length; i++) {
        var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16); // Generate a random hex color
        backgroundColors.push(randomColor);
      }

      // Creates the pie chart
      this.pieChart = new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: langValues,
          datasets: [{
            data: Array(total).fill(percentage),
            backgroundColor: backgroundColors
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true
        }
      })
    }
  }
}
</script>

<style>
  .btn-close {
    background: black;
    color: white;
  }
</style>