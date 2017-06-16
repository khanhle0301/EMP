function tinimceInit(config) {
	if (tinyMCE) {
		var defaultConfig = {
			mode : "textareas",
			theme : "advanced",
			//plugins : "table,advhr,preview,searchreplace,print,paste,noneditable,contextmenu",
			paste_auto_cleanup_on_paste : true,
			paste_insert_word_content_callback : "convertWord",
			max_chars : 3000,
			theme_advanced_buttons1 : "code,separator,bold,italic,underline,separator,justifyleft,justifycenter,justifyright,justifyfull,separator,bullist,numlist,separator,outdent,indent,seperator,link,unlink",
			theme_advanced_buttons2 : "",
			theme_advanced_buttons3 : "",
			theme_advanced_toolbar_location : "top",
			theme_advanced_toolbar_align : "left",
			theme_advanced_statusbar_location : "bottom",
			theme_advanced_path : false,
			invalid_elements : "script",
			valid_elements : ""
							+"br,"
							+"i,u,b,"
							+"table[border=0|cellspacing|cellpadding|align|summary|dir|lang|bgcolor|background|bordercolor],"
							+"tr[lang|dir|rowspan|align|valign|bgcolor|background|bordercolor],"
							+"tbody,thead,tfoot,"
							+"td[lang|dir|colspan|rowspan|height|align|valign|bgcolor|background|bordercolor|scope],"
							+"th[lang|dir|colspan|rowspan|height|align|valign|scope],"
							+"ul,ol,li,"
							+"p[style|align|class],"
							+'span[class|style],'
							+'li[class|type],'
							+'ol[class|start|type],'
							+'strong/b[class],'
							+'em/i[class],'
							+'small[class],'
							+"div,"
							+"a[accesskey|charset|class|coords|dir<ltr?rtl|href|hreflang|id|lang|name"
							  +"|onblur|onclick|ondblclick|onfocus|onkeydown|onkeypress|onkeyup"
							  +"|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|rel|rev"
							  +"|shape<circle?default?poly?rect|style|tabindex|title|target|type],"
							+"textformat[blockindent|indent|leading|leftmargin|rightmargin|tabstops]",
			extended_valid_elements : "hr[class|width|size|noshade]",
			setup : function(ed) {
				if (config.type === 1) { // employer contact page
					ed.settings.theme_advanced_buttons1 = null;
					ed.settings.height = 203;
					ed.settings.body_class = 'customer-note-tiny';
					ed.onInit.add(function(ed, e) {
						$('.mceEditor div.inquiry_toolbargroup').remove();
						$('.mceEditor tr.mceLast').remove();
						$('.mceEditor td.mceIframeContainer > iframe').attr('tabindex', 6);
						$('.mceEditor tr.mceFirst td.mceToolbar').append('<div class="' + config.className + '">' + config.text + '</div>')
					});
				} else if (config.type === 2) {
					ed.onKeyUp.add(function(ed, e) {   
						var strip = (tinyMCE.activeEditor.getContent()).replace(/(<([^>]+)>)/ig,"");
						strip = strip.replace('&nbsp;','');
						var distance_length= tinyMCE.activeEditor.getContent().length - strip.length;
						max_chars = config.max_chars || 5000;
						remainChars = max_chars - strip.length;
						if(remainChars < 0){
							var total_length = distance_length + max_chars;
							var temp_value = (tinyMCE.activeEditor.getContent()).substring(total_length,tinyMCE.activeEditor.getContent().length);
							var strip_temp = temp_value.replace(/(<([^>]+)>)/ig,"");
							strip_temp = strip_temp.replace('&nbsp;','');
							temp_distance_length= temp_value.length - strip_temp.length;
							tinyMCE.activeEditor.setContent((tinyMCE.activeEditor.getContent()).substring(0,total_length-temp_distance_length));
							text = 'You have 0 characters remaining';
						} else {
							var text = 'You have '+ remainChars + ' characters remaining';
						}
						tinymce.DOM.setHTML(tinymce.DOM.get(tinyMCE.activeEditor.id + '_path_row'), text);
					});
				}
			}
		};
		/*
		 * overrideDefaultConfig: {
		 *	  mode: 'exact',
		 *	  elements : "whyWorkWithUs"
		 * }
		 */
		if (config.overrideDefaultConfig) {
			$.each(config.overrideDefaultConfig, function(key, value ) {
				defaultConfig[key] = value;
			});
		}
		tinyMCE.init(defaultConfig);
	}
}