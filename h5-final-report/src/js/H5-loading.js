var H5_loading = function(imgs, firstPage) {
    var id = this.id;
    if (this._imgs === undefined) { // 第一次进入
        this._imgs = (imgs || []).length;
        this._loaded = 0;

        // 吧当前对象存储在全局对象 window 中，用来进行某个图片的加载完成之后的回调
        window[id] = this;
        for (s in imgs) {
            var item = imgs[s],
                img = new Image();
            img.onload = function() {
                window[id].loader();
            }
            img.src = item;
        }
        $('#rate').text('0%');
        return this;
    } else {
        this._loaded++;
        $('#rate').text(((this._loaded / this._imgs * 100) >> 0) + '%');
        if (this._loaded < this._imgs) {
            return this;
        }
    }
    window[id] = null;
    this.el.fullpage({
        onLeave: function(index, nextIndex, direction) {
            $(this).find('.h5_component').trigger('onLeave');
        },
        afterLoad: function(anchorLink, index) {
            $(this).find('.h5_component').trigger('onLoad');
        }
    })
    this.page[0].find('.h5_component').trigger('onLoad');
    this.el.show();
    if (firstPage) {
        $.fn.fullpage.moveTo(firstPage);
    }
}