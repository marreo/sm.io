<template lang="pug">
    .container
      input(type='hidden', name='_csrf', :value="csrfToken")
      .datebox(v-if="showVote")
        h1 For how long will Trump last as US President?
        .btn-group.btn-group-toggle(data-toggle="buttons")
          label(class="btn btn-secondary active")
            input(type="radio" name="vote" value="1" autocomplete="off" checked="")
            | 2018 Q1
          label.btn.btn-secondary
            input(type="radio" name="vote" value="2" autocomplete="off") 
            | 2018 Q2

          //- label.btn
          //-   input(type="radio" name="vote" class="btn btn-secondary col-12" value="1")
          //-   | 2018 Q1
          //- label.btn
          //-   | 2018 Q2
          //-   input(type="radio" name="vote" class="btn btn-secondary col-12" value="2")
        //- .btn-group.btn-group-lg.mr-2.col(role="group" aria-label="2019")
        //-   button(type="button" class="btn btn-secondary col-12") 2019 Q1
        //-   button(type="button" class="btn btn-secondary col-12") 2019 Q2
        //- .btn-group.btn-group-lg.mr-2.col(role="group" aria-label="2020")
        //-   button(type="button" class="btn btn-secondary col-12") 2020 Q1
        //-   button(type="button" class="btn btn-secondary col-12") 2020 Q2
        //- .btn-group.btn-group-lg.mr-2.col(role="group" aria-label="2021")
        //-   button(type="button" class="btn btn-secondary col-12") 2021 Q1
        //-   button(type="button" class="btn btn-secondary col-12") 2021 Q2
        //- .btn-group.btn-group-lg.mr-2.col(role="group" aria-label="2022")
        //-   button(type="button" class="btn btn-secondary col-12") 2022 Q1
        //-   button(type="button" class="btn btn-secondary col-12") 2022 Q2
        //- .btn-group.btn-group-lg.mr-2.col(role="group" aria-label="2023")
        //-   button(type="button" class="btn btn-secondary col-12") 2023 Q1
        //-   button(type="button" class="btn btn-secondary col-12") 2023 Q2
        //- .btn-group.btn-group-lg.mr-2.col(role="group" aria-label="2024")
        //-   button(type="button" class="btn btn-secondary col-12") 2024 Q1
        //-   button(type="button" class="btn btn-secondary col-12") 2024 Q2
        //- .btn-group.btn-group-lg.mr-2.col(role="group" aria-label="2025")
        //-   button(type="button" class="btn btn-secondary col-12") 2025 Q1
        //-   button(type="button" disabled class="btn btn-secondary col-12") The End?
        .col
          button.btn.btn-lg.col-12(v-on:click="voteClick")
            | Vote!
      .resultBox
        canvas#canvas(style="width: 100%;display: block;margin: 0 auto;")
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>

<script>
import header from "./components/partials/header.vue";
import footer from "./components/partials/footer.vue";
export default {
  data: function() {
    return {
      showVote: true,
      showResult: false,
      voteData: {}
    };
  },
  components: {
    vheader: header,
    vfooter: footer,
  },
  mounted: function(argument) {
  },
  methods: {
    voteClick: function(event) {
      this.showVote = false;
      var data = {};
      data._csrf = $('input[name="_csrf"]').val();
      data.q = $('input[name="vote"]').filter(':checked').val();;
      this.$http.post("/api/vote", data).then(response => {
        this.$http.get("/api/vote").then(response => {
          this.voteData = response.body;
          this.showResult = true;
          this.showGraph();
        }, err => {
          this.showVote = true;
        });
      }, err => {
        this.showVote = true;
      });
    },
    showGraph: function() {

      var chartData = this.voteData;
      console.log(chartData);

      new Chart(document.getElementById("canvas"), {
        type: 'line',
        data: {
          labels: ['2018 Q1', '2018 Q2', '2019 Q1', '2019 Q2', '2020 Q1', '2020 Q2', '2021 Q1', '2021 Q2', '2022 Q1', '2022 Q2', '2023 Q1', '2023 Q2', '2024 Q1', '2024 Q2', '2025 Q1'],
          datasets: [{
            data: chartData,
            borderColor: "#d70206",
            fill: "red",
            cubicInterpolationMode: "monotone",
          }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          elements: { point: { radius: 5 } },
          legend: {
            display: false
          },
          tooltips: {
            enabled: true
          },
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 50,
                stepSize: 50
              }
            }
          ],
          scales: {
            yAxes: [
              {
                display: false
              }
            ],
            xAxes: [
              {
                display: true
              }
            ]
          }
        }
      });
    }
  }
};
</script>