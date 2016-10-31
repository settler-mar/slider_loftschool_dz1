;(function($){
	var defaults={
		here_tab_class:'slider__here-tab',
		control_here_tab_class:'slider__here-slide',
		control_box_class:'slider__controls',
		control_prev_tab_class:'slider__control',
		control_prev_icon:'<i class="fa fa-chevron-down slider__button slider__button-prev"></i>',
		control_next_tab_class:'slider__control',
		control_next_icon:'<i class="fa fa-chevron-up slider__button slider__button-next"></i>',
		here_img_class:'slider__image-here-slide',
		control_image_prev:'slider__control-image',
		control_image_next:'slider__control-image',
		here_img_box_class:'slider__image-control-box slider__image-control-box_here',
		next_img_box_class:'slider__image-control-box slider__image-control-box_next',
		prev_img_box_class:'slider__image-control-box slider__image-control-box_prev',

		full_slide_box_class:'full_slide_box',
		full_slider_class:'slider__full-information',
		full_slider_title_class:'slider__title',
		skills_list_class:'slider__skills-list',
		skills_item_class:'slider__skills-item',
		slider_link_class:'slider__link',
		slider_link_icon:'<i class="fa fa-link slider__link-icon"></i>',
		slider_link_text_class:'slider__link-text',
		slider_link_text:'Перейти на сайт',

		active_here_class:'slider__image-control-box_active',
		control_next_active_class:'slider__image-control-box_next-show',
		control_prev_active_class:'slider__image-control-box_prev-show',

		active_slide_class:'active',
		show_letter_class:'show_letter',
	};
	var slider;
	function settler_slider(element,options){
		this.slider=$(element);
		this.config=$.extend({},defaults,options);
		this.active_slide=0;
		this.init();
	}
  settler_slider.prototype.test_sel=function(sel,max){
    if(sel>=max)sel-=max;
    if(sel<0)sel+=max;
    return sel;
  };

  settler_slider.prototype.update_slide=function(){
    //картинка текущей работы
    var here_control=this.here_control.find('>div');
    here_control.removeClass(this.config.active_here_class);
    here_control.eq(this.active_slide).addClass(this.config.active_here_class);

    //картинка на кнопке управления
    var next_control=this.next_control.find('>div');
    next_control.removeClass(this.config.control_next_active_class);
    next_control.eq(this.test_sel(this.active_slide+1,this.slider_count)).addClass(this.config.control_next_active_class);

    var prev_control=this.prev_control.find('>div');
    prev_control.removeClass(this.config.control_prev_active_class);
    prev_control.eq(this.test_sel(this.active_slide-1,this.slider_count)).addClass(this.config.control_prev_active_class);

    //детальная информация
    var slider_here=this.slider_here.find('>div');
    slider_here.removeClass(this.config.active_slide_class);
    slider_here.find('.slider__title span').removeClass(this.config.show_letter_class);

    //побуквеная анимация
    slider_here=slider_here.eq(this.active_slide);
    slider_here.addClass(this.config.active_slide_class);
    slider_here.find('.slider__title span').next_item_animation({animation_class:this.config.show_letter_class});
  };

	settler_slider.prototype.init=function(){
		var slides_start=this.slider.find('ul.slider-home>li');

    var slider_here=$('<div/>',{
      class:this.config.here_tab_class
    });
    var slider_control_here=$('<div/>', {
      class: this.config.control_here_tab_class
    });
    var control_prev_tab=$('<div/>', {
      class: this.config.control_prev_tab_class,
      html:this.config.control_prev_icon
    });
    var control_next_tab=$('<div/>', {
      class: this.config.control_next_tab_class,
      html:this.config.control_next_icon
    });

    this.slider_count=slides_start.length;
    for(var i=0;i<slides_start.length;i++) {
      var data=slides_start.eq(i);

      //создание блока полной информации
      var full_slider=$('<div/>',{
        class:this.config.full_slider_class
      });

      var title_line=$('<div/>',{
        class:this.config.full_slider_title_class
      });
      var title=data.find('.title').text();
      for(var j=0;j<title.length;j++){
        title_line.append($('<span/>',{
          text:title[j]
        }))
      }
      full_slider.append(title_line);

      var skills=data.find('.skills').first().clone();
      skills
        .attr('class','')
        .addClass(this.config.skills_list_class)
        .find('li')
        .attr('class','')
        .addClass(this.config.skills_item_class);
      full_slider.append(skills);

      var link=$('<a/>',{
        class:this.config.slider_link_class,
        html:this.config.slider_link_icon
      });
      link.append($('<span/>',{
        class:this.config.slider_link_text_class,
        text:this.config.slider_link_text
      }));
      full_slider.append(link);
      slider_here.append(full_slider);
      full_slider.wrap($('<div/>',{
        class:this.config.full_slide_box_class
      }));

      var img=data.find('.image');
      var src=img.attr('href');
      img=img.find('img').attr('class','');
      var img_prew=img.clone().addClass(this.config.control_image_prev);
      img_prew=img_prew.wrap($('<div/>',{class:this.config.prev_img_box_class})).parent();
      control_prev_tab.append(img_prew);

      var img_next=img.clone().addClass(this.config.control_image_next);
      img_next=img_next.wrap($('<div/>',{class:this.config.next_img_box_class})).parent();
      control_next_tab.append(img_next);

      img.attr('src',src);
      var img_here=img.clone().addClass(this.config.here_img_class);
      img_here=img_here.wrap($('<div/>',{class:this.config.here_img_box_class})).parent();
      slider_control_here.append(img_here);
    }

    this.slider.html('');
    this.slider.append(slider_control_here);
    this.slider.append(slider_here);

    var control_box=$('<div/>',{
      class:this.config.control_box_class
    });
    control_box.append(control_prev_tab);
    control_box.append(control_next_tab);
    this.slider.append(control_box);

    this.here_control=slider_control_here;
    this.next_control=control_next_tab;
    this.prev_control=control_prev_tab;
    this.slider_here=slider_here;
    slider=this;

    this.next_control.on('click',function(){
      slider.active_slide++;
      if(slider.active_slide>=slider.slider_count)slider.active_slide=0;
      slider.update_slide();
    });
    this.prev_control.on('click',function(){
      slider.active_slide--;
      if(slider.active_slide<0)slider.active_slide=slider.slider_count-1;
      slider.update_slide();
    });

    this.update_slide();
	};

	$.fn.settler_slider=function(options){
		return new settler_slider(this,options);
	}
})(jQuery);

$('.slider').settler_slider();