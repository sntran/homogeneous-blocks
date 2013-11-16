if (!window.Homogeneous) window.Homogeneous = {};
if (!Homogeneous.Blocks) Homogeneous.Blocks = {};

Homogeneous.Blocks.Base = (function(){

    return SirTrevor.Block.extend({
        activeIdx: 0,

        components: {
            '.homogeneous-tab-header': 'li',
            '.homogeneous-tab-content': 'div'
        },

        onBlockRender: function() {
            var block = this;
            block.$container = block.$(".homogeneous-container");
            block.$remover = block.$('.homogeneous-remove');
            block.$adder = $("<a class='linkbtn' title='Add Tab'>")
                    .addClass("st-block-ui-btn st-icon st-icon--add")
                    .attr("data-icon-after", "add");

            block.$remover.click(function() {
                var $toRemove = {};
                $.each(block.components, function(container, type) {
                    var $el = block.$(container).find(">"+type+":eq("+block.activeIdx+")");
                    $toRemove[container] = $el;
                });

                if (typeof block.beforeElementRemoved === "function")
                    block.beforeElementRemoved($toRemove);

                $.each($toRemove, function(container, $el) {
                    $el.remove();
                });

                if (typeof block.onElementRemoved === "function")
                    block.onElementRemoved($toRemove);

            });

            block.$adder.click(function() {
                var $toAdd = {};
                $.each(block.components, function(container, type) {
                    var $el = $('<'+type+'></'+type+'>').attr('contenteditable', true);
                    block.$(container).append($el);
                    $toAdd[container] = $el;
                });
                if (typeof block.onElementAdded === "function") block.onElementAdded($toAdd);
            });
            block.$ui.prepend(block.$adder);

            if (typeof block.onUIRendered) block.onUIRendered();
        }

    });

})();