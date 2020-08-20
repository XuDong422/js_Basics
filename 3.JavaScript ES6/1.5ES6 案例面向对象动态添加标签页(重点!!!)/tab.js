var than;
class Tab {
    constructor(id) {
        than = this;
        // 获取元素
        this.main = document.querySelector(id);
        // this.lis = this.main.querySelectorAll('li');
        // this.sections = this.main.querySelectorAll('section');
        this.tabadd = this.main.querySelectorAll('.tabadd');
        // li和section的父元素
        this.ul = this.main.querySelectorAll('.fisrstnav ul:first-child');
        this.div = this.main.querySelector('.tabscon');
        this.init();

    }
    init() {
            this.updateNode();
            // init 初始化操作让相关的元素绑定事件
            this.tabadd[0].onclick = this.addTab;
            for (let i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i;
                this.lis[i].onclick = this.toggleTab;
                this.remove[i].onclick = this.removeTab;
                this.spans[i].ondblclick = this.editTab;
                this.sections[i].ondblclick = this.editTab;
            }
        }
        // 1.切换功能
    toggleTab() {
            // console.log(than.tabadd[0]);
            than.clearClass(); // 因为点击标签就执行toggleTab()函数所以than.clearClass(); 放在这里
            this.className = 'liactive';
            than.sections[this.index].className = 'conactive';
        }
        // 2.添加功能
    addTab() {
            than.clearClass();

            var random = Math.random();
            // 1.创建li元素和section元素
            var lii = '<li class="liactive"><span>新选项卡1</span><span class="iconfont icon-guanbi"></span></li>';
            var section = '<section class="conactive">新内容' + random + '</section>';
            // 2.把元素追加到对应的父元素里
            than.ul[0].insertAdjacentHTML('beforeend', lii);
            than.div.insertAdjacentHTML('beforeend', section);
            // 更新li和section

            than.init();


            // alert(11);
            // 面向对象版 tab栏切换添加功能
            // 1.点击+可以实现添加新的选项卡和内容
            // 2.第一步:创建新的选项卡li和新的内容section
            // 3.第二步:把创建的两个元索追加到对应的父元素中.
            // 4.以前的做法:动态创建元素createElement ,但是元索里面内容较多需要innerHTML赋值在appendChild追加到父元素里面.
            // 5.现在高级做法:利用insertAdjacentHTML()可以直接把字符串格式元素添加到父元索中
            // 6. appendChild不支 持追加字符串的子元索insertAdjacentHTML支持追加字符串的元素
        }
        // 3.删除功能
    removeTab(e) {
            e.stopPropagation();
            var index = this.parentNode.index;
            // console.log(index);
            than.lis[index].remove();
            than.sections[index].remove();

            than.init();

            //当我们删除了选中状态的这个li的时候，让它的前一个1i处于选定状态
            if (document.querySelector('.liactive')) return;
            index--;
            than.lis[index] && than.lis[index].click();

            // 面向对象版 tab栏切换删除功能
            // 1. 点击x可以删除当前的Ii选项卡和当前的section
            // 2. X是没有索引号的, 但是它的父亲li有索引号这个索引号正是我们想要的索引号
            // 3. 所以核心思路是: 点击x号可以删除这个索引号号对应的li和section

        }
        // 4.修改功能
    editTab() {
            // 面向对象版tab栏切换编辑功能
            // 1. 双击选项卡li或者section里面的文字, 可以实现修改功能
            // 2. 双击事件是: ondblclick
            // 3. 如果双击文字， 会默认选定文字， 此时需要双击禁止选中文字
            // 4. window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            // 5. 核心思路: 双击文字的时候在里面生成一个文本框, 当失去焦点或者按下回车然后把文本框输入的值给原先元索即可.
            var str = this.innerHTML;
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            // alert(41);
            this.innerHTML = '<input type="text" />';
            var input = this.children[0];
            input.value = str;
            input.select(); // 让文本框里的文字默认处于选定状态
            input.onblur = function() {
                this.parentNode.innerHTML = this.value;
            };
            input.onkeyup = function(e) {
                if (e.keyCode === 13) {
                    this.blur();
                }
            }
        }
        // 5.清除功能 清除所有li和sections的类
    clearClass() {
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child')
    }
}
new Tab('#tab');