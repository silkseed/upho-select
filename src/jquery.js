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