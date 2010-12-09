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


/* create click-away curtain */
UphoSelect.prototype.hooks.on_open.push(function () {
    jQuery('.ui-curtain.UphoSelect').click();
    jQuery('body').append('<div class="ui-curtain UphoSelect"></div>');
    if (!jQuery(this.root).hasClass('ui-curtain-floater')) {
        jQuery(this.root).addClass('ui-curtain-floater');
    }
    var self = this;
    jQuery('.ui-curtain.UphoSelect').bind('click', function () {
        self.close();
    });
});


/* destroy click-away curtain */
UphoSelect.prototype.hooks.on_close.push(function () {
    jQuery('.ui-curtain.UphoSelect').remove();
    if (jQuery(this.root).hasClass('ui-curtain-floater')) {
        jQuery(this.root).removeClass('ui-curtain-floater');
    }
});