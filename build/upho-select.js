var UphoSelect = function (root, selected_element) {
    var self = this;
    this.root = root;
    this.selected_element = selected_element;

    this.call_hook = function (hook, options) {
        console.log();
        for (hook_i in this.hooks[hook]) {
            this.hooks[hook][hook_i].apply(this, Array.prototype.slice.call(arguments, 1));
        }        
    };

    this.add_option = function (option) {
        var value = option.value || option
        this.call_hook('add_option', {
            value: value,
            title: option.title || value,
            content: option.content || false
        });
    };

    this.setup_event_bindings = function (element) {
        if (jQuery(element).data('element')) {
            element = jQuery(element).data('element');
        }
        jQuery(element).data('UphoSelect_list_element').bind('click', function () {
            self.call_hook('click_list_element', this);
        });
    };

    this.open = function () {
        if (jQuery(this.root).hasClass('closed')) {
            jQuery(this.root).removeClass('closed');
        }
        if (!jQuery(this.root).hasClass('open')) {
            jQuery(this.root).addClass('open');
        }
    };

    this.close = function (update) {
        if (jQuery(this.root).hasClass('open')) {
            jQuery(this.root).removeClass('open');
        }
        if (!jQuery(this.root).hasClass('closed')) {
            jQuery(this.root).addClass('closed');
        }
        if (update !== false) {
            this.update_title();
        }
    };

    this.update_title = function () {
        jQuery(this.root).find('.ui-widget-box > h2').text(
            jQuery(this.root).find('option:selected').text());
    };

    this.call_hook('init_markup');
    this.call_hook('init_events');
    jQuery(this.root).data('UphoSelect', this);
    jQuery(this.selected_element).data('UphoSelect', this);
    return this;
};
UphoSelect.prototype.hooks = {
    init_markup: new Array(),
    init_events: new Array(),
    add_option: new Array(),
    click_list_element: new Array()
};


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
UphoSelect.prototype.hooks.init_events.push(function () {
    jQuery(this.root).find('.ui-widget-container').bind('selectstart', function () {
        return false;
    });
});


UphoSelect.prototype.hooks.init_events.push(function () {
    var self = this;
    var root = this.root;
    jQuery(root).find('.actions > .open').bind('click', function () {
        self.open();
    });
    jQuery(root).find('.actions > .close').bind('click', function () {
        self.close();
    });
    jQuery(root).find('h2').bind('click', function () {
        self.open();
    });
});


UphoSelect.prototype.hooks.click_list_element.push(function (ui) {
    jQuery(jQuery(ui).data('element')).parents('select').find('option').attr('selected', '');
    jQuery(jQuery(ui).data('element')).attr('selected', 'selected');
    this.close();
});
jQuery.fn.uphoSelect = (function (options) {
    var o = {};
    jQuery.extend(o, options);
    return this.each(function () {
        var root = jQuery(this);
        if (!root.hasClass('.widget.select')) {
            root = root.parents('.widget.select');
        }
        new UphoSelect(root, this);
    });
});