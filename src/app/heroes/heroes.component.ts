// 从 Angular 核心库中导入 Component 符号，并为组件类加上 @Component 装饰器。
import { Component, OnInit } from "@angular/core";
// 从hero.ts中导入Hero类
import { Hero } from "../hero";

import { HEROES } from "../mock-heroes";

// @Component 是个装饰器函数，用于为该组件指定 Angular 所需的元数据。
// CLI 自动生成了三个元数据属性：
// selector— 组件的选择器（CSS 元素选择器）
// templateUrl— 组件模板文件的位置。
// styleUrls— 组件私有 CSS 样式表文件的位置。
// CSS 元素选择器 app-heroes 用来在父组件的模板中匹配 HTML 元素的名称，以识别出该组件。
@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",

  // @Component 元数据中指定的样式和样式表都是局限于该组件的。
  // heroes.component.css 中的样式只会作用于 HeroesComponent，
  // 既不会影响到组件外的 HTML，也不会影响到其它组件中的 HTML。
  styleUrls: ["./heroes.component.css"]
})

// ngOnInit 是一个生命周期钩子，Angular 在创建完组件后很快就会调用 ngOnInit。这里是放置初始化逻辑的好地方。
// 始终要 export 这个组件类，以便在其它地方（比如 AppModule）导入它。
export class HeroesComponent implements OnInit {
  // // 添加一个属性 属性名hero，类型Hero，并给属性赋值
  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // };

  // 添加一个 heroes 属性，这样可以暴露出这些英雄，以供绑定。
  heroes = HEROES;

  // 添加一个属性 先不赋值
  selectedHero: Hero;
  // 添加一个onSelect方法，此时给selectHero赋值
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  constructor() {}

  ngOnInit() {}
}
