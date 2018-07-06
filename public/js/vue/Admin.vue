<template lang="pug">
  div
    .container
      input(type='hidden', name='_csrf', :value="csrfToken")
      input(type='hidden', name='_id', :value="id")
      div#canvas-wrapper
        div#grid-source(style="border:1px solid #000;")
          img(src="/img/tele2_oo.png").img-arena
    button#saveBtn(v-on:click="adminClick") Facit
</template>
<script>
import header from "./components/partials/header.vue";
import footer from "./components/partials/footer.vue";
export default {
    data: function() {
        return {};
    },
    components: {
        vheader: header,
        vfooter: footer
    },
    mounted: function(argument) {
        this.createTiles();
    },
    methods: {
        adminClick: function() {
            var data = {};
            data._csrf = $('input[name="_csrf"]').val();
            var selectedTiles = $("td.selected");
            var facit = this.tilesToObjects(selectedTiles, true);
            data.facit = facit;
            $("td")
                .removeClass("unselected")
                .removeClass("selected");
            this.$http.post("/api/vote/admin", data).then(
                response => {
                    for (let i = 0; i < response.body.length; i++) {
                        const element = response.body[i];
                        $("td:eq(" + element.p + ")").addClass("selected");
                    }
                },
                err => { }
            );
        },
        getResults: function() {
            this.$http.get("/api/vote/facit").then(
                response => {
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
        createTiles: function() {
            var $src = $("#grid-source");
            var $wrap = $('<div id="grid-overlay"></div>');
            var $gsize = 24;

            var $cols = Math.ceil($src.find("img").innerWidth() / $gsize);
            var $rows = Math.ceil($src.find("img").innerHeight() / $gsize);
            var index = 0;

            // create overlay
            var $tbl = $("<table></table>");
            for (var y = 1; y <= $rows; y++) {
                var $tr = $("<tr></tr>");
                for (var x = 1; x <= $cols; x++) {
                    var $td = $('<td data-type="0"></td>');
                    $td.css("width", $gsize + "px").css("height", $gsize + "px");
                    $tr.append($td);
                    $td.addClass("clickable");
                    $td.addClass("unselected");
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