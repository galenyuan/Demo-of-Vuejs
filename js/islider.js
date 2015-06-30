/**
 * iSlider 高性能全屏滑动组件 
 * @class iSlider
 * @param {object} opts
 * @param {string} opts.wrap='.wrap' 容器 
 * @param {string} opts.item='.item'  滚动单元的元素
 * @param {string} opts.playClass='play'  触发播放动画的class
 * @param {number} [opts.index=0]  设置初始显示的页码
 * @param {array} [opts.noslide=[]]  设置禁止滑动的页面序号(0开始), 禁止后 需要开发者手动绑定页面中的某个按钮事件进行滑动 
 * @param {number} [opts.speed=400] 动画速度 单位:ms
 * @param {number} [opts.triggerDist=30] 触发滑动的手指移动最小位移 单位:像素
 * @param {boolean} [opts.isVertical=true] 是否是垂直滑动 默认是.  设成false为水平滑动.
 * @param {boolean} [opts.useACC=true] 是否启用硬件加速 默认启用
 * @param {boolean} [opts.fullScr=true] 是否是全屏的 默认是. 如果是局部滑动,请设为false
 * @param {boolean} [opts.preventMove=false] 是否阻止系统默认的touchmove移动事件,  默认不阻止, 该参数仅在局部滚动时有效,   如果是局部滚动 如果为true 那么在这个区域滑动的时候 将不会滚动页面.  如果是全屏情况 则会阻止
 * @param {boolean} [opts.lastLocate=true] 后退后定位到上次浏览的位置 默认true
 * @param {function} [opts.onslide]  滑动后回调函数  会回传index参数
 * @param {array} [opts.loadingImgs]  loading需要加载的图片地址列表
 * @param {function} [opts.onloading]  loading时每加载完成一个图片都会触发这个回调  回调时参数值为 (已加载个数,总数)
 * @param {number} [opts.loadingOverTime=15]  预加载超时时间 单位:秒
 * @desc 
-  如丝般高性能全屏动画滑屏组件, 主要应用于微信H5宣传页,海报,推广介绍等场景. 基于iSlider,可以快速搭建效果炫丽的H5滑屏页面.
-  简洁,易用.  无css依赖.
-  专注于页面滑动, 没有冗余代码 , 保证性能.
-  组件没有任何依赖.
-  imgcache 引用地址 : http://imgcache.gtimg.cn/music/h5/lib/js/module/iSlider-1.0.min.js?_bid=363&max_age=2592000
-  github: https://github.com/kele527/iSlider
 * @example
    //极简用法
    new iSlider(); //容器默认是 .wrap  元素默认是 .item   动画播放class默认是 play
    //普通用法
    new iSlider({
        wrap:'.wrap',
        item:'.item',
        playClass:'play',
        onslide:function (index) {
            console.info(index)
        }
    });
    //带loading进度条用法
    new iSlider({
        wrap:'.wrap',
        item:'.item',
        playClass:'play',
        onslide:function (index) {
            console.info(index)
        },
        loadingImgs:[
            'http://imgcache.gtimg.cn/mediastyle/mobile/event/20141118_ten_jason/img/open_cover.jpg?max_age=2592000',
            'http://imgcache.gtimg.cn/mediastyle/mobile/event/20141118_ten_jason/img/im_cover.jpg?max_age=2592000',
            'http://imgcache.gtimg.cn/mediastyle/mobile/event/20141118_ten_jason/img/bg1.jpg?max_age=2592000',
            'http://imgcache.gtimg.cn/mediastyle/mobile/event/20141118_ten_jason/img/bg2.jpg?max_age=2592000'
        ],
        onloading:function (loaded,total) {
            this.$('#loading div').style.width=loaded/total*100+'%';
            if (loaded==total) {
                this.$('#loading').style.display="none"
            }
        }
    });
    demo http://kele527.github.io/iSlider/demo1.html
 * @date 2014/11/3 星期一
 * @author rowanyang
 * 
 */
