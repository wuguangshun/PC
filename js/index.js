var oDiv = document.getElementById('div1');
var aDiv = oDiv.getElementsByClassName('cont');
var sDiv = oDiv.getElementsByClassName('mums');
var yDiv = oDiv.getElementsByClassName('sidebar');
var put = oDiv.getElementsByTagName('input');
for (var i = 0; i < aDiv.length; i++) {
    (function (index) {
        aDiv[i].onmouseover = function () {
            yDiv[index].style.display = 'block';
            utils.addClass(sDiv[index],'mumsL');
        };
        aDiv[i].onmouseleave = function () {
            yDiv[index].style.display = 'none';
            utils.removeClass(sDiv[index],'mumsL')
        }

    })(i);
}
//--------------------bannerStart-------------------------
(function () {
    var oBox = document.getElementById('box');
    var oBoxInner = oBox.getElementsByTagName('div')[0];
    var aDiv = oBoxInner.getElementsByTagName('div');
    var aImg = oBoxInner.getElementsByTagName('img');
    var oUl = oBox.getElementsByTagName('ul')[0];
    var aLi = oUl.getElementsByTagName('li');
    var aSpan = oUl.getElementsByTagName('span');
    var step = 0;
    var timer = null;
    oBoxInner.innerHTML += '<div><img src="img/banner2.JPG" alt=""/></div>';
    clearInterval(timer);
    timer = setInterval(autoMove, 3000);
    function autoMove() {
        if (step >= aImg.length - 1) {
            step = 0;
            utils.css(oBoxInner, 'top', 0);
        }
        step++;
        animate(oBoxInner, {top: -step * 160});
        bannerTip()
    }

    function bannerTip() {
        for (var i = 0; i < aLi.length; i++) {
            var tmpStep = step >= aLi.length ? 0 : step;
            aLi[i].className = i == tmpStep ? 'liS' : null;
        }
    }

    oBox.onmouseover = function () {
        clearInterval(timer);
    };
    oBox.onmouseout = function () {
        timer = setInterval(autoMove, 2000);
    };
    handleChange();
    function handleChange() {
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].index = i;
            aLi[i].onmouseenter = function () {
                step = this.index;
                animate(oBoxInner, {top: -step * 160})
                bannerTip();
            }
        }
    }
})();
//-----------------------------------chuanqStart----------------------
(function(){
    var aUl = document.getElementById('bannerB');
    var aLI = aUl.getElementsByTagName('li');
    for (var i = 0; i < aLI.length; i++) {
        move({
            ele: aLI[i]
        })
    }
    function hoverDir(obj, e) {
        //想用公式Math.atan2(y,x);
        var r = obj.offsetWidth/2;
        var x = obj.offsetLeft + r - e.pageX;
        var y = obj.offsetTop + r - e.pageY;
        return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;

    }
    function move(opt) {
        var qDiv = opt.ele;
        var effect = opt.effect || 0;
        var time = opt.time || 300;
        var aDiv = qDiv.getElementsByTagName('div')[0];

        qDiv.onmouseenter = function (e) {
            var n = hoverDir(this,e);
            switch (n) {
                case 0:
                    utils.css(aDiv, {left: 113, top: 0});
                    break;
                case 1:
                    utils.css(aDiv, {left: 0, top: 113});
                    break;
                case 2:
                    utils.css(aDiv, {left: -113, top: 0});
                    break;
                default :
                    utils.css(aDiv, {left: 0, top: -113});
                    break;
            }
            animate(aDiv, {left:0, top:0}, time, effect)
        };
        qDiv.onmouseleave = function (e) {
            var n = hoverDir(this, e);
            switch (n) {
                case 0:
                    animate(aDiv, {left: 113, top: 0}, time, effect);
                    break;
                case 1:
                    animate(aDiv, {left: 0, top: 113}, time, effect);
                    break;
                case 2:
                    animate(aDiv,{left:-113,top:0},time,effect);
                    break;
                default :
                    animate(aDiv,{left:0,top:-113},time,effect);
                    break;
            }
        }
    }

})();


//--------------------------hotJobStart---------------------------

(function () {
    var oUl = document.getElementById('job');
    var aLi = oUl.getElementsByTagName('li');
    var oDiv = document.getElementById('jobHot');
    var aUl = oDiv.getElementsByTagName('ul');
    for (var i = 0; i < aLi.length; i++) {
        (function(index){
            aLi[index].onclick=function(){
                for(var i=0; i<aUl.length; i++){
                    aLi[i].className='';
                    aUl[i].className='jobHot';

                }
                aLi[index].className='hotJob';
                aUl[index].className='';
            }
        })(i)
    }
})();
(function(){
    var oDiv=document.getElementById('backTop');
    window.onscroll=computedDisplay;
    function computedDisplay(){
        if(utils.win('scrollTop')>utils.win('clientHeight')){
            console.log(utils.win('clientHeight'));
            utils.removeClass(oDiv,'footerT')

        }
    }
    oDiv.onclick=function(){
       //this.style.display='none';
       window.onscroll=null;

       var target=utils.win('scrollTop');
       var duration=1000;
       var interval=10;
       var step=target/duration*interval;

       var timer=setInterval(function(){

           var curTop=utils.win('scrollTop');
           if(curTop<=0){
               clearInterval(timer);
               window.onscroll=computedDisplay;
               return;
           }
           curTop-=step;
           utils.win('scrollTop',curTop);
       },interval);
    }

})()
