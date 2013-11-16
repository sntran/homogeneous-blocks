Homogeneous.Blocks.Columns = (function(){

    var md_template = _.template([
        '<div style="position:relative;">',
            '<div class="homogeneous-container clearfix" >',
                '<div contenteditable="true"></div>',
            '</div>',
            '<a data-icon="bin" class="homogeneous-remove st-block-ui-btn--delete st-icon" style="position:absolute; top: 0; display:none;">delete</a>',
        '</div>',
        ].join("\n"));

    return Homogeneous.Blocks.Base.extend({

        components: {
            '.homogeneous-container': 'div'
        },

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

        onElementAdded: function(components) {
            this.resize();
        },

        onElementRemoved: function(components) {
            this.resize();
        },

        onUIRendered: function() {
            var block = this;

            block.$remover.on('mouseenter', function(){
                $(this).toggle(block.$container.find(">div").length > 1);
            });

            block.$container.on('mouseenter', '>div', function() {
                var $columns = block.$container.find("> div");
                if ($columns.length <= 1) return;
                var containerWidth = block.$container.width(),
                $column = $(this), idx = $columns.index($column),
                left = (idx)*$column.width() + "px";

                block.activeIdx = idx;
                block.$remover.css({left: left}).show();
            }).on('mouseleave', '>div', function() {
                block.$remover.hide();
            });
        },

        toData: function() {
            var dataObj = { columns: []};
            this.$(".homogeneous-container > div").each(function(col) {
                dataObj.columns.push(col.innerHTML);
            });
            this.setData(dataObj);
        },

        resize: function() {
            var $columns = this.$container.find("> div"),
                width = (100/$columns.length)+"%";
            $columns.css({
                "width": width,
                "float": "left"
            });
        }

    });

})();