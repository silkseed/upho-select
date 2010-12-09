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


//#import "markup.js"
//#import "events.js"
//#import "jquery.js"