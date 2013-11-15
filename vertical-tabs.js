if (!window.Homogeneous) window.Homogeneous = {};
if (!Homogeneous.Blocks) Homogeneous.Blocks = {};

Homogeneous.Blocks.VerticalTab = (function(){

    return Homogeneous.Blocks.HorizontalTab.extend({
        type: "vertical-tab",

        onBlockRender: function() {
        	Homogeneous.Blocks.HorizontalTab.prototype.onBlockRender.call(this);

        	var block = this, $headers = block.$headers;
        	$headers.on('dragover', '>li.active', function(e) {
        		e.preventDefault();
        		e.stopPropagation();
        		$(this).css("border", "2px dashed #ddd");
        	}).on('dragenter', '>li.active', function(e){
        		e.preventDefault();
        		e.stopPropagation();
        	}).on('dragleave', '>li.active', function(e) {
        		e.preventDefault();
        		e.stopPropagation();
        		$(this).css("border", "none");
        	}).on('drop', '>li.active', function(e) {
        		$(this).css("border", "none");
        		if(!e.originalEvent.dataTransfer) return;
				if(!e.originalEvent.dataTransfer.files.length) return;
                e.preventDefault();
                e.stopPropagation();

                var $header = $(this);
                var file = e.originalEvent.dataTransfer.files[0];
                if (!/image/.test(file.type)) return;

            	block.loading();
            	var fileReader = new FileReader();
            	fileReader.onload = function(e) {
                    // var url = urlAPI.createObjectURL(file);
                    var url = file.name;
                    var data = {
                        name: file.name,
                        source: e.target.result
                    };
                    $header.append($('<img>', { src: data.source, alt: file.name }));
                    block.ready();
                }
                fileReader.readAsDataURL(file);
        	});
        }
    });

})();