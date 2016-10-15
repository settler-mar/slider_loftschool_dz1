;(function($){
	var defaults={

	};
	var slider;
	function settler_slider(element,options){
		this.slider=$(element);
		this.config=$.extend({},defaults,options);
		this.active_slide=0;
		this.init();
	}

	settler_slider.prototype.init=function(){

	};

	$.fn.settler_slider=function(options){
		return new settler_slider(this,options);
	}
})(jQuery);

$('.slider').settler_slider();