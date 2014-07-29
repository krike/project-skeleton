var my = my || {};

my.Crawler = {

	crawlBaseUrl: base_url + '/home/crawl/fetch',
	downloadBaseUrl: base_url + '/home/crawl/download',
	currentCrawler: '',

	init: function(){

		my.Crawler.currentCrawler = $('.sidebar-nav li.active').data('name');
		my.Crawler.crawlItems();
		$('.sidebar-nav li').on('click', my.Crawler.getNewCrawlerName);
		$(document).on('click', '.container-box a.download-image', my.Crawler.downloadImage);
		$(document).on('click', '.container-box a.view-image', my.Crawler.viewdImage);
	},
	getNewCrawlerName: function(){
		var crawlerItemEl = $(this);
		my.Crawler.currentCrawler = $(this).data('name');
		$('.sidebar-nav li.active').removeClass('active');
		crawlerItemEl.addClass('active');
		my.Crawler.crawlItems();
	},
	crawlItems: function(){
		var fetchFromEl = $('#fetchfrom');
		var fetchFromValue = 'nofetchfrom';
		if (fetchFromEl.val() != '' && fetchFromEl.val() != null) {
			fetchFromValue = fetchFromEl.val();
		}
		var containerEl = $('.container-box');
		containerEl.html('<img src="http://localhost/bitbucket-repos/crawler/resources/img/ajax-loader.gif" alt="loading ..." />');
		$.ajax({
		    type: "POST",
		    url: my.Crawler.crawlBaseUrl + '/' + my.Crawler.currentCrawler,
		    data: { fetchfrom: fetchFromValue },
		    success: function(data){
		    	
		        if(data.success){
		            containerEl.html(data.items);
		        } else {
		            containerEl.html('<div class="alert alert-error">' + data.message + '</div>');
		        }
		    }, 
		    error: function(request,error) 
			{
				containerEl.html('<div class="alert alert-error"> Can\'t do because: ' + error + '</div>');
			}
		});
	},
	downloadImage: function(){
		var imgEl = $(this);
		var imgPageSrc = imgEl.data('uri');
		
		if(typeof imgEl.attr('disabled') == 'undefined'){
			$('.feedback').html('Downloading...').fadeIn();
			$.ajax({
			    type: "POST",
			    url: my.Crawler.downloadBaseUrl + '/' + my.Crawler.currentCrawler,
			    data: {uri: imgPageSrc},
			    success: function(data){
			        if(data.success){
			            $('.feedback').css('background', '#F2DEDE').css('border', '1px solid #B94A48').css('color', '#B94A48').html('downloaded!').fadeOut();
			        } else {
			            $('.feedback').css('background', '#F2DEDE').css('border', '1px solid #B94A48').css('color', '#B94A48').html('Already downloaded!');
			        }
			        imgEl.attr('disabled', 'disabled');
			    }
			});
		}
		return false;
	},
	viewImage: function(){
		jQuery.fancybox({
		    href: 'http://rule34-data-005.paheal.net/_thumbs/3cf2f0417875dd641a1ecadd3e1393a6/thumb.jpg',
		    title : 'Custom Title'
		});
		/*var imgEl = $(this);
		var imgPageSrc = imgEl.data('uri');
		if(typeof imgEl.attr('disabled') == 'undefined'){
			$.ajax({
			    type: "POST",
			    url: my.Crawler.downloadBaseUrl + '/' + my.Crawler.currentCrawler,
			    data: {uri: imgPageSrc},
			    success: function(data){
			        if(data.success){
			            $.fancybox( '<div><h1>Lorem Lipsum</h1><p>Lorem lipsum</p></div>', {
						    title : 'Custom Title'
						});
			        } else {
			            alert('Something went wrong. Message: ' + data.message);
			        }
			    }
			});
		}
		*/
		return false;
	}
}//end of my.Crawler