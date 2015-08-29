(function ($, Drupal) {

  Drupal.behaviors.alumni = {
    attach: function(context, settings) {
        //Search header text
        $('.topbar-search input[name="search_block_form"]').once(function() {
      	  var searchLabel = 'search';
      	  $(this).val(searchLabel);
      	  $(this).focus(function() {
      		  if ($(this).val() == searchLabel) {
      			  $(this).val('');
      		  }
      	  });
      	  $(this).blur(function() {
      		  if ($(this).val().trim() == '') {
      			  $(this).val(searchLabel);
      		  }
      	  });
        });
        
        //Hover over standard feature boxes
        $('.standard-feature-box .feature-box').hover(function() {
        	var fb = $(this);
        	//Hide the others first
        	$('.standard-feature-box .feature-box .row-top').css({'height': ''}).removeClass('hover');
        	$(this).find('.row-top').animate({'height': '100%'}, 500, function() {fb.addClass('hover');})
        	
        }, function() {
        	$(this).find('.row-top').css({'height': ''});
        	$(this).removeClass('hover');
        });

        //tabs

        //Around the world
	$(".around-the-world-page .row-middle-main .left .column-content").once().each(function() {
	  $( ".alumni-events-map",$(this)).addClass( "active" );
	  $( ".alumni-groups-map",$(this)).addClass( "hidden" );
	  $( ".alumni-trips-map",$(this)).addClass( "hidden" );					
	});
	$( ".events-tab-title" ).click(function() {
	  $( ".alumni-events-map" ).addClass( "active" );
	  $( ".alumni-groups-map" ).removeClass( "active" );
	  $( ".alumni-trips-map" ).removeClass( "active" );
	  $( ".alumni-groups-map" ).addClass( "hidden" );
	  $( ".alumni-trips-map" ).addClass( "hidden" );
	});

	$( ".groups-tab-title" ).click(function() {
	  $( ".alumni-groups-map" ).addClass( "active" );
	  $( ".alumni-events-map" ).removeClass( "active" );
	  $( ".alumni-trips-map" ).removeClass( "active" );
	  $( ".alumni-events-map" ).addClass( "hidden" );
	  $( ".alumni-trips-map" ).addClass( "hidden" );
	});

	$( ".trips-tab-title" ).click(function() {
	  $( ".alumni-trips-map" ).addClass( "active" );
	  $( ".alumni-events-map" ).removeClass( "active" );
	  $( ".alumni-groups-map" ).removeClass( "active" );
	  $( ".alumni-groups-map" ).addClass( "hidden" );
	  $( ".alumni-events-map" ).addClass( "hidden" );
	});
        
        //responsive table

        $(".around-the-world-events table").addClass("responsive");

        //Function to calculate height of toggled mobile menu
        function alumniMobileMenuHeight(mobileMenu, currentMenu) {
          var menuHeight = 100;
          if (!currentMenu) {
            currentMenu = $('ul.menu', mobileMenu).first();
          }
            currentMenu.each(function() {
            menuHeight = Math.max($(this).height(), menuHeight);
          });
          mobileMenu.css('minHeight', menuHeight + 'px');
        }
         

         //Mobile menu
        $('.alumni-mobile-menu').hide();
        $('.menu-toggle').once().on("click", function(event) {
        $('.alumni-mobile-menu').toggle();
          alumniMobileMenuHeight($('.pane-topmenu-mobile'));
          event.stopPropagation();
        });
        $('.toggle-mobile-search').click(function(event) {
        $('.mobile-top-header-column .block-search').toggle();
        });
        $('li.contains-menu > a').once().on("click", function(event){
          var parent = $(this).parent();
          var me = $(this);
          var next = $(this).next('ul.menu');
            $(this).closest('.pane-topmenu-mobile').each(function() {
              var x = $(this).attr('data-menu-level');
              if (!x) {
                x = 0;
              }
              x = parseInt(x)+1;
              $(this).attr('data-menu-level', x);
              $(this).animate({left: (-x * 100) + '%'});
              next.css('left', '100%');//.animate({left: '0%'}, 500, function() {
              //});
              parent.toggleClass('opened');
              parent.siblings().toggleClass('closed');

              //Hide other li elements (marks class of parent that has child opened)
              parent.parent().closest('li.contains-menu').toggleClass('child-opened');
              //Scroll up for longer menus
              $('html, body').animate({
                scrollTop: 0
              }, 1000);

              //Also set height on opened menu to match/overlay parent
              me.next('ul.menu').css('minHeight', parent.closest('ul.menu').height());
              alumniMobileMenuHeight($(this), next);
            });

                return false;
        });
        $('.click-back').once().on('click', function(event){
          var parent = $(this).parent();
          var me = $(this);
          $(this).closest('.pane-topmenu-mobile').each(function() {
          var x = $(this).attr('data-menu-level');
          if (!x) {
            x = 0;
          }
          x = parseInt(x) - 1;
          if (x < 0) { x = 0; }
          $(this).attr('data-menu-level', x);
          $(this).animate({left: (-x * 100) + '%'});
          parent.css('display', 'block').animate({left: '100%'}, 500, function() {
          });
          me.closest('li.contains-menu').toggleClass('opened').closest('li.contains-menu').toggleClass('child-opened');
          me.closest('li.contains-menu').siblings().toggleClass('closed');
          //parent.parent().closest('li.contains-menu').toggleClass('child-opened');

          //me.closest('li.contains-menu').toggleClass('opened').parent().closest('li.contains-menu').toggleClass('child-opened');
          //me.closest('li.contains-menu').siblings().toggleClass('closed');
              alumniMobileMenuHeight($(this), parent.parentsUntil('ul.menu'));
                });
                return false;
        });

	//menu second click (bug:open new tab causes it to take /node)

	/*$('.button.dropdown').on('click', function() {
    	 var next = $(this).next('.open');
          var href = $(this).attr('data-original-href');
    	 if ($(this).next('.open').length > 0 && $(this).attr('data-original-href')) {
    		 //window.location.href = $(this).attr('data-original-href');
           window.location = href.match('^http') ? href : 'http://www.alumni.ox.ac.uk/' + $(this).attr('data-original-href');
    	 } 
      });*/

      //Load href on second click
        $('.main-dropdown-menu a.dropdown').click(function() {
          //See if dropdown is open
          var a = $(this);
          var parent = $(this).parent();
          if (parent.children('.f-dropdown.content.open').length > 0 && a.attr('data-original-href')) {
            window.location.href = a.attr('data-original-href');
          }
        });
        
        //Slick js

        $('.view-gallery-carousel-by-node .view-content').slick({
        	slidesToShow: 3
        });
				
				//landing page banners
        $('.rotating-banner .field-name-field-banners').slick({
          autoplay: true,
          autoplaySpeed: 5000,
        });
        $('.landing-page-front .view-list-events .view-content').slick();
        
        $('.view-gallery-carousel-by-node .view-content .views-field-field-gallery-image').click(function() {
        	var url = $(this).closest('.view-gallery-carousel-by-node').find('.hidden').first().attr('data-gallery-url');
        	$('#galleryModal').foundation('reveal', 'open', url);
        });
        $(document).on('opened.fndtn.reveal', '[data-reveal]', function () {
    	  $('.lightbox-gallery .view-content').slick({
          	slidesToShow: 1,
          });
    	});
            	
    	//Event image rotator

			//Events gallery

			$('.pane-node-field-rotating-image-gallery .field-items').slick();


        //Make the first person active on load

        var personBody = $(".volunteer-view .views-row:first-child").children(".alumni-thumbnail").next(".alumni-body-content").html();
        $("#alumni-information").html(personBody);
        $(".volunteer-view .views-row:first-child").toggleClass("active");

	//Person ajax view click listener.  When a person is selected show the information
	//of the selected person and hide others.

	$(".volunteer-view .views-row").click(function(){
	  currentViewportWidth = $(window).width();
          if (currentViewportWidth > 1024) {
	    $(".volunteer-view .views-row").removeClass("active");
	    $(this).toggleClass("active");
				
	    var personBody = $(this).children(".alumni-thumbnail").next(".alumni-body-content").html();
	    $("#alumni-information").html(personBody);
	    var offsetRow = $(this).offset().top;
	    var alumniInf = $(".view-person-list .view-content").offset().top;
	    var adjustInf = (offsetRow - alumniInf);
	    $(".view-person-list .view-footer").css("marginTop", adjustInf+"px");
            $('html, body').animate({
              scrollTop: $("#alumni-information-top").offset().top
            }, 1000);
	  }
	  else {
            
	    $(".volunteer-view .views-row").removeClass("active");
	    $(this).toggleClass("active");
				
	    var personBody = $(this).children(".alumni-thumbnail").next(".alumni-body-content").html();
	    $("#alumni-information").html(personBody);
	    $(".view-person-list .view-footer").css("marginTop", "0px");
	    $('html, body').animate({
              scrollTop: $("#alumni-information-top").offset().top
            }, 1000); 
           }
         });


                        //Smooth anchor scrolling

        //$('a[href*=#]:not([href=#])').click(function() {
          //if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
          //|| location.hostname == this.hostname) {

          //var target = $(this.hash);
          //target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
             //if (target.length) {
               //$('html,body').animate({
                 //scrollTop: target.offset().top
                //}, 1000);
            //}
          //}
        //});

			//Zurb accordion animation

  $(".accordion dd > a").once().on("click", function (event){
  var dd = $(this).parent();
    $(dd).toggleClass("active");
    $(".accordion dd").not(dd).removeClass("active");
    if(dd.hasClass('active'))					{
      $(".accordion dd div.content:visible").slideToggle("normal");
      $(this).parent().find(".content").slideToggle("normal");					}
    else
      {           
        $(".accordion dd div.content:visible").slideToggle("normal"); 
      }
    });
      
      //Image description pop-up

      $(".image-description-icon").once().click(function() {
        	$(".image-description-group").toggleClass("shown");
        });
      
        //Show group email when person name is clicked
        //$(".field-name-field-group-leader").once().click(function() {
        //        $(".field-name-field-email").toggleClass("shown");
        //});
				//gallery

        var main_gallery = $('.gallery-main .gallery-wrapper').slick({
        	slidesToShow: 1,
        	onAfterChange: function () {
        	  var i = main_gallery.slickCurrentSlide();
        	  carouselGoTo(i);
        	}
        });
        
        var carousel = $('.gallery-thumbnails .gallery-wrapper').slick({
        	slidesToShow: 6
        });
        
        $('.gallery-thumbnails .gallery-wrapper .gallery-item').click(function() {
        	var index = $(this).index();
        	galleryGoTo(index-1);
        });
        
        function carouselGoTo(i) {
        	carousel.slickGoTo(i);
        }
        function galleryGoTo(i) {
        	main_gallery.slickGoTo(i);
        }
        $('.gallery-main .gallery-navigation .close').click(function() {
        	$(this).closest('.gallery-caption').fadeOut(500, function(){
        		$(this).height(0);
        	});
        	
        });
        
        //Views pretty drop down select
        $('.views-widget .form-type-select select').once().each(function() {
      	  var id = $(this).attr('id');
      	  var myObj = $(this);
      	  $(this).hide();
      	  var formLabel = $('label[for=' + id + ']').text().trim();
      	  var anyLabel = '- Any -';
      	  var label = '- Any -';
      	  var list = '';
      	  var count = $('option', $(this)).length;
      	  $('option', $(this)).each(function(i) {
      		  list += '<li><a href="#" class="select-and-close" data-id="' + id + '" data-value="' + $(this).val() + '">' + $(this).text() + '</a></li>';
      		  if ($(this).attr('selected')) {
      			  label = $(this).text();
      		  }
      		  if (label == anyLabel && formLabel) {
      			  label = formLabel;
      		  }
      		  if (!--count) {
      			  var dropdown = '<a href="#" data-dropdown="drop-' + id + '" class="button dropdown">' + label + '</a>' +
      			  	'<ul id="drop-' + id + '" data-dropdown-content class="f-dropdown">' + list + '</ul>';
      			  myObj.after(dropdown);
      			  $(document).foundation();
      		  };
      	  });
        });
        $('.views-widget .form-type-select .select-and-close').click(function() {
      	  //Get the value and set the value
      	  var val = $(this).attr('data-value');
      	  var id = $(this).attr('data-id');
      	  var obj = $('#' + id);
      	  obj.val(val);
      	  $('#drop-' + id).foundation('dropdown', 'close', $('#drop-' + id));
      	  $('.views-submit-button *[type="submit"]', $(this).parentsUntil('form')).click();
      	  return false;
        });
        
        //PDF viewer
        var currPage = 1; //Pages are 1-based not 0-based
        var numPages = 0;
        var thePDF = null;
        
        $('.view-pdf[data-url]').once().click(function() {
        	var url = $(this).attr('data-url');
        	loadPDFViewer();
        	$('#pdfModal').foundation('reveal', 'open');
        	//Render the pdf
        	//
        	// Fetch the PDF document from the URL using promises
        	//
        	PDFJS.getDocument(url).then(function(pdf) {
        		thePDF = pdf;
        		numPages = pdf.numPages;
        		handlePages(pdf, 1);
        		$('#pdf-canvas').attr('data-page', '1').attr('data-nr-pages', numPages);
        		
        	  
        	});
        });
        $('#pdfModal .next').click(function() {
        	var pagenr = parseInt($('#pdf-canvas').attr('data-page') + 1);
        	$('#pdf-canvas').attr('data-page', pagenr)
        	handlePages(thePDF, pagenr);
        });
    },
  }
  
  function loadPDFViewer() {
	  if ($('#pdf-viewer').length == 0) {
		  $('head').first().append('<script id="pdf-viewer" src="' + Drupal.settings.basePath + Drupal.settings.pathToTheme +  '/js/vendor/pdf.js" type="text/javascript" async="true"/>');
		  PDFJS.workerSrc = Drupal.settings.basePath + Drupal.settings.pathToTheme +  '/js/vendor/pdf.worker.js';
	  }
	  return true;
  }
  
  function handlePages(pdf, pagenr) {
	// Using promise to fetch the page
	  pdf.getPage(pagenr).then(function(page) {
	    var scale = 1.5;
	    var viewport = page.getViewport(scale);

	    //
	    // Prepare canvas using PDF page dimensions
	    //
	    var canvas = document.getElementById('pdf-canvas');
	    var context = canvas.getContext('2d');
	    canvas.height = viewport.height;
	    canvas.width = viewport.width;

	    //
	    // Render PDF page into canvas context
	    //
	    var renderContext = {
	      canvasContext: context,
	      viewport: viewport
	    };
	    page.render(renderContext);
	  });
  }
})(jQuery, Drupal);
