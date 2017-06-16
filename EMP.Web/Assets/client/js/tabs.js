var currTab = 'poll';
function ChangeTab(tab_name) {
	var arr_tab = new Array('poll','presscenter');
	var tab_prefix = 'tab_';
	var img_prefix = 'img_';
	var img_select = '_select';
	var total = arr_tab.length;
	var tbl;
	for (var i=0; i<total; i++) {
		tbl = document.getElementById(tab_prefix + arr_tab[i]);
		if (tbl == null) continue;
		tbl.style.display = 'none';
		img = document.getElementById(img_prefix + arr_tab[i]);
		if (img == null) continue;
		img.style.display = '';
		img = document.getElementById(img_prefix + arr_tab[i] + img_select);
		if (img == null) continue;
		img.style.display = 'none';
	}

	tbl = document.getElementById(tab_prefix + tab_name);
	if (tbl != null) tbl.style.display = '';
	img = document.getElementById(img_prefix + tab_name);
	if (img != null) img.style.display = 'none';
	img = document.getElementById(img_prefix + tab_name + img_select);
	if (img != null) img.style.display = '';

	currTab = tab_name;
}

//*********************************************************************
var currTab1 = 'career';
function ChangeTab1(tab_name) {
	var arr_tab = new Array('career','testimonial');
	var tab_prefix = 'tab_';
	var img_prefix = 'img_';
	var img_select = '_select';
	var total = arr_tab.length;
	var tbl;
	for (var i=0; i<total; i++) {
		tbl = document.getElementById(tab_prefix + arr_tab[i]);
		if (tbl == null) continue;
		tbl.style.display = 'none';
		img = document.getElementById(img_prefix + arr_tab[i]);
		if (img == null) continue;
		img.style.display = '';
		img = document.getElementById(img_prefix + arr_tab[i] + img_select);
		if (img == null) continue;
		img.style.display = 'none';
	}

	tbl = document.getElementById(tab_prefix + tab_name);
	if (tbl != null) tbl.style.display = '';
	img = document.getElementById(img_prefix + tab_name);
	if (img != null) img.style.display = 'none';
	img = document.getElementById(img_prefix + tab_name + img_select);
	if (img != null) img.style.display = '';

	currTab1 = tab_name;
}

//*********************************************************************