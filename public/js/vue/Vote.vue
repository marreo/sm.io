<template lang="pug">
  div
    .container
      input(type='hidden', name='_csrf', :value="csrfToken")
      input(type='hidden', name='_id', :value="id")
      h1.stadium-name
      h5.stadium-team
      .col.btn-group.btn-group-toggle(data-toggle='buttons')
        label.col.btn.btn-primary.active
          input#option1(type='radio', name='radio_seatType', autocomplete='off', checked='', value="1")
          |  Type A
        label.col.btn.btn-success
          input#option2(type='radio', name='radio_seatType', autocomplete='off', value="2")
          |  Type B
        label.col.btn.btn-warning
          input#option2(type='radio', name='radio_seatType', autocomplete='off', value="3")
          |  Type C
      #canvas-wrapper
        #grid-source(style="border:1px solid #000;")
          .btn.btn-primary.btn-corner(v-if="resultsMode == true", v-on:click="toogleResultMode")
            | Vote Mode
          .btn.btn-primary.btn-corner(v-if="resultsMode == false", v-on:click="toogleResultMode")
            | Results Mode
          img(src="/img/tele2_oo.png").img-arena
    button#saveBtn(v-on:click="saveClick") Save
    button#loadBtn(v-on:click="getResults") Load
</template>
<script>
import header from "./components/partials/header.vue";
import footer from "./components/partials/footer.vue";
export default {
  data: function() {
    return {
      resultsMode: true
    };
  },
  components: {
    vheader: header,
    vfooter: footer
  },
  mounted: function(argument) {
    this.getFacit(true);
    this.getResults(false);
    this.getStadium();
  },
  methods: {
    toogleResultMode: function() {
      this.resultsMode = !this.resultsMode;
      $('#grid-overlay-vote').toggle();
      $('#grid-overlay-result').toggle();
    },
    saveClick: function(event) {
      var data = {};
      data._csrf = $('input[name="_csrf"]').val();
      var selectedTiles = $("#grid-overlay-vote td.selected");
      var facit = this.tilesToObjects(selectedTiles, false);
      data.facit = facit;
      this.$http.post("/api/vote", data).then(response => { }, err => { });
    },
    getStadium: function() {
      this.$http.get("/api/stadium/" + $('input[name="_id"]').val()).then(
        response => {
          $('.stadium-name').text(response.body.name);
          $('.stadium-team').text(response.body.team);
        },
        err => { }
      );
    },
    getFacit: function(hideResults) {
      this.$http.get("/api/vote/facit/" + $('input[name="_id"]').val()).then(
        response => {
          this.createTiles(response.body, hideResults);
        },
        err => { }
      );
    },
    getResults: function(hideResults) {
      this.$http.get("/api/vote/result/" + $('input[name="_id"]').val()).then(
        response => {
          console.log(response.body.length);
          if (response.body.length == 0) {
            $('#canvas-wrapper').prepend('<div class="alert alert-success">No results yet, you could be the first one!</div>');
          } else {
            this.createTilesWithResult(response.body, hideResults);
          }
        },
        err => { }
      );
    },
    tilesToObjects: function(tiles, ignoreType) {
      var objects = [];
      for (let i = 0; i < tiles.length; i++) {
        const element = tiles[i];
        var elementIndex = $("td").index(element);
        var facitObj = {};
        if (ignoreType === true) {
          facitObj = { p: elementIndex };
        } else {
          facitObj = { p: elementIndex, t: $(element).data("type") };
        }
        objects.push(facitObj);
      }
      return objects;
    },
    createTilesWithResult: function(facit, hideResults) {
      if (facit.length < 1) {
        return; //Error, must have facit
      }

      var $src = $("#grid-source");
      var $wrap = $('<div id="grid-overlay-result" class="grid-overlay"></div>');
      var $gsize = 24;

      var $cols = Math.ceil($src.find("img").innerWidth() / $gsize);
      var $rows = Math.ceil($src.find("img").innerHeight() / $gsize);
      var index = 0;

      // create overlay
      var $tbl = $("<table></table>");
      for (var y = 1; y <= $rows; y++) {
        var $tr = $("<tr></tr>");
        for (var x = 1; x <= $cols; x++) {
          var facitPos = facit.filter(a => a.position === index);
          var $td = $('<td data-type="0"></td>');
          $td.css("width", $gsize + "px").css("height", $gsize + "px");
          $tr.append($td);
          if (facitPos.length === 0) {
            $td.addClass("disabled");
          } else {
            var classSelected = "";
            switch (facit.filter(a => a.position === index)[0].type) {
              case 1:
                classSelected = "bg-primary"
                break;
              case 2:
                classSelected = "bg-success"
                break;
              case 3:
                classSelected = "bg-warning"
                break;
            }
            $td.addClass(classSelected);
          }
          index++;
        }
        $tbl.append($tr);
      }
      $src
        .css("width", $cols * $gsize + "px")
        .css("height", $rows * $gsize + "px");

      // attach overlay
      $wrap.append($tbl);
      $src.after($wrap);
    },
    createTiles: function(facit, hideResults) {
      if (facit.length < 1) {
        return; //Error, must have facit
      }

      var $src = $("#grid-source");
      var $wrap = $('<div id="grid-overlay-vote" class="grid-overlay"></div>');
      if(hideResults === true) {
        $($wrap).hide();
      }
      var $gsize = 24;

      var $cols = Math.ceil($src.find("img").innerWidth() / $gsize);
      var $rows = Math.ceil($src.find("img").innerHeight() / $gsize);
      var index = 0;

      // create overlay
      var $tbl = $("<table></table>");
      for (var y = 1; y <= $rows; y++) {
        var $tr = $("<tr></tr>");
        for (var x = 1; x <= $cols; x++) {
          var facitPos = facit.filter(a => a === "" + index);
          var $td = $('<td data-type="0"></td>');
          $td.css("width", $gsize + "px").css("height", $gsize + "px");
          $tr.append($td);
          if (facitPos.length === 0) {
            $td.addClass("disabled");
          } else {
            console.log('hej=');
            $td.addClass("clickable");
            $td.addClass("unselected");
          }
          index++;
        }
        $tbl.append($tr);
      }
      $src
        .css("width", $cols * $gsize + "px")
        .css("height", $rows * $gsize + "px");

      // attach overlay
      $wrap.append($tbl);
      $src.after($wrap);
    }
  }
};
</script>