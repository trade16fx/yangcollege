function testWebP(callback) {
  var webP = new Image(); webP.onload = webP.onerror = function () { callback(webP.height == 2); }; webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
  if (support == true) { document.querySelector('body').classList.add('webp'); }else{ document.querySelector('body').classList.add('no-webp'); }
});



jQuery(document).ready(function($) {

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

  var swiper = new Swiper('.js-doc-slider', {
    slidesPerView: 1,
    autoHeight: true,
    spaceBetween: 0,
    navigation: {
      nextEl: '.fa_doc-slider__arrow_next',
      prevEl: '.fa_doc-slider__arrow_prev',
    }
  });

  var swiper = new Swiper('.js-license-slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
      nextEl: '.fa_license-slider__arrow_next',
      prevEl: '.fa_license-slider__arrow_prev',
    }
  });
 
  $('.js-tab-link').click(function(event) {
    event.preventDefault();
    var id = $(this).attr('href');
    $('.js-tab-link').removeClass('active');
    $(this).addClass('active');
    $('.fa_maintabs').removeClass('active');
    $(id).addClass('active');
  });

  $('.fa_faq-card__title').click(function(event) {
    $(this).toggleClass('active');
    $(this).next('.fa_faq-card__body').slideToggle();
    
  });
  $('.fa_faq-card__title a').click(function(event) {
    event.preventDefault();    
  });
  
  // Modernizr.on('webp', function (result) {    
  //   if (result) {
  //     $('.js-image').each(function(index, el) {
  //       var datawebp = $(this).data('src');
  //       $(this).attr('href', datawebp);
        
  //     });     
  //   }  
  // });



  
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

  

  // $(document).on('afterShow.fb', function( e, instance, slide ) {
  //     $('.fa_header').addClass('open');  
  // });
  // $(document).on('beforeClose.fb', function( e, instance, slide ) {
  //     $('.fa_header').removeClass('open');  
  // });


  var now = new Date();

  var month = now.getMonth();
  var day = now.getDate();

  var season = '';

  if (month == 0) {
   season = 'зимнего';
  } else if (month == 1) {
   season = 'зимнего';
    if (day>=27) {
     season = 'весеннего';
    }
  } else if (month == 3) {
   season = 'весеннего';
  } else if (month == 4) {
   season = 'весеннего';
    if (day>=27) {
     season = 'летнего';
    }    
  } else if (month == 5) {
   season = 'летнего';
  } else if (month == 6) {
   season = 'летнего';
  } else if (month == 7) {
   season = 'летнего';
    if (day>=27) {
     season = 'осеннего';
    }
  } else if (month == 8) {
   season = 'осеннего';
  } else if (month == 9) {
   season = 'осеннего';
  } else if (month == 10) {
   season = 'осеннего';
    if (day>=27) {
     season = 'зимнего';
    }
  } else if (month == 11) {
   season = 'зимнего';
  } 

  $('.js-season').text(season);

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
            iconImageHref: 'images/baloon.svg',
            iconImageSize: [30, 63]
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
