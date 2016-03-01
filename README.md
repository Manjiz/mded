## MDED

mded: 基于[pagedown](https://github.com/ujifgc/pagedown)根据[segmentfault](https://segmentfault.com/)样式制作的Markdown编辑器。

![images](capture.png)

## 编译

执行以下命令，编译至 dist 文件夹

``` bash
gulp
```

## 使用

### 引入样式文件

``` html
<link rel="stylesheet" href="css/mded.css">
```

### 引入脚本文件

``` html
<script src="js/mded.min.js"></script>
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

		- title - hover 时显示的字符串
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