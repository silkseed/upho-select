UphoSelect.prototype.hooks.init_markup.push(function () {
    if (!jQuery(this.root).hasClass('enhanced')) {
        jQuery(this.root).addClass('enhanced');
    }
    jQuery(this.root).append('<div class="ui-widget-container"><div class="ui-widget-box"></div></div>');
    var container = jQuery(this.root).find('.ui-widget-box');
    jQuery(container).append('<h2>' +
                             (jQuery(this.root).find('option:selected').text() ||
                              jQuery(this.root).find('option').first().text()) +
                             '</h2>');
    jQuery(container).append('<ul class="actions"></div>');
    jQuery(container).find('.actions').append('<li class="open"><a>+</a></li>');
    jQuery(container).find('.actions').append('<li class="close"><a>&times;</a></li>');
});


/* Build default unordered list  */
UphoSelect.prototype.hooks.init_markup.push(function () {
    var values = new Array();
    jQuery(this.root).find('option').each(function () {
        values.push({
            text: jQuery(this).text(),
            value: jQuery(this).val(),
            element: this
        });
    });
    if (!jQuery(this.root).find('ul.options-list').length) {
        jQuery(this.root).find('.ui-widget-container').append('<ul class="options-list"></ul>');
        var root = jQuery(this.root).find('ul.options-list').first();
        for (i in values) {
            jQuery(root).append('<li>' + values[i].text + '</li>');
            jQuery(root).children('li').last().data('element', values[i].element);
            jQuery(values[i].element).data('UphoSelect_list_element', jQuery(root).children('li').last());
            this.setup_event_bindings(values[i].element);
        }
    }
    jQuery(this.root).addClass('closed');
});


UphoSelect.prototype.hooks.add_option.push(function (option) {
    jQuery(this.root).find('select').append('<option value="' + option.value + '">' + 
                                            option.title + 
                                            '</option>');
    var element = {
        text: option.title,
        value: option.value,
        element: jQuery(this.root).find('option').last()
    };
    jQuery(this.root).find('ul.options-list').append('<li>' +
                                                     (option.content !== false && option.content || option.title) +
                                                     '</li>');
    jQuery(this.root).find('ul.options-list > li').last().data('element', element.element);
    jQuery(element.element).data('UphoSelect_list_element', 
                                 jQuery(this.root).find('ul.options-list > li').last());
    this.setup_event_bindings(jQuery(element.element));
});