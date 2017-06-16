(function( $ ) {
    $.widget( "ui.combobox", {
        _create: function() {
            var isselected = false,
                self = this,
                name_element = this.element,
                select = this.element.hide(),
                selected = select.children( ":selected" ),
                value = selected.val() ? selected.text() : "",
                ismultichoise = 'single',
                placeholder = this.element[0] && $(this.element[0]).attr('placeholder'),
                tabindex = this.element[0] && $(this.element[0]).attr('tabindex'),
                input = this.input = $( "<input info='"+ ismultichoise+"'>" ),
                arrId = ['cityList', 'cateList', 'location'];
            if (placeholder) {
                input.attr('placeholder', placeholder);
            }
            if (tabindex) {
                input.attr('tabindex', tabindex);
            }
            input.insertAfter( select )
            .val( value )
                //.css('width','230px')
            .autocomplete({
                delay: 0,
                minLength: 0,
                source: function( request, response ) {
                    var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
                    response( select.children( "option" ).map(function() {
                        var text = $( this ).text();
                        if ( this.value && ( !request.term || matcher.test(text) ) )
                            return {
                                label: text.replace(
                                    new RegExp(
                                        "(?![^&;]+;)(?!<[^<>]*)(" +
                                        $.ui.autocomplete.escapeRegex(request.term) +
                                        ")(?![^<>]*>)(?![^&;]+;)", "gi"
                                    ), "<strong>$1</strong>" ),
                                value: text,
                                option: this
                            };
                    }) );
                },
                select: function( event, ui ) {
                    ui.item.option.selected = true;
                    self._trigger( "selected", event, {
                        item: ui.item.option
                    });
                    if(ui.item.option.id!=""){
                        addIndustry($("#" + ui.item.option.id).val(),$("#" + ui.item.option.id).html());
                    }
                    isselected = true;
                },
                change: function( event, ui ) {
                    if ( !ui.item ) {
                        var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( $(this).val() ) + "$", "i" ),
                            valid = false;
                        select.children( "option" ).each(function() {
                            if ( $( this ).text().match( matcher ) ) {
                                this.selected = valid = true;
                                return false;
                            }
                        });
                        if ( !valid ) {
                            // remove invalid value, as it didn't match anything
                            $( this ).val( "" );
                            select.val( "" );
                            input.data( "autocomplete" ).term = "";
                            return false;
                        }
                    }
                }

            })
            .addClass("text")
            .removeClass("ui-autocomplete-input")
            .focus(function() {
                if(arrId.indexOf(name_element.attr('id')) > -1){
                    //input.val('');
                    if(!isselected){
                        input.autocomplete( "search", "" );
                    }
                }else if(name_element.val()<=0){
                    if ( input.autocomplete( "widget" ).is( ":visible" ) ) {
                        input.autocomplete( "close" );
                        return;
                    }

                    // pass empty string as value to search for, displaying all results
                    input.val('');
                    //input.select();
                    input.autocomplete( "search", "" );
                }else{
                    if(!isselected){
                        input.select();
                        input.autocomplete( "search", "" );
                    }
                    //input.select();
                }
                isselected = false;
            })
            .click(function() {
                //alert("abc");
                if(!isselected || $.browser.mozilla){
                    if(arrId.indexOf(name_element.attr('id')) > -1){
                        //input.val('');
                        input.autocomplete( "search", "" );
                    }else{
                        input.select();
                        input.autocomplete( "search", "" );
                    }
                }
                isselected = false;
            });

            input.data( "autocomplete" )._renderItem = function( ul, item ) {
                return $( "<li></li>" )
                    .data( "item.autocomplete", item )
                    .append( "<a>" + item.label + "</a>" )
                    .appendTo( ul );
            };
        },

        destroy: function() {
            this.input.remove();
            this.button.remove();
            this.element.show();
            $.Widget.prototype.destroy.call( this );
        }
    });
})( jQuery );
