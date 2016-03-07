;(function() {
    'use strict';

    var root = this;

    var editor,
        converter = new Markdown.Converter(),
        editorOpts = {
            helpButton: {
                title: 'Markdown 语法',
                handler: function() {
                    //--------------------------------------------------
                    alert("详查 Markdown 语法");
                    //--------------------------------------------------
                }
            },
            strings: {
                bold: "加粗 <strong> Ctrl+B",
                boldexample: "加粗文字",
                italic: "斜体 <em> Ctrl+I",
                italicexample: "斜体文字",
                link: "链接 <a> Ctrl+L",
                linkdescription: "enter link description here",
                linkdialog: '插入链接',
                quote: "引用 <blockquote> Ctrl+Q",
                quoteexample: "引用文字",
                code: "代码 <pre><code> Ctrl+K",
                codeexample: "请输入代码",
                image: "图片 <img> Ctrl+G",
                imagedescription: "enter image description here",
                imagedialog: "<p>插入图片</p>",
                olist: "有序列表 <ol> Ctrl+O",
                ulist: "普通列表 <ul> Ctrl+U",
                litem: "列表项目",
                heading: "标题 <h1>/<h2> Ctrl+H",
                headingexample: "标题文字",
                hr: "分割线 <hr> Ctrl+R",
                undo: "撤销 - Ctrl+Z",
                redo: "重做 - Ctrl+Y",
                redomac: "重做 - Ctrl+Shift+Z",
                help: "Markdown 语法",    // 优先
                fullscreen: "全屏",
                editmode: '编辑模式',
                livemode: '实时模式',
                previewmode: "预览模式"
            }
        },
        idPostfix = 'demo';

    /**
     * @param domId
     * @param postfix
     * @param opts
     */
    var mded = function(domId, postfix, opts) {
        if(!domId) return;

        var dom = document.getElementById(domId);
        if(!dom) return;

        postfix = postfix || idPostfix;
        opts = opts || editorOpts;

        dom.setAttribute('class', 'mded editMode');

        var toolbar = document.createElement('div');
        toolbar.setAttribute('class', 'mded-toolbar');
        toolbar.setAttribute('id', 'wmd-button-bar-'+postfix);
        dom.appendChild(toolbar);

        var wmd = document.createElement('div');
        wmd.setAttribute('class', 'wmd');
        dom.appendChild(wmd);
            var wmdInput = document.createElement('textarea');
            wmdInput.setAttribute('class', 'wmd-input');
            wmdInput.setAttribute('id', 'wmd-input-'+postfix);
            wmd.appendChild(wmdInput);
            var wmdPreview = document.createElement('div');
            wmdPreview.setAttribute('class', 'wmd-preview');
            wmd.appendChild(wmdPreview);
                var wmdPreviewCont = document.createElement('div');
                wmdPreviewCont.setAttribute('class', 'wmd-preview-cont');
                wmdPreviewCont.setAttribute('id', 'wmd-preview-'+postfix);
                wmdPreview.appendChild(wmdPreviewCont);

        var resize = document.createElement('div');
        resize.setAttribute('class', 'mded-resize');
        resize.innerHTML = '调整高度';
        dom.appendChild(resize);

        editor = new Markdown.Editor(converter, '-'+postfix, opts);
        editor.run();

        document.getElementById('wmd-editmode-button-'+postfix).addEventListener('click', function() {
            dom.classList.remove('liveMode');
            dom.classList.remove('previewMode');
            dom.classList.add('editMode');
        }, false);
        document.getElementById('wmd-livemode-button-'+postfix).addEventListener('click', function() {
            dom.classList.remove('editMode');
            dom.classList.remove('previewMode');
            dom.classList.add('liveMode');
        }, false);
        document.getElementById('wmd-previewmode-button-'+postfix).addEventListener('click', function() {
            dom.classList.remove('editMode');
            dom.classList.remove('liveMode');
            dom.classList.add('previewMode');
        }, false);
        document.getElementById('wmd-fullscreen-button-'+postfix).addEventListener('click', function() {
            dom.classList.toggle('fullscreenMode');
        }, false);

        // delete root.mded;
    }

    // -------------------------------------------------------
    if(typeof exports !== 'undefined') {
        if(typeof module !== 'undefined' && module.exports) {
            exports = module.exports = mded;
        }
        exports.mded = mded;
    } else if (typeof define === 'function' && define.amd) {
        define('underscore', function() {
            return mded;
        })
    } else {
        root.mded = mded;
    }
}).call(this);