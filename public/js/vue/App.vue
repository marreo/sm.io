<template lang="pug">
    .container
      input(type='hidden', name='_csrf', :value="csrfToken")
      .datebox(v-if="showVote")
        h1 For how long will Trump last as US President?
        .btn-group.btn-group-lg.btn-group-toggle.row(data-toggle="buttons")
          label.btn.btn-danger.col-sm-4
            input(type="radio" name="vote" value="1" autocomplete="off" checked="")
            | 2018 Q1
          label.btn.btn-danger.col-sm-4
            input(type="radio" name="vote" value="2" autocomplete="off")
            | 2018 Q2
          label.btn.btn-danger.col-sm-4
            input(type="radio" name="vote" value="3" autocomplete="off" checked="")
            | 2019 Q1
          label.btn.btn-light.col-sm-4
            input(type="radio" name="vote" value="4" autocomplete="off") 
            | 2019 Q2
          label.btn.btn-light.col-sm-4
            input(type="radio" name="vote" value="5" autocomplete="off") 
            | 2020 Q1
          label.btn.btn-light.col-sm-4
            input(type="radio" name="vote" value="6" autocomplete="off" checked="")
            | 2020 Q2
          label.btn.btn-primary.col-sm-4
            input(type="radio" name="vote" value="7" autocomplete="off")
            | 2021 Q1
          label.btn.btn-primary.col-sm-4
            input(type="radio" name="vote" value="8" autocomplete="off" checked="")
            | 2021 Q2
          label.btn.btn-primary.col-sm-4
            input(type="radio" name="vote" value="9" autocomplete="off") 
            | 2022 Q1
          label.btn.btn-danger.col-sm-4
            input(type="radio" name="vote" value="10" autocomplete="off") 
            | 2022 Q2
          label.btn.btn-danger.col-sm-4
            input(type="radio" name="vote" value="11" autocomplete="off" checked="")
            | 2023 Q1
          label.btn.btn-danger.col-sm-4
            input(type="radio" name="vote" value="12" autocomplete="off")
            | 2023 Q2
          label.btn.btn-light.col-sm-4
            input(type="radio" name="vote" value="13" autocomplete="off" checked="")
            | 2024 Q1
          label.btn.btn-light.col-sm-4
            input(type="radio" name="vote" value="14" autocomplete="off") 
            | 2024 Q2
          label.btn.btn-light.col-sm-4
            input(type="radio" name="vote" value="15" autocomplete="off") 
            | 2025 Q1
        .col
          button.btn.btn-lg.col-12(v-on:click="voteClick")
            | Vote!
      .loader(v-if="showLoader")
        section
          h2(style="text-align: center") Getting Results
          .sk-three-bounce
            .sk-bounce-1.sk-child
            .sk-bounce-2.sk-child
            .sk-bounce-3.sk-child
      .resultBox
        canvas#canvas(style="width: 100%;display: block;margin: 0 auto;")
        .share
          a(href="#")
            i.fab.fa-twitter-square
          a(href="#")
            i.fab.fa-facebook-square
          a(href="#")
            i.fab.fa-reddit-square
          a(href="#")
            i.fas.fa-envelope-square
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
      showLoader: false,
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
    randomColor: function() {
      switch (Math.ceil(Math.random() * 3)) {
        case 1:
          return "btn-primary";
        case 2:
          return "btn-light";
        case 3:
          return "btn-danger";
      }
    },
    voteClick: function(event) {
      this.showVote = false;
      this.showLoader = true;
      var data = {};
      data._csrf = $('input[name="_csrf"]').val();
      data.q = $('input[name="vote"]').filter(':checked').val();;
      this.$http.post("/api/vote", data).then(response => {
        this.getResult();
      }, err => {
        this.getResult();
      });
    },
    getResult: function() {
      this.$http.get("/api/vote").then(response => {
        this.voteData = response.body;
        this.showLoader = false;
        this.showResult = true;
        this.showGraph();
      }, err => {
        this.showVote = true;
        this.showLoader = false;
      });
    },
    showGraph: function() {
      var chartData = this.voteData;
      new Chart(document.getElementById("canvas"), {
        type: 'line',
        data: {
          labels: ['2018 Q1', '2018 Q2', '2019 Q1', '2019 Q2', '2020 Q1', '2020 Q2', '2021 Q1', '2021 Q2', '2022 Q1', '2022 Q2', '2023 Q1', '2023 Q2', '2024 Q1', '2024 Q2', '2025 Q1'],
          datasets: [{
            data: chartData,
            borderColor: "#d70206",
            fill: "#ed1c23",
            cubicInterpolationMode: "monotone",
          }
          ]
        },
        options: {
          layout: {
            padding: {
              left: 15,
              right: 15,
              top: 0,
              bottom: 0
            }
          },
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
                ticks: {
                  autoSkip: false,
                  maxRotation: 90,
                  minRotation: 90
                },
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