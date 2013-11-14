if (!window.Homogeneous) window.Homogeneous = {};
if (!Homogeneous.Blocks) Homogeneous.Blocks = {};

Homogeneous.Blocks.HorizontalTab = (function(){

    var md_template = _.template([
        '<div class="homogeneous-container homogeneous-tab">',
            '<ul class="homogeneous-tab-header clearfix">',
                '<li class="active" contenteditable="true">Header</li>',
            '</ul>',
            '<div class="homogeneous-tab-content">',
                '<div contenteditable="true"></div>',
            '</div>',
            '<a data-icon="bin" class="homogeneous-remove st-block-ui-btn--delete st-icon" style="position:absolute; top: 0; ">delete</a>',
        '</div>',
    ].join("\n"));

    return SirTrevor.Block.extend({

        type: "horizontal-tab",

        activeIdx: 0,

        editorHTML: function() {
            return md_template(this);
        },

        loadData: function(data){
            var tabs = data.tabs, block = this, html = "",
                $container = block.$(".homogeneous-container"),
                $headers = $container.find('.homogeneous-tab-header'),
                $contents = $container.find('.homogeneous-tab-content');
            tabs.forEach(function(tab, idx) {
                $headers.append('<li contenteditable="true">'+tab.header+'</li>');
                $contents.append('<div contenteditable="true">'+tab.content+'</div>');
            });
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
                var $tabs = $headers.find(">li"),
                    $panels = $contents.find(">div"),
                    $activeTab = $tabs.eq(block.activeIdx),
                    $next = $activeTab.next();
                if ($next.length === 0) $next = $activeTab.prev();
                $activeTab.remove();
                $panels.eq(block.activeIdx).remove();
                block.activate($next);
            }).on('mouseenter', function(){
                $(this).toggle($headers.find(">li").length > 1);
            });

            $container.on('click', '.homogeneous-tab-header > li', function() {
                block.activate($(this));
            }).on('mouseenter', '.homogeneous-tab-header > li, .homogeneous-tab-content > div', function() {
                var $tabs = $headers.find(">li");
                if ($tabs.length <= 1 || $(this).index() !== block.activeIdx) return;
                var $current = $tabs.eq(block.activeIdx),
                    left = $current.position().left;
                $remover.css("left", left).show();
            }).on('mouseleave', '.homogeneous-tab-header > li, .homogeneous-tab-content > div', function() {
                $remover.hide();
            });

            $adder.click(function() {
                var $newTab = $('<li contenteditable="true"></li>');
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
            this.activeIdx = this.$headers.find(">li").removeClass("active").index($tab);
            $tab.addClass("active");
            this.$contents.find(">div").hide().eq(this.activeIdx).show();
        }

    });

})();