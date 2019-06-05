import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ap',
  templateUrl: './ap.component.html',
  styleUrls: ['./ap.component.css']
})
export class ApComponent implements OnInit {
  // public var x = getRandomNumberByRange(30,180), y = getRandomNumberByRange(10,80), w = 42, r = 10, PI = Math.PI;
  public x = 150;
  public imgid = 1;
  public y = 40;
  public img;
  public w = 42;
  public r = 10;
  public PI = Math.PI;
  public canvas;
  public block;
  public oEvent;
  public fa;
  public leftVal;
  public disX;
  // tslint:disable-next-line:variable-name
  public canvas_ctx;
  // tslint:disable-next-line:variable-name
  public block_ctx;
  // tslint:disable-next-line:variable-name
  // public canvas_ctx = this.canvas.getContext('2d');
  // // tslint:disable-next-line:variable-name
  // public block_ctx = this.block.getContext('2d');
  public scrollBar;
  public bar;
  public mask;

  constructor() {
  }

  ngOnInit() {
    this.getImg();
    this.getMouse();
    // this.getSlider();
  }

  getImg() {
    this.x = this.getRandomNumberByRange(30, 180);
    this.y = this.getRandomNumberByRange(10, 80);
    this.fa = document.getElementById('father');
    this.img = document.createElement('img');
    this.canvas = document.getElementById('canvas');
    this.block = document.getElementById('block');
    this.canvas_ctx = this.canvas.getContext('2d');
    this.block_ctx = this.block.getContext('2d');
    this.imgid = this.getRandomNumberByRange(1, 13);
    this.img.src = '../../assets/photo/' + this.imgid.toString() + '.jpg';
    this.img.crossOrigin = 'Anonymous';
    this.scrollBar = document.getElementById('scrollBar');
    this.bar = this.scrollBar.children[0];
    this.mask = this.scrollBar.children[1];
    // this.canvas_ctx.drawImage(this.img, 0, 0, 310, 155);
    // this.block_ctx.drawImage(this.img, 0, 0, 310, 155);
    this.img.onload = () => {
      this.canvas_ctx.drawImage(this.img, 0, 0, 310, 155);
      this.block_ctx.drawImage(this.img, 0, 0, 310, 155);
    };
    this.draw1(this.canvas_ctx);
    this.draw2(this.block_ctx);
    this.bar.onmousedown = (event) => {
      console.log(this.x);
      event.preventDefault();
      this.disX = event.clientX - this.canvas.offsetLeft;
      this.leftVal = event.clientX - this.bar.offsetLeft;
      this.fa.onmousemove = (ev) => {
        ev.preventDefault();
        this.x = ev.clientX - this.disX;
        // var y = oEvent.clientY -disY;
        // 图形移动的边界判断
        this.x = this.x <= 0 ? 0 : this.x;
        this.x = this.x >= this.fa.offsetWidth - this.canvas.offsetWidth ? this.fa.offsetWidth - this.canvas.offsetWidth : this.x;
        // y = y <= 0 ? 0 : y;
        // y = y >= fa.offsetHeight-box.offsetHeight ? fa.offsetHeight-box.offsetHeight : y;
        this.canvas.style.left = this.x + 'px';
        this.bar.style.left = this.x + 'px';
        // box.style.top = y + 'px';p
      };
      this.fa.onmouseleave = () => {
        this.fa.onmousemove = null;
        this.fa.onmouseup = null;
      };
      this.fa.onmouseup = () => {
        this.fa.onmousemove = null;
        this.fa.onmouseup = null;
        console.log(this.canvas.offsetLeft + ',' + this.canvas.offsetTop);
        console.log(this.block.offsetLeft + ',' + this.block.offsetTop);
        if (this.block.offsetLeft - this.canvas.offsetLeft >= -3 && this.block.offsetLeft - this.canvas.offsetLeft <= 3) {
          console.log('success');
          this.canvas.style.left = this.block.offsetLeft + 'px';
          alert('success');
        } else {
          window.location.reload();
          alert('failed');
        }
      };
    };
  }

