var canvas = document.getElementById('canvas');//拖动的
var block = document.getElementById('block');//容器的
var canvas_ctx = canvas.getContext('2d');
var block_ctx = block.getContext('2d');
var img = document.createElement('img');

img.src = '1.jpeg'
img.onload = function() {
    canvas_ctx.drawImage(img, 0, 0, 310, 155);
    block_ctx.drawImage(img, 0, 0, 310, 155);
};
var x = getRandomNumberByRange(30,180), y = getRandomNumberByRange(10,80), w = 42, r = 10, PI = Math.PI;

function getRandomNumberByRange (start, end) {
    return Math.round(Math.random() * (end - start) + start)
}


function draw1(ctx) {
    ctx.beginPath()
    ctx.moveTo(x,y)
     ctx.lineTo(x+w/2,y)
       ctx.arc(x+w/2,y-r+2, r,0,2*PI) //
       ctx.lineTo(x+w/2,y)
    ctx.lineTo(x+w,y)
       ctx.lineTo(x+w,y+w/2)
       ctx.arc(x+w+r-2,y+w/2,r,0,2*PI) //
       ctx.lineTo(x+w,y+w/2)
    ctx.lineTo(x+w,y+w)
    ctx.lineTo(x,y+w)
    ctx.lineTo(x,y)
    ctx.clip()
    ctx.beginPath()
      ctx.arc(x,y+w/2, r,1.5*PI,0.5*PI) // 只需要画正方形内的半圆就行，方便背景图片的裁剪
     ctx.globalCompositeOperation = "xor"
           ctx.fill()
}


function draw2(ctx) {
    ctx.beginPath()
    ctx.moveTo(x,y)
    ctx.lineTo(x+w/2,y)
    ctx.arc(x+w/2,y-r+2, r,0,2*PI) //
    ctx.lineTo(x+w/2,y)
    ctx.lineTo(x+w,y)
    ctx.lineTo(x+w,y+w/2)
    ctx.arc(x+w+r-2,y+w/2,r,0,2*PI) //
    ctx.lineTo(x+w,y+w/2)
    ctx.lineTo(x+w,y+w)
    ctx.lineTo(x,y+w)
    ctx.lineTo(x,y)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(x,y+w/2, r,1.5*PI,0.5*PI) // 只需要画正方形内的半圆就行，方便背景图片的裁剪
    ctx.globalCompositeOperation = "xor"
    ctx.fill()
}
draw1(canvas_ctx)
draw2(block_ctx)


var fa = document.getElementById('father');


// 图片移动效果
canvas.onmousedown=function(ev) {
    var oEvent = ev;
    // 浏览器有一些图片的默认事件,这里要阻止
    oEvent.preventDefault();
    var disX = oEvent.clientX - canvas.offsetLeft;
    // var disY = oEvent.clientY - box.offsetTop;
    fa.onmousemove=function (ev) {

        oEvent = ev;
        oEvent.preventDefault();
        var x = oEvent.clientX -disX;
        // var y = oEvent.clientY -disY;

        // 图形移动的边界判断
        x = x <= 0 ? 0 : x;
        x = x >= fa.offsetWidth-canvas.offsetWidth ? fa.offsetWidth-canvas.offsetWidth : x;
        // y = y <= 0 ? 0 : y;
        // y = y >= fa.offsetHeight-box.offsetHeight ? fa.offsetHeight-box.offsetHeight : y;
        canvas.style.left = x + 'px';
        // box.style.top = y + 'px';p
    }
    // 图形移出父盒子取消移动事件,防止移动过快触发鼠标移出事件,导致鼠标弹起事件失效
    fa.onmouseleave = function () {
        fa.onmousemove=null;
        fa.onmouseup=null;
    }
    // 鼠标弹起后停止移动
    fa.onmouseup=function() {
        fa.onmousemove=null;
        fa.onmouseup=null;
        console.log(canvas.offsetLeft + "," + canvas.offsetTop);
        console.log(block.offsetLeft + "," + block.offsetTop);
        if(block.offsetLeft - canvas.offsetLeft >= -3 && block.offsetLeft - canvas.offsetLeft <= 3){
            console.log("success");
            canvas.style.left = block.offsetLeft + "px";
            alert("success");
        }else{
            window.location.reload();
            alert("failed");
        }
    }
}

function getRandomNumberByRange (start, end) {
    return Math.round(Math.random() * (end - start) + start)
}



//
//
// function allowDrop(ev)
// {
//     ev.preventDefault();
// }
//
// function drag(ev)
// {
//     ev.dataTransfer.setData("Text",ev.target.id);
// }
//
// function drop(ev)
// {
//     ev.preventDefault();
//     var data=ev.dataTransfer.getData("Text");
//     ev.target.appendChild(document.getElementById(data));
// }

// var ooo=0;
// canvas.addEventListener('mousemove', function(ev){
//     canvas.style.left=ooo+'px';
// })
//
// canvas.addEventListener('mousemove', function(ev){
//     ooo=ev.offsetX;
//     console.log(ooo)
// })

// var d1,img,d2,msg;
// d1=document.getElementById('div1');
// imgA=document.getElementsByTagName("img");
// d2=document.getElementById('div2');
// for(var i=0;i<imgA.length;i++) {
//     imgA[i].ondragstart = function (e) {//开始拖动
//         e.dataTransfer.setData("tupian", this.id);
//         console.log(e);
//     }
// }

