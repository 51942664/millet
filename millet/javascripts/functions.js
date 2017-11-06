/**
 * Created by admin on 2017/9/18.
 */
function getJson(url, success, fail) {
    // 1、创建请求
    var request = new XMLHttpRequest();
    // 2、配置请求
    request.open('GET', url, true);
    // 3、发送请求
    request.send(null);
    // 4、监听状态
    request.onreadystatechange = function () {
        // 判断是否请求成功
        if(request.readyState === 4 && request.status === 200) {
            // 请求成功
            // console.log(request.responseText);
            if(success) {
                // 解析json字符串
                var obj = JSON.parse(request.responseText);
                success(obj);
            }
        }else {
            // 请求失败
            if(fail) {
                fail(request.status);
            }
        }
    }
}
//获取一级导航
function PrimaryNavigation(json) {
    var Navigation = document.querySelector(".Primary-navigation-box");
    Navigation.innerHTML ='<ul class = "Primary-navigation"></ul>';
    var PrimaryNavigation = document.querySelector(".Primary-navigation");
    json.title.forEach(function (titles) {
        PrimaryNavigation.innerHTML +="<li class='nav-item'>"+ titles +"</li>"
    })
}
//获取二级导航
function subnav(json) {
    var nav = document.querySelector(".subnav");
    //获取元素
    var subElement = document.getElementsByClassName("nav-item");
    var subnav = document.querySelector(".subnav");
        //添加二级导航容器
        subnav.innerHTML =  '<div class="nav-items">'+
            '<ul class="children-list">'+
            '</ul></div>';
    //获取二级导航容器
        var childrenList = document.getElementsByClassName("children-list")[0],
            //获取一级导航长度
            navItem = document.querySelectorAll(".nav-item"),
            navItem_length = navItem.length;
            for(var i = 0; i <navItem_length; i++) {
                //存储列表项
                var currentList = navItem[i];
                //添加索引值
                currentList.idx = i;
                currentList.onmouseenter = function () {
                    nav.style.height = "201px";
                    nav.style.display = "block";
                    //获取数据及长度
                    var subnav = json.objectData[this.idx].objectData;
                    var str = "";
                    subnav.forEach(function (element) {
                        str += '<li class="first">' +
                            '<div class="flags flags-box">' + element.commodity + '</div>' +
                            '<div class="figure figure-thumb">' +
                            '<img src="' + element.photo + '"><div>' + element.name + '</div>' +
                            '<p>' + element.money + '</p>' + '</div></li>'
                    })
                    childrenList.innerHTML = str;
                    var flags = document.getElementsByClassName("flags"),
                        flags_length = flags.length;
                    for (var y = 0; y < flags_length; y++) {
                        var flags_val = flags[y].textContent;
                        if (flags_val === "") {
                            flags[y].classList.remove("flags-box");
                        }
                }

                };
                currentList.onmouseout = function () {
                    nav.style.display = "none";
                }
                }
    var PrimaryNavigation = document.querySelector(".Primary-navigation");
    var oLi = document.createElement("li");
    oLi.className = "nav-item";
    oLi.textContent = "服务";
    var last_li = document.createElement("li");
    last_li.className = "nav-item";
    last_li.textContent = "社区";
    PrimaryNavigation.appendChild(oLi);
    PrimaryNavigation.appendChild(last_li);
}
//设置左边的一级导航
function leftPrimaryNavigation(json) {
    var navBox = document.querySelector(".left-nav-box");
    navBox.innerHTML = "<ul class='navigation'></ul>";
    var navigation = document.querySelector(".navigation");
    json.titles.forEach(function (element) {
        navigation.innerHTML += '<li>' + element + '<i>&gt;</i></li>'
    })
}
//设置左边的二级导航
function leftSubNav(json) {
    //获取一级导航长度
    var navigation = document.querySelector(".navigation").children,
        navigation_length = navigation.length;
    //获取二级导航容器
    var leftSubNav = document.getElementsByClassName("left-subnav")[0];
    //循环绑定hover事件
    for(var i = 0; i < navigation_length; i++){
        //存储列表项
        var currentList = navigation[i];
        //添加索引值
        currentList.indedx = i;
        currentList.onmouseenter = function () {
            //获取数据
            var goodsNav = json.goodsNav[this.indedx].goodsNav;
            var liStr = "";
                goodsNav.forEach(function (element) {
                    liStr +='<li class="li">' +
                        '<a href="#">' +
                        '<img src="' + element.photo + '">' +
                        element.name +
                        '</a>' +
                            '<a class="border shopping">'+element.shopping +'</a>'+
                        '</li>';
                });
                leftSubNav.innerHTML = liStr;
            var shopping = document.getElementsByClassName("shopping");
            var arr_length = shopping.length;
            for(var y = 0; y < arr_length; y++){
                var shopping_val = shopping[y].textContent;
                if(shopping_val === ""){
                    shopping[y].classList.remove("border");
                }
            }
        };
    }
}
/**
 * 添加轮播数据
 */

