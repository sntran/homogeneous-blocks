if (!window.Homogeneous) window.Homogeneous = {};
if (!Homogeneous.Blocks) Homogeneous.Blocks = {};


Homogeneous.Blocks.Columns = (function(){

    var md_template = _.template([
        '<div style="position:relative;">',
            '<div class="homogeneous-container clearfix" >',
                '<div contenteditable="true"></div>',
            '</div>',
            '<a data-icon="bin" class="homogeneous-remove st-block-ui-btn--delete st-icon" style="position:absolute; top: 0; opacity:0;">delete</a>',
        '</div>',
        ].join("\n"));

    return SirTrevor.Block.extend({

        type: "columns",

        editorHTML: function() {
            return md_template(this);
        },

        loadData: function(data){
            var columns = data.columns,
            html = "";
            columns.forEach(function(column, idx) {
                html += "<div contenteditable='true'>" + column + "</div>";
            });
            this.$row = this.$('.homogeneous-container');
            this.$row.html(html);
        },

        onBlockRender: function() {
            var block = this,
            $container = block.$(".homogeneous-container"),
            $remover = block.$('.homogeneous-remove'),
            $adder = $("<a class='.linkbtn' title='Add Column'>")
            .addClass("st-block-ui-btn st-icon st-icon--add")
            .attr("data-icon-after", "add");

            $container.on('mouseenter', '>div', function() {
                var $columns = $container.find("> div");
                if ($columns.length <= 1) return;
                var containerWidth = $container.width(),
                $column = $(this), idx = $columns.index($column),
                right = containerWidth - (idx+1)*$column.width() + "px";

                $remover.css({right: right, opacity:1});
            }).on('mouseout', '>div', function() {
                $remover.css({opacity:0});
            });

            $adder.click(function() {
                $container.append('<div contenteditable="true"></div>');
                var $columns = $container.find("> div"),
                width = (100/$columns.length)+"%";

                $columns.css({
                    "width": width,
                    "float": "left"
                });
            });
            this.$ui.prepend($adder);
        },

        toData: function() {
            var dataObj = { columns: []};
            this.$(".homogeneous-container > div").each(function(col) {
                dataObj.columns.push(col.innerHTML);
            });
            this.setData(dataObj);
        }

    });

})();
