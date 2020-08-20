window.addEventListener('load', function() {
    // alert('hi');
    // 1.获取需要的元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    var focusWidth = focus.offsetWidth;
    var flog = true;
    // 2.将鼠标进入focus时显示左右两个按钮,离开时消失
    focus.addEventListener('mouseover', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timrs);
        times = null;
    });
    focus.addEventListener('mouseout', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timrs = setInterval(function() {
            // 手动调用点击事件
            arrow_r.click();
        }, 2000);
    });
    // 3.动态的生成li标点添加进ol里
    for (let i = 0; i < ul.children.length; i++) {
        // 3.1创建li
        var li = document.createElement('li');
        // 5.1将i作为li的自定义属性循环绑定
        li.setAttribute('index', i);
        // 3.2将li加入ol里
        ol.appendChild(li);
        // 3.3为每个li加上点击事件
        li.addEventListener('click', function() {
            // 3.4使用排他算法将所有的li去掉class
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            };
            // 3.5再将点击的这个li，class设为current
            this.className = 'current';
            // 5.使用动画函数将ul进行移动，不能用li
            // ul的距离就是将li的索引号*图片的宽度
            // 点击了某个li，就拿到它的索引号（index）
            var index = this.getAttribute('index');
            // 当点击了某个li就将这个li的索引号给num和circle
            num = index;
            circle = index;
            scrollt(ul, -index * focusWidth, function() {});
        })
    }
    // 4.使用className将ol里的第一个li设置成current
    ol.children[0].className = 'current'

    // 6.克隆第一张图片放到ul最后面
    var lili = ul.children[0].cloneNode(true);
    ul.appendChild(lili);

    // 7.点击右侧按钮，图片滚动一张
    var num = 0;
    var circle = 0;
    arrow_r.addEventListener('click', function() {
        if (flog) {
            flog = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            scrollt(ul, -num * focusWidth, function() {
                flog = true;
            });
            // 将li复原到0
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 9.清除其他li的current
            circleChange();
        }
    });
    // 8.点击左侧按钮，图片滚动一张
    arrow_l.addEventListener('click', function() {
        if (flog) {
            flog = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            scrollt(ul, -num * focusWidth, function() {
                flog = true;
            });
            // 将li复原到0
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            // 9.清除其他li的current
            circleChange();
        }
    });

    function circleChange() {
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''
        };
        ol.children[circle].className = 'current';
    };
    // 自动播放功能
    var timrs = setInterval(function() {
        // 手动调用点击事件
        arrow_r.click();
    }, 2000);
})