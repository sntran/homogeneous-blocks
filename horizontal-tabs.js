if (!window.Homogeneous) window.Homogeneous = {};
if (!Homogeneous.Blocks) Homogeneous.Blocks = {};

Homogeneous.Blocks.HorizontalTab = (function(){

    var md_template = _.template([
        '<div class="homogeneous-container homogeneous-tab">',
            '<ul class="homogeneous-tab-header clearfix">',
                '<li class="active" contenteditable="true">Header</li>',
            '</ul>',
            '<hr />',
            '<div class="homogeneous-tab-content">',
                '<div contenteditable="true"></div>',
            '</div>',
            '<a data-icon="bin" class="homogeneous-remove st-block-ui-btn--delete st-icon" style="position:absolute; top: 0; opacity:0;">delete</a>',
        '</div>',
    ].join("\n"));

    return SirTrevor.Block.extend({

        type: "horizontal-tab",

        activeIdx: 0,

        editorHTML: function() {
            return md_template(this);
        },

        loadData: function(data){
            var tabs = data.tabs,
            html = "";
            tabs.forEach(function(tab, idx) {
                html += tab_template({tab:tab});
            });
            this.$row = this.$('.homogeneous-container');
            this.$row.html(html);
        },

        onBlockRender: function() {
            var block = this,
                $container = block.$(".homogeneous-container"),
                $remover = block.$('.homogeneous-remove'),
                $headers = $container.find('.homogeneous-tab-header'),
                $contents = $container.find('.homogeneous-tab-content'),
                $adder = $("<a class='.linkbtn' title='Add Tab'>")
                    .addClass("st-block-ui-btn st-icon st-icon--add")
                    .attr("data-icon-after", "add");

            $remover.click(function() {

            }).on('mouseenter', function(){

            });

            $headers.on('click', '> li', function() {
                block.activate($(this));
            });

            $container.on('mouseenter', '>div', function() {

            }).on('mouseleave', '>div', function() {

            });

            $adder.click(function() {
                var $newTab = $('<li contenteditable="true"</li>');
                $headers.append($newTab);
                $contents.append('<div contenteditable="true"></div>');
                block.activate($newTab);
                $newTab.focus();
            });
            this.$ui.prepend($adder);

            block.$headers = $headers;
            block.$contents = $contents;
        },

        toData: function() {
            var dataObj = { columns: []};
            this.$(".homogeneous-container > div").each(function(col) {
                dataObj.columns.push(col.innerHTML);
            });
            this.setData(dataObj);
        },

        activate: function($tab) {
            var idx = this.$headers.find(">li").removeClass("active").index($tab);
            $tab.addClass("active");
            this.$contents.find(">div").hide().eq(idx).show();
        }

    });

})();