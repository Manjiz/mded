## MDED

mded: 基于[pagedown](https://github.com/ujifgc/pagedown)根据[segmentfault](https://segmentfault.com/)样式制作的Markdown编辑器。

![images](capture.png)

注意：本项目不支持任何版本IE或IE内核的浏览器，如果正常，那也不奇怪。

## 编译

执行以下命令，编译至 dist 文件夹

``` bash
npm install && gulp
```

## 使用

### 引入样式文件

``` html
<link rel="stylesheet" href="mded.min.css">
```

### 引入脚本文件

``` html
<script src="mded.min.js"></script>
```

### 初始化编辑器

``` javascript
mded('domid', 'mypostfix', opts);
```

### 参数说明

- 'domid' - 必需，作为编辑器的一个 DOM 元素的 id
- 'mypostfix' - 可选，作为该编辑器的唯一标识的 id 后缀
- opts - 可选，编辑器的参数对象

	- helpButton 帮助按钮，不提供则不会显示

		- title - hover 时显示的字符串 - （✘ 不再支持这里设置，请前往strings里配置）
		- handler - 点击时触发的方法

	- strings - 相关文字配置
		
		- bold: 加粗，hover 时显示
		- boldexample: 默认插入的加粗文字
		- italic: 斜体，hover 时显示
		- italicexample: 默认插入的斜体文字
		- link: 链接，hover 时显示
		- linkdescription: 默认插入的链接描述文字
		- linkdialog: 插入链接弹框的标题文字
		- quote: 引用，hover 时显示
		- quoteexample: 默认插入的引用文字
		- code: 代码，hover 时显示
		- codeexample: 默认插入的代码
		- image: 图片，hover 时显示
		- imagedescription: 默认插入的图片描述文字
		- imagedialog: 插入图片弹框的标题文字
		- olist: 有序列表，hover 时显示
		- ulist: 普通列表，hover 时显示
		- litem: 默认插入的列表文字
		- heading: 标题，hover 时显示
		- headingexample: 默认插入的标题文字
		- hr: 分割线，hover 时显示
		- undo: 撤销，hover 时显示
		- redo: 重做，hover 时显示
		- redomac: 重做，hover 时显示
		- help: 帮助按钮，hover 时显示
		- fullscreen: 全屏，hover 时显示
		- editmode: 编辑模式，hover 时显示
		- livemode: 实时模式，hover 时显示
		- previewmode: 预览模式，hover 时显示


## 特别说明

我将把大量兼容古董浏览器的东西去掉，但为了尊重原作者，特把部分兼容代码或bug列出来给大家供奉。

### Chrome6/7 时代正则的一个bug

 - [http://meta.stackexchange.com/questions/63307/blockquote-glitch-in-editor-in-chrome-6-and-7/65985#65985](http://meta.stackexchange.com/questions/63307/blockquote-glitch-in-editor-in-chrome-6-and-7/65985#65985)

原代码：

``` javascript
if (navigator.userAgent.match(/Chrome/)) {
    "X".match(/()./);
}
this.selection = this.selection.replace(/(^\n*)/, "");
this.startTag = this.startTag + re.$1;
```

### 获取元素距离页面顶部的距离

原代码：

``` javascript
// 需要用到一个循环来逐层获取累加
var result = elem.offsetTop;
if (!isInner) {
    while (elem = elem.offsetParent) {
        result += elem.offsetTop;
    }
}
return result;
```

修改后代码：

``` javascript
return elem.getBoundingClientRect().top + document.documentElement.scrollTop;
```

### 蒙层

原作者设置了一个 absolute 的蒙层，然后用了段 JS 来计算页面高度以设置蒙层的高度，但是为何不用 fixed？我把样式从 JS 中抽出来了。

### 弹框的居中

同样，原作者用了JS来计算元素的高度，然后 `top:50%;margin-top:-halfofheight;` 这样居中；

我的做法是 `top:50%;transform:translate(0, -50%);`，如果不考虑那么多兼容，这是一件非常酸爽的事情。

gte IE9, gte FF3.5, gte Chrome4, gte Safari3.1, gte Opera10.5 才开始支持 transform（来自caniuse），而 3D Tranforms 则要更后得到支持。

### 选择的触发 - 未解之谜

我也和原作者一样困惑，为何执行创建弹框的函数createDialog后需要 `setTimeout(function() {...}, 0);` 来实现输入框文本的选择。

也许是插入 DOM 的时候有延迟吧，奇怪的是在 console 作测试的时候并没发生这种情况

### 预览框的 innerHTML 操作

原注释如下：

``` javascript
// IE doesn't let you use innerHTML if the element is contained somewhere in a table
// (which is the case for inline editing) -- in that case, detach the element, set the
// value, and reattach. Yes, that *is* ridiculous.
```

意思是，在IE中，如果一个元素包含在 table 里的任意位置，那么如果要给他设置 innerHTML 是不可能的，解决办法是，把元素移除，再设置 innerHTML，最后重新插进去。

（这是哪个版本的 IE？我没测试过，有兴趣的可以去试下）

### IE的textarea会在点击按钮的时候丢失selection

### 文本选择

两个标准：

#### IE 6/7/8

把HTML降格为普通文本操作，逻辑上就存在很大问题，对富文本的操作会麻烦很多。

`TextRange` 对象

``` javascript
var range = document.selection.createRange();
var editor = document.getElementById('editor');

// 选中目标所有文字
range.moveToElementText(editor);

// 抛弃选区结束位置
// 并不是简单地将结束位置移到开始位置
// 所以接下来改变开始位置，结束位置不会再改变
range.collapse();

// 把当前选区的结束位置后移16个字符
range.moveEnd('character', 16);

range.select();

// 要获取选区的信息不是很容易，需要用到个setEndPoint的方法，自己查去
```

#### 新标准

将操作精确到节点。

`Range` 对象

``` javascript
var editor = document.getElementById('editor');
var childNodes = editor.childNodes;
var selection = getSelection();
var range = document.reateRange();

// 第二个参数有两种意义
//  - 如果节点是文本，那第二个参数是第几个字符
//  - 如果节点是dom，那第二个参数是该dom子节点的索引
range.setStart(childNodes[2], 0);
range.setEnd(childNodes[3], 0);

// 移除selection中原有的所有range
selection.removeAllRanges();

selection.addRange(range);

// 获取信息也非常容易嘛
var s = selection;
// 分别是 开始对象，开始位置，结束对象，结束位置
console.log(s.anchorNode, s.anchorOffset, s.focusNode, s.focusOffset);
```

#### 其他

输入性节点对象的方法：

`inputElement.setSelectionRange(selectionStart, selectionEnd, [optional] selectionDirection);`

``` javascript
inputArea.selectionStart = 0;
inputArea.selectionEnd = 16;
```

参考：

 - [selection对象和range对象在不同浏览器上的操作差异](https://www.web-tinker.com/article/20027.html)
 - [MDN setSelectionRange](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange)