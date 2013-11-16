Homogeneous.Blocks.HorizontalTab = (function(){

    var md_template = _.template([
        '<div class="homogeneous-container homogeneous-tab <%= type %> clearfix" >',
            '<ul class="homogeneous-tab-header clearfix">',
                '<li class="active" contenteditable="true">Header</li>',
            '</ul>',
            '<div class="homogeneous-tab-content">',
                '<div contenteditable="true"></div>',
            '</div>',
            '<a data-icon="bin" class="homogeneous-remove st-block-ui-btn--delete st-icon" style="position:absolute; top: 0; ">delete</a>',
        '</div>',
    ].join("\n"));

    return Homogeneous.Blocks.Base.extend({

        components: {
            '.homogeneous-tab-header': 'li',
            '.homogeneous-tab-content': 'div'
        },

        type: "horizontal-tab",

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

        onElementAdded: function(components) {
            var $newTab = components['.homogeneous-tab-header'];
            this.activate($newTab);
            $newTab.focus();
        },

        onElementRemoved: function(components) {
            var $activeTab = components['.homogeneous-tab-header'];
            $next = $activeTab.next();
            if ($next.length === 0) $next = $activeTab.prev();
            this.activate($next);
        },

        onUIRendered: function() {
            var block = this,
                $container = block.$container,
                $headers = $container.find('.homogeneous-tab-header'),
                $contents = $container.find('.homogeneous-tab-content');

            block.$remover.on('mouseenter', function(){
                $(this).toggle($headers.find(">li").length > 1);
            });

            $container.on('click', '.homogeneous-tab-header > li', function() {
                block.activate($(this));
            }).on('mouseenter', '.homogeneous-tab-header > li, .homogeneous-tab-content > div', function() {
                var $tabs = $headers.find(">li");
                if ($tabs.length <= 1 || $(this).index() !== block.activeIdx) return;
                var $current = $tabs.eq(block.activeIdx);
                block.$remover.css($current.position()).show();
            }).on('mouseleave', '.homogeneous-tab-header > li, .homogeneous-tab-content > div', function() {
                block.$remover.hide();
            });

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