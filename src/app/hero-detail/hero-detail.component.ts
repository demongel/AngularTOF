// 导入input
// hero 属性必须是一个带有 @Input() 装饰器的输入属性，因为外部的 HeroesComponent 组件将会绑定到它
import { Component, OnInit, Input } from '@angular/core';

import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})


// 这个组件所做的只是通过 hero 属性接收一个英雄对象，并显示它。
export class HeroDetailComponent implements OnInit {

  // 添加一个带有 @Input() 装饰器的 hero 属性。
  @Input() hero: Hero;

  constructor() { }

  ngOnInit() {
  }

}
