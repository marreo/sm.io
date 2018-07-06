<template lang="pug">
  div
    vheader
    input(type='hidden', name='_csrf', :value="csrfToken")
    .stadium-list.card-group

</template>
<script>
import header from "./components/partials/header.vue";
import footer from "./components/partials/footer.vue";
export default {
  data: function() {
    return {
    };
  },
  components: {
    vheader: header,
    vfooter: footer
  },
  mounted: function(argument) {
    this.getStadiums();
  },
  methods: {
    getStadiums: function() {
      this.$http.get("/api/stadium").then(
        response => {
          for (let index = 0; index < response.body.length; index++) {
            const element = response.body[index];
            var stadiumDiv = $('<div class="card"><a href="/stadium/' + element._id + '"><img class="card-img-top" src="/img/260x180.png" alt="Card image cap"><div class="card-body"><h5 class="card-title"></h5><p class="stadium-team"></p></div></a></div>');
            $(stadiumDiv).find('.card-title').text(element.name);
            $(stadiumDiv).find('.stadium-team').text(element.team);
            $('.stadium-list').append(stadiumDiv);
          }
          // response.body
        },
        err => { }
      );
    },
  }
};
</script>