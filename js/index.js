window.addEventListener('load', function() {
    //获取元素
    const arrow_l = document.querySelector('.arrow-l')
    const arrow_r = document.querySelector('.arrow-r')
    const focus = document.querySelector('.focus')
    var focusWidth = focus.offsetWidth //图片的宽度
    var circle = 0 //控制小圆圈的变化



    //1.鼠标移动显示隐藏小按钮start
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block'
        arrow_r.style.display = 'block'
        clearInterval(timer)
        timer = null
    })
    focus.addEventListener('mouseleave', function() {
            arrow_l.style.display = 'none'
            arrow_r.style.display = 'none'
            timer = setInterval(function() {
                arrow_r.click() //手动调用点击事件
            }, 2000)
        })
        //1.鼠标移动显示隐藏小按钮end





    //2.动态生成小圆圈start
    var ul = document.querySelector('.focus ul')
    var ol = document.querySelector('.focus ol')
    for (var i = 0; i < ul.children.length; i++) {
        //创建一个li
        var li = document.createElement('li')
            //记录li的索引号 承接第三步
        li.setAttribute('index', i)
            //把li插入进去
        ol.appendChild(li)
            //生成li的同时绑定点击事件,小圆圈的排他思想 干掉所有人 留下我自己
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {

                ol.children[i].className = ''
            }
            this.className = 'current'
                //3.点击小圆圈 滚动图片start
                //必须有定位 给ul添加定位position 且是ul在移动 并非li

            console.log(focusWidth)
            console.log(index)
            var index = this.getAttribute('index')
            num = index
            circle = index
            animate(ul, -index * focusWidth) //移动对象 移动距离 回调函数
                //3.点击小圆圈 滚动图片end
        })
    }
    //把第一个li的类名设置成current
    ol.children[0].className = 'current'
        //2.动态生成小圆圈end




    var first = ul.children[0].cloneNode(true) //克隆第一张图片
    ul.appendChild(first)
        //4.点击右侧按钮，图片滚动一张start(记得克隆第一张图片)
    var num = 0
    arrow_r.addEventListener('click', function() {
        if (num == ul.children.length - 1) {
            ul.style.left = 0
            num = 0
        }
        num++
        animate(ul, -num * focusWidth)





        //5.小圆圈跟随点击变换start
        circle++
        if (circle == ul.children.length - 1) {
            circle = 0
        }
        //排他思想
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''
        }
        ol.children[circle].className = 'current'

        //5.小圆圈跟随点击变换end


    })

    //4.点击右侧按钮，图片滚动一张end



    //6.点击左侧按钮，图片滚动一张start(记得克隆第一张图片)
    var num = 0
    arrow_l.addEventListener('click', function() {
        if (num == 0) {
            num = ul.children.length - 1
            ul.style.left = -num * focusWidth + 'px'

        }
        num--
        animate(ul, -num * focusWidth)





        //5.小圆圈跟随点击变换start
        circle--
        if (circle < 0) {
            circle = ol.children.length - 1
        }
        //排他思想
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''
        }
        ol.children[circle].className = 'current'

        //5.小圆圈跟随点击变换end


    })

    //6.点击右侧按钮，图片滚动一张end

    //7.自动播放功能start
    var timer = setInterval(function() {
        arrow_r.click() //手动调用点击事件
    }, 2000)



    //7.自动播放功能end


})