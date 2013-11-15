if (!window.Homogeneous) window.Homogeneous = {};
if (!Homogeneous.Blocks) Homogeneous.Blocks = {};

Homogeneous.Blocks.VerticalTab = (function(){

    return Homogeneous.Blocks.HorizontalTab.extend({
        type: "vertical-tab"
    });

})();