  getRandom() {
    this.x = this.getRandomNumberByRange(30, 180);
    this.y = this.getRandomNumberByRange(10, 80);
  }

  getRandomNumberByRange(start, end) {
    return Math.round(Math.random() * (end - start) + start);
  }

  draw1(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.w / 2, this.y);
    ctx.arc(this.x + this.w / 2, this.y - this.r + 2, this.r, 0, 2 * this.PI); //
    ctx.lineTo(this.x + this.w / 2, this.y);
    ctx.lineTo(this.x + this.w, this.y);
    ctx.lineTo(this.x + this.w, this.y + this.w / 2);
    ctx.arc(this.x + this.w + this.r - 2, this.y + this.w / 2, this.r, 0, 2 * this.PI); //
    ctx.lineTo(this.x + this.w, this.y + this.w / 2);
    ctx.lineTo(this.x + this.w, this.y + this.w);
    ctx.lineTo(this.x, this.y + this.w);
    ctx.lineTo(this.x, this.y);
    ctx.clip();
    ctx.beginPath();
    ctx.arc(this.x, this.y + this.w / 2, this.r, 1.5 * this.PI, 0.5 * this.PI); // 只需要画正方形内的半圆就行，方便背景图片的裁剪
    ctx.globalCompositeOperation = 'xor';
    ctx.fill();
  }

  draw2(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.w / 2, this.y);
    ctx.arc(this.x + this.w / 2, this.y - this.r + 2, this.r, 0, 2 * this.PI); //
    ctx.lineTo(this.x + this.w / 2, this.y);
    ctx.lineTo(this.x + this.w, this.y);
    ctx.lineTo(this.x + this.w, this.y + this.w / 2);
    ctx.arc(this.x + this.w + this.r - 2, this.y + this.w / 2, this.r, 0, 2 * this.PI); //
    ctx.lineTo(this.x + this.w, this.y + this.w / 2);
    ctx.lineTo(this.x + this.w, this.y + this.w);
    ctx.lineTo(this.x, this.y + this.w);
    ctx.lineTo(this.x, this.y);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.x, this.y + this.w / 2, this.r, 1.5 * this.PI, 0.5 * this.PI); // 只需要画正方形内的半圆就行，方便背景图片的裁剪
    ctx.globalCompositeOperation = 'xor';
    ctx.fill();
  }

  getMouse() {
    this.canvas.onmousedown = (event) => {
      console.log(this.x);
      event.preventDefault();
      this.disX = event.clientX - this.canvas.offsetLeft;
      this.fa.onmousemove = (ev) => {
        ev.preventDefault();
        this.x = ev.clientX - this.disX;
        // var y = oEvent.clientY -disY;

        // 图形移动的边界判断
        this.x = this.x <= 0 ? 0 : this.x;
        this.x = this.x >= this.fa.offsetWidth - this.canvas.offsetWidth ? this.fa.offsetWidth - this.canvas.offsetWidth : this.x;
        // y = y <= 0 ? 0 : y;
        // y = y >= fa.offsetHeight-box.offsetHeight ? fa.offsetHeight-box.offsetHeight : y;
        this.canvas.style.left = this.x + 'px';
        // box.style.top = y + 'px';p
      };
      this.fa.onmouseleave = () => {
        this.fa.onmousemove = null;
        this.fa.onmouseup = null;
      };
      this.fa.onmouseup = () => {
        this.fa.onmousemove = null;
        this.fa.onmouseup = null;
        console.log(this.canvas.offsetLeft + ',' + this.canvas.offsetTop);
        console.log(this.block.offsetLeft + ',' + this.block.offsetTop);
        if (this.block.offsetLeft - this.canvas.offsetLeft >= -3 && this.block.offsetLeft - this.canvas.offsetLeft <= 3) {
          console.log('success');
          this.canvas.style.left = this.block.offsetLeft + 'px';
          alert('success');
        } else {
          window.location.reload();
          alert('failed');
        }
      };
    };
  }
}
