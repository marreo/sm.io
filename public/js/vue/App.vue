<template lang="pug">
  div
    input(type='hidden', name='_csrf', :value="csrfToken")
    .position-relative.overflow-hidden.p-3.p-md-5.m-md-3.text-center.bg-dark
      .col-md-5.p-lg-5.mx-auto.my-5
        h1.display-4.font-weight-normal Punny headline
        p.lead.font-weight-normal
          | And an even wittier subheading to boot. Jumpstart your marketing efforts with this example based on Apple&apos;s marketing pages.  
        a.btn.btn-outline-secondary(href='#') Coming soon
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
  },
  methods: {
  }
};
</script>