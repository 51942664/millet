/**
 * Created by admin on 2017/9/17.
 */
var AboutCarouselBox = document.getElementById("About-carousel-box");
header();
//登录注册页面跳转
var signIn = document.getElementById("sign-in"),
    register = document.getElementById("register");
signIn.onclick = function () {
    location.href = "Login.html";
};
register.onclick = function () {
    location.href = "register.html";
};
//家电节点
var introduce = document.querySelector(".introduce");
//智能节点
var Intelligence = document.querySelector(".Intelligence");
//搭配节点
var collocation = document.querySelector(".collocation");
//配件节点
var Parts = document.querySelector(".parts");
//周边节点
var periphery = document.querySelector(".periphery");
//main中轮播节点
var LRcarousel = document.getElementById("About-carousel");
function header() {
getJson("javascripts/datas.json", function (response) {
    PrimaryNavigation(response);
    subnav(response);
    leftPrimaryNavigation(response);
    leftSubNav(response);
    AboutCarousel(AboutCarouselBox,response);
    //轮播图
    var owrap = document.querySelector(".wrap"),
        oprev = document.querySelector(".prev"),
        onext = document.querySelector(".next");
    var imgs = document.getElementsByClassName("imgs-box")[0].children,
        idots = document.getElementsByClassName("idots-box")[0].children;
//记录图片位置
    var img_idx = 0;
//记录动画执行状态
    var animation = false;
// 定时器(自动轮播)
    var timer = null;
// 显示默认图片
    tab();
// 自动轮播
    autoplay();
//添加点击事件
    oprev.onclick = function () {
        // 异常处理，如果当前正在执行图片过渡，则不做任何处理
        if (animation){
            return
        }
        img_idx = img_idx === 0 ? 5 : --img_idx;
        tab();
    };
    onext.onclick = function () {
        // 异常处理，如果当前正在执行图片过渡，则不做任何处理
        if (animation){
            return;
        }
        img_idx = img_idx === 5 ? 0 : ++img_idx;
        tab();
    };
//为原点添加点击事件
    for(var i = 0; i < idots.length; i++){
        idots[i].idx = i;
        idots[i].onclick = function () {
            if(animation || this.classList.contains('active')){
                return;
            }
            img_idx = this.idx;
            tab();
        }
    }
//    添加冒泡事件，做鼠标进入处理 函数不加括号为绑定事件；
    owrap.onmouseenter = stop;
    owrap.onmouseleave = autoplay;

//函数封装
    function tab() {
        animation = true;
        //异常处理
        for(var i = 0; i<imgs.length; i++){
            if (idots[i].classList.contains('active')){
                idots[i].classList.remove('active');
                fade(imgs[i],0);
                imgs[i].style.zIndex = '0';
                break
            }
        }
        idots[img_idx].classList.add("active");
        fade(imgs[img_idx],100,1000,function () {
            animation = false;
        });
        imgs[img_idx].style.zIndex = '1';
    }
//自动播放
    function autoplay() {
        timer = setInterval(function () {
            onext.onclick();
        },2000);
    }

//停止播放
    function stop() {
        clearInterval(timer);
    }
    /**
     *添加效果
     */

    function fade(element,target,duration,completed) {
        //设置默认值
        duration = duration ? duration : 1000;
        //获取透明度
        var curOpa = getCurrentOpacity();
        //计算偏移量
        var offset = target - curOpa;
        //设置间隔时间
        var interval = 30;
        //计算速度
        var speed = offset > 0 ? Math.ceil(offset / (duration / interval)): Math.floor(offset /(duration / interval));
        //执行过渡动画
        var t = setInterval(function () {
            //更新透明度
            curOpa = getCurrentOpacity();
            //帧动画条件
            if(offset > 0 && curOpa < target || (offset < 0 && curOpa > target)){
                //添加帧动画
                element.style.opacity = (curOpa + speed)/100
            }else{
                //停止动画
                element.style.opacity = target/100;
                clearInterval(t);
                if(completed){
                    completed();
                }
            }
        },interval);
        //透明值 // 非行间样式
        function getCurrentOpacity() {
            var curOpa = 0;
            if (element.currentStyle){
                curOpa = element.currentStyle['opacity']*100;
            }else{
                curOpa = getComputedStyle(element, null)['opacity']*100;
            }
            return curOpa;
        }
    }
    //调用左右轮播
    call();
    function call() {
        var hotBtn = document.querySelector(".hot-btn"),
             hotUl = document.getElementById("About-carousel-box").getElementsByTagName("ul")[0];
        Recommend(hotBtn,hotUl)
    }
},function () {
});
}
main();
function main() {
    getJson("javascripts/main.json", function (response) {
        addLi(introduce,response);
        update(introduce,response.goodsNav.commodity[0]);
    //    进行交互
        var tt_child = Array.prototype.slice.call(document.querySelector(".hot-title").children);
        tt_child.forEach(function (item,idx) {
            item.idx = idx;
            item.onmouseenter = function () {
                update(introduce,response.goodsNav.commodity[this.idx])
            }
        });
        //    智能调用
        addLi(Intelligence,response);
        update(Intelligence,response.Intelligence.commodity[0]);
        var Inter_tt = Array.prototype.slice.call(document.querySelector(".Intelligence-title").children);
        Inter_tt.forEach(function (item,idx) {
            item.idx = idx;
            item.onmouseenter = function () {
                update(Intelligence,response.Intelligence.commodity[this.idx])
            };
        });
        //    搭配调用
        addLi(collocation,response);
        update(collocation,response.collocation.commodity[0]);
        var coco_tt = Array.prototype.slice.call(document.querySelector(".collocation-title").children);
        coco_tt.forEach(function (item,idx) {
            item.idx = idx;
            item.onmouseenter = function () {
                update(collocation,response.collocation.commodity[this.idx])
            };
        });
        //配件
        addLi(Parts,response);
        update(Parts,response.parts.commodity[0]);
        var parts_tt = Array.prototype.slice.call(document.querySelector(".parts-title").children);
        parts_tt.forEach(function (item,idx) {
            item.idx = idx;
            item.onmouseenter = function () {
                update(Parts,response.parts.commodity[this.idx])
            };
        });
        //周边
        addLi(periphery,response);
        update(periphery,response.periphery.commodity[0]);
        var pphery_tt = Array.prototype.slice.call(document.querySelector(".periphery-title").children);
        pphery_tt.forEach(function (item,idx) {
            item.idx = idx;
            item.onmouseenter = function () {
                update(periphery,response.periphery.commodity[this.idx])
            };
        });
        //左右轮播
        AboutCarousel(LRcarousel,response);
        callSlide();
        function callSlide() {
            var hotClick = document.querySelector(".hot-click"),
                hotSlide = document.getElementById("About-carousel").getElementsByTagName("ul")[0];
            Recommend(hotClick,hotSlide)
        }

    },function () {
    });
}
video();
function video() {

    // 1、获取DOM元素
    var Videos = Array.prototype.slice.call(document.querySelectorAll('.video-item'));
    var A = Array.prototype.slice.call(document.querySelectorAll('.figure a'));
    var Titles = Array.prototype.slice.call(document.querySelectorAll('h3.video-title'));
    var Descs = Array.prototype.slice.call(document.querySelectorAll('p.desc'));

    var Close = document.querySelector('.video-close');
    var VideoMask = document.querySelector('.video-mask');
    var VideoShow = document.querySelector('.video-show');
    var VideoPlay = document.querySelector('.video-play');
    var Video = document.querySelector('video');
    getJson("javascripts/main.json", function (response) {
        var datas = response["infos"];
        Videos.forEach(function (video, idx) {
            // 加载视频列表缩略图
            A[idx].firstElementChild.src = "images/" + datas[idx]["imgName"];
            // 将弹框播放视频的背景图地址存储在a标签的自定义属性中
            A[idx].setAttribute("data-bgimg", datas[idx]["bgImgName"]);
            // 加载视频列表
            Titles[idx].textContent = datas[idx]["title"];
            // 加载视频列表子标题
            Descs[idx].textContent = datas[idx]["subTitle"];
        });
    }, function (errorStatus) {

    });

    // 3、点击链接显示视频窗口
    A.forEach(function (a, idx) {
        // 设置自定义下标属性用于获取数据
        a  .idx = idx;
        a.onclick = function () {
            // 加载视频背景图
            VideoShow.style.background = "url(images/" + this.getAttribute('data-bgimg') + ") no-repeat 50% 50%";
            // 更新视频连接
            Video.src = this.getAttribute("data-video");
            // 显示视频窗口
            VideoMask.style.display = "block";
        };
    });

    // 关闭视频窗口
    Close.onclick = function () {
        //先移除子元素，再移除父级元素
        // 暂停视频
        Video.pause();
        // 隐藏视频
        Video.style.display = "none";
        // 将播放按钮显示状态设置为block
        VideoPlay.style.display = "block";
        // 隐藏视频窗口
        VideoMask.style.display = "none";
    }
    // 点击播放视频
    VideoShow.onclick = function () {
        //影藏播放按钮
        VideoPlay.style.display = "none";
        //显示视频
        Video.style.display = "block";
        //play 播放视频 自带
        Video.play();
    }

}
//小轮播盒子调用
callSBC();
function callSBC() {
    var detailUl = document.querySelector(".detail-ul"),
        dotBox = document.querySelector(".dot-item-box"),
        obutton = document.querySelector(".obutton");

    var detailBox = document.querySelector(".detail-ul-box"),
        contentTheme = document.querySelector(".second-dots"),
        contentBtn = document.querySelector(".obutton-sd");

    var gameDeatil = document.querySelector(".list-th"),
        gameDot = document.querySelector(".dot-box"),
        gameBtm = document.querySelector(".obtn-box");

    var appDetail = document.querySelector(".detail-list-box"),
        appIdot = document.querySelector(".idot-box"),
        appBtn = document.querySelector(".app-btn");
    //第一个盒子
    SmallBoxCarousel(obutton,detailUl,dotBox);
    //第二个盒子
    SmallBoxCarousel(contentBtn,detailBox,contentTheme);
    //第三个盒子
    SmallBoxCarousel(gameBtm,gameDeatil,gameDot);
    //第四个盒子
    SmallBoxCarousel(appBtn,appDetail,appIdot);
}
// 获取回到顶部按钮
var oBackToTopBtn = document.getElementsByClassName('rocket-btn')[0];
var offset = 0;

/**
 * 事件添加
 */
// 窗口滚动，获取Y轴滚动部分的偏移
window.addEventListener( 'scroll', function () {
    // 兼容IE
    offset = document.body.scrollTop || document.documentElement.scrollTop;
    // 判断偏移的距离，显示回到顶部按钮
    oBackToTopBtn.style.display = offset > 1000 ? 'block' : 'none';
}, false);

oBackToTopBtn.addEventListener('click', function () {
    // 设置帧动画效果
    var duration = 1000;
    var interval = 20;
    var speed    = Math.ceil(offset / (duration / interval));
    // 定时器 setInterval
    var t = setInterval(function () {
        if(offset > 0) {
            // 帧动画开始
            document.body.scrollTop = document.documentElement.scrollTop = offset - speed;
        }else {
            // 帧动画结束
            // 清除定时器
            clearInterval(t);
            // 设置 `scrollTop = 0` 回到顶部
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
    }, interval);
}, false);