function iSlider(a){this.opts={wrap:".wrap",item:".item",playClass:"play",index:0,noslide:[],speed:400,triggerDist:30,isVertical:!0,useACC:!0,fullScr:!0,preventMove:!1,lastLocate:!0,loadingImgs:[],onslide:function(){},onloading:function(){},loadingOverTime:15};for(var b in a)this.opts[b]=a[b];this.init()}iSlider.prototype={wrap:null,index:0,length:0,_tpl:[],_delayTime:150,_sessionKey:location.host+location.pathname,_prev:null,_current:null,_next:null,$:function(a,b){return(b||document).querySelector(a)},addClass:function(a,b){a.classList?a.classList.add(b):a.className+=" "+b},removeClass:function(a,b){a.classList?a.classList.remove(b):a.className=a.className.replace(new RegExp("\\s*\\b"+b+"\\b","g"),"")},init:function(){var b,c,d;if(this.wrap="string"==typeof this.opts.wrap?this.$(this.opts.wrap):this.opts.wrap,this._sessionKey=btoa(encodeURIComponent(this._sessionKey+this.wrap.id+this.wrap.className)),b=parseInt(sessionStorage[this._sessionKey]),this.index=(this.opts.lastLocate&&b>=0?b:0)||this.opts.index||0,!this.wrap)throw Error('"wrap" param can not be empty!');for(this._tpl=this.wrap.cloneNode(!0),this._tpl=this.opts.item?this._tpl.querySelectorAll(this.opts.item):this._tpl.children,c=0;c<this._tpl.length;c++)this._tpl[c].style.cssText+="display:block;position:absolute;left:0;top:0;width:100%;height:100%";this.length=this._tpl.length,this.touchInitPos=0,this.startPos=0,this.totalDist=0,this.deltaX1=0,this.deltaX2=0,this.opts.fullScr&&(d=document.createElement("style"),d.innerHTML="html,body{width:100%;height:100%;overflow:hidden}",document.head.appendChild(d),d=null),this.wrap.style.cssText+="display:block;position:relative;"+(this.opts.fullScr?"width:100%;height:100%":""),this.displayWidth=this.wrap.clientWidth,this.displayHeight=this.wrap.clientHeight,this.scrollDist=this.opts.isVertical?this.displayHeight:this.displayWidth,this._setHTML(),this.opts.loadingImgs&&this.opts.loadingImgs.length?this._loading():this._pageInit(),/iPhone|iPod|iPad/.test(navigator.userAgent)&&(this._delayTime=50),this._bindEvt()},_bindEvt:function(){var a=this,b=this.opts.fullScr?this.$("body"):this.wrap;b.addEventListener("touchstart",function(b){a._touchstart(b)},!1),b.addEventListener("touchmove",function(b){a._touchmove(b)},!1),b.addEventListener("touchend",function(b){a._touchend(b)},!1),b.addEventListener("touchcancel",function(b){a._touchend(b)},!1),(this.opts.fullScr||this.opts.preventMove)&&b.addEventListener("touchmove",function(a){a.preventDefault()},!1)},_setHTML:function(a){a>=0&&(this.index=parseInt(a)),this.wrap.innerHTML="";var b=document.createDocumentFragment();this.index>0?(this._prev=this._tpl[this.index-1].cloneNode(!0),this._prev.style.cssText+=this._getTransform("-"+this.scrollDist+"px"),b.appendChild(this._prev)):this._prev=null,this._current=this._tpl[this.index].cloneNode(!0),this._current.style.cssText+=this._getTransform(0),b.appendChild(this._current),this.index<this.length-1?(this._next=this._tpl[this.index+1].cloneNode(!0),this._next.style.cssText+=this._getTransform(this.scrollDist+"px"),b.appendChild(this._next)):this._next=null,this.wrap.appendChild(b)},_pageInit:function(){var a=this;setTimeout(function(){a.addClass(a._current,a.opts.playClass);try{a.opts.onslide.call(a,a.index)}catch(b){console.info(b)}},this._delayTime)},_touchstart:function(a){var b=this;1===a.touches.length&&(this.lockSlide=!1,this._touchstartX=a.touches[0].pageX,this._touchstartY=a.touches[0].pageY,this.touchInitPos=this.opts.isVertical?a.touches[0].pageY:a.touches[0].pageX,this.deltaX1=this.touchInitPos,this.startPos=0,this.startPosPrev=-this.scrollDist,this.startPosNext=this.scrollDist,this._next&&(b._next.style.cssText+="-webkit-transition-duration:0;"),b._current.style.cssText+="-webkit-transition-duration:0;",this._prev&&(b._prev.style.cssText+="-webkit-transition-duration:0;"))},_touchmove:function(a){var c,d,e,f,b=a.target;do b=b.parentNode;while(b!=this.wrap);if((b||a.target==this.wrap)&&(c=this,1===a.touches.length&&!this.lockSlide))return d=Math.abs(a.touches[0].pageX-this._touchstartX),e=Math.abs(a.touches[0].pageY-this._touchstartY),d>e&&this.opts.isVertical?(this.lockSlide=!0,void 0):e>d&&!this.opts.isVertical?(this.lockSlide=!0,void 0):(this.opts.noslide&&this.opts.noslide.indexOf(this.index)>=0&&a.touches[0].pageY-this._touchstartY<0||(f=this.opts.isVertical?a.touches[0].pageY:a.touches[0].pageX,this.deltaX2=f-this.deltaX1,this.totalDist=this.startPos+f-this.touchInitPos,c._current.style.cssText+=this._getTransform(this.totalDist+"px"),this.startPos=this.totalDist,this.totalDist<0?this._next&&(this.totalDist2=this.startPosNext+f-this.touchInitPos,c._next.style.cssText+=this._getTransform(this.totalDist2+"px"),this.startPosNext=this.totalDist2):this._prev&&(this.totalDist2=this.startPosPrev+f-this.touchInitPos,c._prev.style.cssText+=this._getTransform(this.totalDist2+"px"),this.startPosPrev=this.totalDist2),this.touchInitPos=f),void 0)},_touchend:function(){this.deltaX2<-this.opts.triggerDist?this.next():this.deltaX2>this.opts.triggerDist?this.prev():this._itemReset(),this.deltaX2=0},_getTransform:function(a){var b=this.opts.isVertical?"0,"+a:a+",0";return";-webkit-transform:"+(this.opts.useACC?"translate3d("+b+",0)":"translate("+b+")")},_itemReset:function(){var a=this;a._current.style.cssText+="-webkit-transition-duration:"+this.opts.speed+"ms;"+this._getTransform(0),a._prev&&(a._prev.style.cssText+="-webkit-transition-duration:"+this.opts.speed+"ms;"+this._getTransform("-"+this.scrollDist+"px")),a._next&&(a._next.style.cssText+="-webkit-transition-duration:"+this.opts.speed+"ms;"+this._getTransform(this.scrollDist+"px")),this.deltaX2=0},_loading:function(){function i(){try{a.opts.onloading.call(a,e,f)}catch(b){}e==f&&(c&&clearTimeout(c),a._pageInit(),d=null,a.opts.preLoadingImgs&&a.opts.preLoadingImgs.length&&a.preloading())}var g,a=this,b=this.opts.loadingImgs,c=setTimeout(function(){try{a.opts.onloading.call(a,f,f)}catch(b){}a._pageInit()},1e3*this.opts.loadingOverTime),d=[],e=1,f=b.length+1;for(g=0;g<b.length;g++)d[g]=new Image,d[g].src=b[g],d[g].onload=d[g].onerror=d[g].onabort=function(a){e++,this.src===b[0]&&"load"===a.type&&clearTimeout(c),i(),this.onload=this.onerror=this.onabort=null};try{a.opts.onloading.call(a,1,f)}catch(h){}},prev:function(){var a=this;return this._current&&this._prev?this.index>0?(this.index--,this._next&&this.wrap.removeChild(this._next),this._next=this._current,this._current=this._prev,this._prev=null,this._next.style.cssText+="-webkit-transition-duration:"+this.opts.speed+"ms;"+this._getTransform(this.scrollDist+"px"),this._current.style.cssText+="-webkit-transition-duration:"+this.opts.speed+"ms;"+this._getTransform(0),sessionStorage[this._sessionKey]=this.index,setTimeout(function(){a.$("."+a.opts.playClass,a.wrap)&&a.removeClass(a.$("."+a.opts.playClass,a.wrap),a.opts.playClass),a.addClass(a._current,a.opts.playClass);try{a.opts.onslide.call(a,a.index)}catch(b){console.info(b)}var c=a.index-1;return 0>c?(c=a.length-1,!1):(a._prev=a._tpl[c].cloneNode(!0),a._prev.style.cssText+="-webkit-transition-duration:0ms;"+a._getTransform("-"+a.scrollDist+"px"),a.wrap.insertBefore(a._prev,a._current),void 0)},this._delayTime),void 0):(this._itemReset(),!1):(this._itemReset(),void 0)},next:function(){var a=this;return this._current&&this._next?this.index<this.length-1?(this.index++,this._prev&&this.wrap.removeChild(this._prev),this._prev=this._current,this._current=this._next,this._next=null,this._prev.style.cssText+="-webkit-transition-duration:"+this.opts.speed+"ms;"+this._getTransform("-"+this.scrollDist+"px"),this._current.style.cssText+="-webkit-transition-duration:"+this.opts.speed+"ms;"+this._getTransform(0),sessionStorage[this._sessionKey]=this.index,setTimeout(function(){a.$("."+a.opts.playClass,a.wrap)&&a.removeClass(a.$("."+a.opts.playClass,a.wrap),a.opts.playClass),a.addClass(a._current,a.opts.playClass);try{a.opts.onslide.call(a,a.index)}catch(b){console.info(b)}var c=a.index+1;return c>=a.length?!1:(a._next=a._tpl[c].cloneNode(!0),a._next.style.cssText+="-webkit-transition-duration:0ms;"+a._getTransform(a.scrollDist+"px"),a.wrap.appendChild(a._next),void 0)},this._delayTime),void 0):(this._itemReset(),!1):(this._itemReset(),void 0)},slideTo:function(a){this._setHTML(a),this._pageInit()}},"object"==typeof module?module.exports=iSlider:window.iSlider=iSlider;