function AboutCarousel(parent,json) {

    //添加ul列表
    parent.innerHTML = '<ul class="carousel-list"></ul>';
    //获取数据及长度
    var json_length = json.brand.length;
    //获取ul容器
    var carousel = parent.getElementsByClassName("carousel-list")[0];
    //定义一个变量，用于接收标签，利于优化
    var Str ="";
    for(var i = 0; i < json_length; i++){
        Str += '<li class="mouseenter">' +
            '<a href="#">'+'<img src ="'+ json.brand[i].photo+'">' +'</a>' +
            '<h3>'+ json.brand[i].name+'</h3>'+
            '<p class="activeity">'+ json.brand[i].animation+'</p>'+
            '<p>'+json.brand[i].Price+'</p>'+
            '</li>';
    }
    carousel.innerHTML = Str;
}


/**
 * main function
 *
 */
function addLi(parent,json) {
    //获取长度，添加Li
    var json_length = json.goodsNav.commodity[0].length -1;
    for(var i = 0; i < json_length; i++){
        parent.innerHTML += '<li class="detail mouseenter">' +
            '<div class="activity"></div>' +
            '<div class="picture-box">' +
            '<img src="">' +
            '</div>' +
            '<h3></h3>' +
            '<p></p>' +
            '<p class="price">' +
            '<span></span>' +
            '<span class="margin"></span>' +
            '</p>' +
            '<p></p>'+
            '<div class="box-animation">' +
            '<p></p>' +
            '<p></p>' +
            '</div>' +
            '</li>';
    }
    var oLi = document.createElement("li");
    oLi.className = "Enclosure mouseenter top";
    var last_li = document.createElement("li");
    last_li.className = "Enclosure last-box mouseenter bottom";
    parent.appendChild(oLi);
    parent.appendChild(last_li);
    var Enclosure = parent.querySelectorAll(".Enclosure");
    Enclosure[0].innerHTML ='<h3 class = "more"></h3>'+
        '<p class="Enclosure-price"></p>'+
        '<div>'+
        '<a href="#">'+
        '<img src="">'+
        '</a>'+
        '</div>';
    Enclosure[1].innerHTML ='<h3 class = "more"></h3>'+
        '<p class="Enclosure-price"></p>'+
        '<div>'+
        '<a href="#">'+
        '<img src="">'+
        '</a>'+
        '</div>'
}
function update(parent,datas) {
    //获取元素
    var oBoxItems = Array.prototype.slice.call(parent.children);
    var oTopBox = parent.querySelector('.top');
    var oBottomBox = parent.querySelector('.bottom');
    //遍历li元素
    oBoxItems.forEach(function (item,idx) {
        if(idx === 7 ){
        //更新最后两个li数据
            oTopBox.querySelector(".more").textContent = datas[idx]["top-Title"];
            oTopBox.querySelector(".Enclosure-price").textContent = datas[idx]["top-price"];
            oTopBox.querySelector("img").src = datas[idx]["top-imgName"];
        }else if(idx === 8){
            oBottomBox.querySelector(".more").textContent = datas[idx - 1]["bottom-Title"];
            oBottomBox.querySelector(".Enclosure-price").textContent = datas[idx - 1]["bottom-des"];
            oBottomBox.querySelector("img").src = datas[idx - 1]["bottom-img"];
        }else{
            //设置活动
            item.children[0].textContent = "";
            item.children[0].style.backgroundColor = "";
            if(datas[idx]["activity"]){
            item.children[0].textContent = datas[idx]["activity"];
            item.children[0].style.backgroundColor = datas[idx]["activity"] === "新品" ? "#83c44e" : "#e53935";
            }
            // // 设置图片
            item.children[1].querySelector("img").src = datas[idx]["photo"];
            // 设置标题
            item.children[2].textContent = datas[idx]["name"];
            // // 设置硬配
            item.children[3].textContent = datas[idx]["describe"];
            // // 设置价格
            item.children[4].querySelectorAll("span")[0].textContent = datas[idx]["Price"];
            item.children[4].querySelectorAll("span")[1].textContent = datas[idx]["pay"];
            //设置评论人数
            item.children[5].textContent = datas[idx]["appraise"];
        //    hover盒子
            item.children[6].querySelectorAll("p")[0].textContent = datas[idx]["comment"];
            item.children[6].querySelectorAll("p")[1].textContent = datas[idx]["from"];

        }
    })
}
//小盒子
function SmallBoxCarousel(btn,parent,Idots) {
    var index = 0;
    var animating = false;
    //获取左右按钮
    var oprev = btn.getElementsByClassName("oprev")[0],
        onext = btn.getElementsByClassName("onext")[0];
    //获取圆点
    var aIdots = Idots.getElementsByClassName("dot-item");
    //上一页
    oprev.onclick = function () {
        if(index === 0 || animating === true){
            return;
        }
        index--;
        tab(295);
        updateIdots();
    };
    //下一页
    onext.onclick = function () {
        if(index === parent.childElementCount - 1 || animating === true){
            return;
        }
        index++;
        tab(-295);
        updateIdots();
    };
    //圆点
    for(var i = 0; i < aIdots.length; i++){
        aIdots[i].idx = i;
        aIdots[i].onclick = function () {
            var offset = -295 * (this.idx - index);
            index = this.idx;
            tab(offset);
            updateIdots();
        }
    }
    //帧动画
    function tab(offset) {
        animating = true;
        //获取当前值(只获取一次,在定时器中更新)
        var left = parseInt(getstyle(parent, 'left')),
        //获取目标值
         desLeft = left + offset,
        //定义持续时间
         sumTime = 500,
        //定义每一帧的时长
         interval = 15,
        //获取帧数
         frames = sumTime / interval,
        //每一帧位移的距离
         distance = Math.ceil(offset / frames);
        //定时循环
        var t = setInterval(function () {
            //更新当前值
            left = parseInt(getstyle(parent, 'left'));
            if((offset > 0 && left < desLeft) || (offset < 0 && left > desLeft)){
                parent.style.left = left + distance + 'px';
            }else {
                clearInterval(t);
                animating = false;
                parent.style.left = desLeft + 'px';
            }
        },interval)
    }
    //更新小圆点
    function updateIdots() {
        for(var i = 0; i < aIdots.length; i++){
            if(aIdots[i].classList.contains('dot-active')){
                aIdots[i].classList.remove('dot-active');
                break;
            }
        }
        aIdots[index].classList.add("dot-active");
    }
//非行间样式
    function getstyle(element,attr) {
        if(element.currentStyle){
            return element.currentStyle[attr];
        }else {
            //getComputedStyle(元素，伪类，不是的话设置为null),获取元素的CSS样式声明对象
            return getComputedStyle(element,null)[attr];
        }
    }
}
//推荐轮播
function Recommend(hotBtn,parent) {
    //获取左右点击标签
    var oprev =hotBtn.querySelector(".left"),
        onext = hotBtn.querySelector(".right");
    //定义动画状态
    var animating = false;
    var index = 0;
    var timer = null;
    aotoplay();
    oprev.onclick = function () {
        if(animating || index === 0){
            return;
        }
        tab(1226);
        index++;
        onext.classList.add("left-color");
        oprev.classList.remove("right-color");
    };
    onext.onclick =function () {
        if(animating || index === -1){
            return;
        }
        tab(-1226);
        index--;
        oprev.classList.add("right-color");
        onext.classList.remove("left-color");
    };
    function tab(offset) {
        animating = true;
        //获取当前值(只获取一次,在定时器中更新)
        var left = parseInt(getstyle(parent, 'left')),
        //获取目标值
        desLeft = offset + left;
        //定义持续时间
        var sumTime = 500,
            //定义每一帧的时长
            interval = 15,
            //获取总帧数
            frames = sumTime / interval,
            //每一帧位移的距离
            distance = offset / frames;
        //动画轮播
        var t = setInterval(function () {
            //更新
            left = parseInt(getstyle(parent, 'left'));
            //判定
            if((offset > 0 && left < desLeft) || (offset < 0 && left > desLeft)){
                parent.style.left = left + distance + 'px';
            }else{
                clearInterval(t);
                animating = false;
                //更新位置，去除误差
                parent.style.left = desLeft;
                if(parseInt(getstyle(parent,'left'))<0){
                    parent.style.left = "-1226px";
                }else if(parseInt(getstyle(parent,'left'))> -1226){
                    parent.style.left = '0';
                }
            }
        },interval)
    }
    //非行间样式
    function getstyle(element,attr) {
        if(element.currentStyle){
            return element.currentStyle[attr];
        }else {
            //getComputedStyle(元素，伪类，不是的话设置为null),获取元素的CSS样式声明对象
            return getComputedStyle(element,null)[attr];
        }
    }
    //自动播放
    function aotoplay() {
        timer = setInterval(function () {
            if(index === 0){
                onext.onclick();
            }else if(index === -1){
                oprev.onclick();
            }
        },5000);
    }
}