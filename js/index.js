
var earthwatch = new earthwatchObject;


function earthwatchObject() {

	this.init = function() {
		console.log("in init");
		this.parallax();
		this.colorRandom();
		this.attachListeners();
		this.setupGalleries();
		console.log(this.artwork);
			

		// delegate calls to data-toggle="lightbox"
		$(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
			event.preventDefault();
			return $(this).ekkoLightbox({
				always_show_close: true
			});
		});

			

	}

	this.artwork = {
		"watercolors" : [
			{
				"src": "https://farm4.staticflickr.com/3693/11575678213_4f5d1127f6_o.jpg",
				"alt": "Maurice",
				"sub-gallery": "baby-animals"
			},
			{
				"src": "https://farm8.staticflickr.com/7328/11575799004_a64750aae9_o.jpg",
				"alt": "Wellington",
				"sub-gallery": "baby-animals"
			},
			{
				"src": "https://farm8.staticflickr.com/7327/11576251166_c95752e139_o.jpg",
				"alt": "Peter",
				"sub-gallery": "baby-animals"
			},
			{
				"src": "https://farm4.staticflickr.com/3802/11575675933_c9eab8c2aa_o.jpg",
				"alt": "Face 1",
				"sub-gallery": "faces"
			},
			{
				"src": "https://farm8.staticflickr.com/7446/11575797954_2f5b89de16_o.jpg",
				"alt": "Face 2",
				"sub-gallery": "faces"
			},
			{
				"src": "https://farm6.staticflickr.com/5513/11576252706_b6137fc170_o.jpg",
				"alt": "Face 3",
				"sub-gallery": "faces"
			},
			{
				"src": "https://farm1.staticflickr.com/274/19751277764_b74fce59dd_o.jpg",
				"alt": "Mercury",
				"sub-gallery": "planets"
			},
			{
				"src": "https://farm1.staticflickr.com/402/20185972558_9eeb900a74_o.jpg",
				"alt": "Venus",
				"sub-gallery": "planets"
			},
			{
				"src": "https://farm4.staticflickr.com/3811/20187316519_7e56b4fb73_o.jpg",
				"alt": "Earth",
				"sub-gallery": "planets"
			},
			{
				"src": "https://farm1.staticflickr.com/420/20380091011_30afb721ac_o.jpg",
				"alt": "Mars",
				"sub-gallery": "planets"
			},
			{
				"src": "https://farm1.staticflickr.com/255/20185972518_e6c9011967_o.jpg",
				"alt": "Jupiter",
				"sub-gallery": "planets"
			},
			{
				"src": "https://farm1.staticflickr.com/381/20365430882_51f295ef6e_o.jpg",
				"alt": "Saturn",
				"sub-gallery": "planets"
			},
			{
				"src": "https://farm1.staticflickr.com/289/20380090951_7fb903851d_o.jpg",
				"alt": "Uranus",
				"sub-gallery": "planets"
			},
			{
				"src": "https://farm1.staticflickr.com/347/20380091091_09bf35bdd9_o.jpg",
				"alt": "Neptune",
				"sub-gallery": "planets"
			},
			{
				"src": "https://farm4.staticflickr.com/3680/20185896110_0c15825323_o.jpg",
				"alt": "Pluto 1",
				"sub-gallery": "planets"
			},
		
		],
		"photography" : [
			{
				"src": "https://farm4.staticflickr.com/3693/11575678213_4f5d1127f6_o.jpg",
				"alt": "Maurice",
				"sub-gallery": "baby-animals"
			},
			{
				"src": "https://farm8.staticflickr.com/7328/11575799004_a64750aae9_o.jpg",
				"alt": "Wellington",
				"sub-gallery": "baby-animals"
			},
			{
				"src": "https://farm8.staticflickr.com/7327/11576251166_c95752e139_o.jpg",
				"alt": "Peter",
				"sub-gallery": "baby-animals"
			}
		],

	}


	// this.artwork = [



	// ];
	this.galleries = ["watercolors", "photography"];

	this.setupGalleries = function() {
		for (var i = 0; i < this.galleries.length; i++) {
			var gallery = this.galleries[i];
			console.log("gallery = "+gallery);
			var galleryId = "#"+this.galleries[i];
			for (var j = 0; j < this.artwork[gallery].length; j++) {
				var imgString = "<img src="+this.artwork[gallery][j]["src"]+" alt="+this.artwork[gallery][j]["alt"]+" class = '"+this.artwork[gallery][j]["sub-gallery"]+"'>"
				$(galleryId).append(imgString);
			};


			

		};
		$(".gallery").each(function() {
			var artwork = $(".gallery").children();
			console.log(artwork);
			var totalWidth = 0;
			var that = this;

			$(artwork).each(function() {
				var url = $(this).attr("src");
				$(artwork[i]).attr("src", url).load(function(){  
					
					console.log("outerWidth = "+$(this).width())
					totalWidth = totalWidth + $(this).outerWidth(true);
					
					$(that).width(totalWidth);
					
				}); 
			})


			// for (var i = 0; i < artwork.length; i++) {
			// 	var url = $(artwork[i]).attr("src");
			// 	$(artwork[i]).attr("src", url).load(function(){  
					
			// 		console.log("outerWidth = "+$(this).width())
			// 		totalWidth = totalWidth + $(this).outerWidth(true);
			// 		if (i+1 == artwork.length) {
			// 			console.log("totalWidth = "+totalWidth);
			// 			$(that).width(totalWidth);
			// 		};
			// 	}); 
				
			// };
			
			
		})



	}

	this.attachListeners = function() {
		// console.log("in attachListeners");
		$(".art-category").mouseover(function() {
			// console.log("in mouseover");
			var clickText = $(this).find(".click-block");
			//clickText.show();
			//clickText.css("opacity", "1");

			var artCatImg = $(this).find(".art-cat-img");
			//artCatImg.addClass("glass");
		})

		$(".art-category").mouseout(function() {
			var clickText = $(this).find(".click-block");
			//clickText.hide();
			//clickText.css("opacity", "0");

			var artCatImg = $(this).find(".art-cat-img");
			//artCatImg.removeClass("glass");
		})

		$(".ep-navsection").click(function() {
			var link = $(this).attr("href");
			var offset = $(link).offset().top - 50;
		    $('html,body').animate({
		        scrollTop: offset},
		        'slow');
		});

		$(document).ready(function() {
		   var windowH = $(window).height();
		   var stickToBot = windowH - 50;
		    console.log("stickToBot = "+stickToBot);
		    $('#nav-wrapper').css({'top': stickToBot + 'px'});
		   
		   $(window).scroll(function() {
		       var scrollVal = $(this).scrollTop();
		        if ( scrollVal > stickToBot ) {
		            $('#nav-wrapper').css({'position':'fixed','top' :'0px'});
		        } else {
		            $('#nav-wrapper').css({'position':'absolute','top': stickToBot +'px'});
		        }
		    });
		 });

	    var count;
    	var interval;
	    $("#arrow-left").on('mouseover', function() {
	        var div = $('.gallery-wrapper');

	        interval = setInterval(function(){
	            count = count || 1;
	            var pos = div.scrollLeft();
	            div.scrollLeft(pos - count);
	            console.log("scrolling left");
	        }, 7);
	    }).click(function() {
	        if (count < 6) {
	             count = count+1;
	        }
	    }).on('mouseout', function() {
	        // Uncomment this line if you want to reset the speed on out
	        // count = 0;
	        clearInterval(interval);
	    });


	    $("#arrow-right").on('mouseover', function() {
	        var div = $('.gallery-wrapper');

	        interval = setInterval(function(){
	            count = count || 1;
	            var pos = div.scrollLeft();
	            div.scrollLeft(pos + count);
	            console.log("scrolling right");
	        }, 7);
	    }).click(function() {
	        if (count < 6) {
	             count = count+1;
	        }
	    }).on('mouseout', function() {
	        // Uncomment this line if you want to reset the speed on out
	        // count = 0;
	        clearInterval(interval);
	    });

	}

	this.colorRandom = function() {
		var colorbank = ["#fbcf85",
						"#58A6CC",
						"#FD4778",
						"#C5D30F"];

		var min = 0;
		var max = colorbank.length - 1;

		var colorIndex = Math.floor(Math.random() * (max - min + 1)) + min;
		var color = colorbank[colorIndex];
		$(".ep-navsection").mouseover(function() {
			$(this).css("color", color);
			$(this).css("border-bottom", "solid 5px "+color);

		})
		$(".ep-navsection").mouseout(function() {
			$(this).css("color", "#fff");
			$(this).css("border-bottom", "solid 4px #778997");
		})

		$(".carousel-control").css("color", color);
		$("hr").css("border-top", "1px solid "+color);
		$(".artwork-subcat").css("border-bottom", "1px solid "+color);
		$("#flickr-link").css("color", color);
		$(".rand-color").css("color", color);
		$(".art-filter-tab").css("color", color);

		

	}

	this.parallax = function() {
	// console.log("in parallax");
    $.stellar.positionProperty.apple = {
        setTop: function($el, newTop, originalTop) {
            $el.css({
                'top': $el.hasClass('ep-header') ? originalTop - (newTop/2) : originalTop,
                'right': $el.hasClass('apple') ? originalTop - (newTop/2) : 0
            });
            // console.log("newTop = "+newTop);
            // console.log("originalTop = "+originalTop);
            // console.log("originalTop - newTop = "+(originalTop - (newTop)));
            // console.log("*********************");
        },
        setRight: function($el, newRight, originalRight) {
            $el.css('right', newRight);
            // console.log("newRight = "+newRight);
        }
    };
    
    $.stellar({
        
        horizontalScrolling: false,
        positionProperty: 'apple'
    });

		
	}
	
}


$(document).ready(function() {
    console.log( "ready!" );
    earthwatch.init();
});