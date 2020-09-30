function testWebP(callback) {
  var webP = new Image(); webP.onload = webP.onerror = function () { callback(webP.height == 2); }; webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
  if (support == true) { document.querySelector('body').classList.add('webp'); }else{ document.querySelector('body').classList.add('no-webp'); }
});



jQuery(document).ready(function($) {
  $('[data-fancybox=""]').fancybox({
    autoFocus: false
});

  $(".js-phone").mask("+7 (999) 999-99-99");

  

  if (/iPhone|iPad/i.test(navigator.userAgent)) {

    $('.fa_maintabs').addClass('iphone')

  } 

  $(".js-move").on("click", function(e){
      e.preventDefault();
      var anchor = $(this).attr('href');
      $('html, body').stop().animate({
          scrollTop: $(anchor).offset().top
      }, 800);
  });

  if ($('.js-doc-slider').length) {
    $('.js-doc-slider').each(function(i) {     

      var swiper = new Swiper(this, {
        slidesPerView: 1,
        autoHeight: true,
        spaceBetween: 0,
        navigation: {
          nextEl: '.fa_doc-slider__arrow_next-'+i,
          prevEl: '.fa_doc-slider__arrow_prev-'+i,
        },

       
      });
    });  
  };


  if ($('.js-license-slider').length) {
    $('.js-license-slider').each(function(i) { 

      var swiper = new Swiper(this, {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        navigation: {
          nextEl: '.license-slider__arrow_next-'+i,
          prevEl: '.license-slider__arrow_prev-'+i,
        }
      });
    });  
  };
 
  $('.js-tab-link').click(function(event) {
    event.preventDefault();
    var id = $(this).attr('href');
    $('.js-tab-link').removeClass('active');
    $('.js-tab-link').parent('li').removeClass('active');
    $(this).addClass('active');
    $(this).parent('li').addClass('active');
    $('.fa_maintabs').removeClass('active');
    $(id).addClass('active');
  });

  $('.pltNav-tabs__link').click(function(event) {
    event.preventDefault();
    var id = $(this).attr('href');
    $('.pltNav-tabs__link').removeClass('active');
    
    $(this).addClass('active');
   
    $('.pltTab-cont__pane').removeClass('active');
    $(id).addClass('active');
  });

  $('.fa_faq-card__title').click(function(event) {
    $(this).toggleClass('active');
    $(this).next('.fa_faq-card__body').slideToggle();
    
  });
  $('.fa_faq-card__title a').click(function(event) {
    event.preventDefault();    
  });
  
   
  var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
   
  $('.js-email').blur(function(){

    if($(this).val() != ''){
      
      if($(this).val().search(pattern) == 0){
        $('#valid').text('Подходит');
        $('#submit').attr('disabled', false);
        $(this).removeClass('error').addClass('ok');
      }else{
        $('#valid').text('Не подходит');
        $('#submit').attr('disabled', true);
        $(this).addClass('error');
      }
    }else{
      $(this).addClass('error');
      $(this).parents('form').find('input[type="submit"]').attr('disabled', true);     
    }
   });



  $(document).delegate('form','submit',function(){    
    var params = $(this).serialize(); 
    var form = $(this);  
    $.ajax({
      url:"mail/form.php",
      type:"post",
      dataType:"json",
      data:params,
      success:function (data) {       

        if(typeof data.redirect != 'undefined')
          window.location = data.redirect;
        if(typeof data.message != 'undefined'){




          if(data.message=='sent'){
            form.find('[type="reset"]').trigger('click');
            $('.popup-message').show();
            $('.over').fadeOut(300);
            setInterval(removePopup, 5500);

          } else if (data.message=='curator'){

            form.find('.fa_form__send').show();
            form.find('[type="reset"]').trigger('click');

            setTimeout( function(){
              $.fancybox.close();
              form.find('.fa_form__send').hide();
            }, 2000)
              
            

          }else{
            alert(data.message);
          }
        }
      }
    });
    return false;
  });

  


  var hea = $( document ).height() / 2;
    $(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > hea) {
         $('#new_show_bar').addClass('animated bounceInUp');
      } else {
        
      }
    });
    
  });
    
  $('#new_show_bar .hides').click(function(){
       $('#new_show_bar .center_texts').hide();
       $('#new_show_bar .showes').show();
       $('#new_show_bar').addClass('hide');
  });
  $('#new_show_bar .showes').click(function(){
      $('#new_show_bar .showes').hide();
      $('#new_show_bar .center_texts').show();
      $('#new_show_bar').addClass('animated bounceInUp').removeClass('hide');

  });

});




ymaps.ready(init);
  function init(){    
      var myMap = new ymaps.Map("map", {
          center: [51.576676, 45.968320],
          zoom: 12
      }); 
      myMap.behaviors.disable('scrollZoom');

        myPlacemark = new ymaps.Placemark([51.576676, 45.968320], {
            hintContent: 'Собственный значок метки',
            balloonContent: 'Это красивая метка'
        }, {
            
            iconLayout: 'default#image',
            iconImageHref: 'images/icons/icons.svg#baloon',
            iconImageSize: [56, 71]
        });

      myMap.geoObjects
        .add(myPlacemark)
        .add(myPlacemark2);

}

/* <![CDATA[ */
function externalLinks() {
  links = document.getElementsByTagName("a");
  for (i=0; i<links.length; i++) {
    link = links[i];
    if (link.getAttribute("href") && link.getAttribute("rel") == "external")
      link.target = "_blank";
  }
}
window.onload = externalLinks;
/* ]]> */ 
