;(function($){
	var timer_id = false;
	var animate_element,config;
	var t_el;
	var defaults={
		animation_class:undefined,
		prev_class:undefined,
		time_interval:100
	};
  next_item_animation.prototype.animation_start=function(){
    t_el = animate_element.not('.' + config.animation_class).first();
    if (t_el.length > 0) {
      t_el.addClass(config.animation_class);
    } else {
      clearInterval(timer_id);
    }
    if(config.prew_class!=undefined)t_el.removeClass(config.prew_class)
  };
	function next_item_animation(element,options){
    animate_element=$(element);
    config=$.extend({},defaults,options);
    if(config.animation_class==undefined){
      console.error('Parametr animation_class not found')
    }
    this.init();
	}

	next_item_animation.prototype.init=function(){
    animate_element.removeClass(config.animation_class);
    timer_id=setInterval(this.animation_start,config.time_interval);
	};
	
	$.fn.next_item_animation=function(options){
		new next_item_animation(this,options);
		return this;
	}
})(jQuery);
