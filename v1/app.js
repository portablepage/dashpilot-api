$(document).ready(function(){
			
			get_data(1);
		
		});

		
		window.addEventListener("hashchange", get_data, false);
		
		function get_data(fadein){
			
			if(fadein=='1'){
			$('main').hide();
			}
			
			var page = get_page();
			
			window.page = page;
			
			$.getJSON( api_endpoint+"pages/"+page+".json", function( data ) {
				
			  json = data; // set globally
				
			  var items = [];
				
			  
				
			  $.each( data, (function( index ) {
				  
				  var item = data[index];
				  
				  if(item['layout']!==undefined){
					 var templ_id = item['layout'];
				  }
				  else{
					 var templ_id = 'default';
				  }
				  
				  if(item['column']!==undefined){
					 var col = item['column'];
				  }
				  else{
					 var col = 'main';
				  }
				  
				  var source   = document.getElementById(templ_id).innerHTML;  
				  var template = Handlebars.compile(source);
				  var html    = template(item);
				  
				 	
				  $(col).append(html);
				  
					// items.push(html);
				
			  }));

			 
			if(fadein=='1'){
				
				$('#page').fadeIn();	
				
				
				
			}
			
			
			// check if function exists
			if(typeof init === "function"){

				init();
			}
				
			});
		}

		function get_page(){
			
			var page = window.location.hash.substr(1).replace('/', ''); // set globally
			
			if(page==''){
			   page = 'index';
			}
			
			return page;
			
		}
