function scrollt(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // if (callback) {
            //     callback();
            // }
            callback && callback();
        }
        var num = (target - obj.offsetLeft) / 10;
        num = num > 0 ? Math.ceil(num) : Math.floor(num);
        obj.style.left = obj.offsetLeft + num + 'px';

    }, 2);
};