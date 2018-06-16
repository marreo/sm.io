<template lang="pug">
  div
    vheader
    .container
      input(type='hidden', name='_csrf', :value="csrfToken")
      div#canvas-wrapper
        canvas(id="canvas1" style="border:1px solid #000;" width="960" height="720")
        button#saveBtn(v-on:click="saveClick") Save
        button#loadBtn Load
</template>

<style>

</style>

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
    vfooter: footer,
  },
  mounted: function(argument) {
    this.getResults();
  },
  methods: {
    saveClick: function(event) {
      var data = {};
      data._csrf = $('input[name="_csrf"]').val();
      data.path = canvas._objects[canvas._objects.length - 1].path;
      this.$http.post("/api/vote", data).then(response => {
        canvas._objects = [];
        var path = new fabric.Path(response.body.path, {
          type: 'path',
          version: '2.3.0',
          originX: 'left',
          originY: 'top',
          left: 189.5,
          top: 149.5,
          width: 524,
          height: 355,
          fill: null,
          stroke: 'rgba(10,145,202,0.75)',
          strokeWidth: 75,
          strokeDashArray: null,
          strokeLineCap: 'square',
          strokeLineJoin: 'miter',
          strokeMiterLimit: 10,
          scaleX: 1,
          scaleY: 1,
          angle: 0,
          flipX: false,
          flipY: false,
          opacity: 1,
          shadow: null,
          visible: true,
          clipTo: null,
          backgroundColor: '',
          fillRule: 'nonzero',
          paintFirst: 'fill',
          globalCompositeOperation: 'source-over',
          transformMatrix: null,
          skewX: 0,
          skewY: 0,
          path: response.body.path
        });
        canvas.add(path);
      }, err => {
      });
    },
    getResults: function() {
      // this.$http.get("/api/vote").then(response => {
      //   canvas._objects = [];
      //   var path = new fabric.Path(response.body.path, {
      //     stroke: 'blue',
      //     strokeWidth: 50,
      //     strokeLineCap: 'square',
      //     strokeLineJoin: 'miter',
      //     fill: true,
      //     originX: 'left',
      //     originY: 'top'
      //   });
      //   canvas.add(path);
      // }, err => {
      // });
    }
  }
};
</script>