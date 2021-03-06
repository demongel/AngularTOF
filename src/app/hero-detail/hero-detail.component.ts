// 导入input
// hero 属性必须是一个带有 @Input() 装饰器的输入属性，因为外部的 HeroesComponent 组件将会绑定到它
import { Component, OnInit, Input } from "@angular/core";

import { Hero } from "../hero";

import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { HeroService } from "../hero.service";

@Component({
  selector: "app-hero-detail",
  templateUrl: "./hero-detail.component.html",
  styleUrls: ["./hero-detail.component.css"]
})

// 获取创建本组件的路由，
// 从这个路由中提取出 id
// 通过 HeroService 从服务器上获取具有这个 id 的英雄数据。

// 这个组件所做的只是通过 hero 属性接收一个英雄对象，并显示它。
export class HeroDetailComponent implements OnInit {
  // 添加一个带有 @Input() 装饰器的 hero 属性。
  @Input() hero: Hero;

  /**
   *   ActivatedRoute 保存着到这个 HeroDetailComponent 实例的路由信息。 
   *   这个组件对从 URL 中提取的路由参数感兴趣。 其中的 id 参数就是要显示的英雄的 id。
   *   HeroService 从远端服务器获取英雄数据，本组件将使用它来获取要显示的英雄。  
   *   location 是一个 Angular 的服务，用来与浏览器打交道。 稍后，你就会使用它来导航回上一个视图。
   */


  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getHero();
  }

/**
 * route.snapshot 是一个路由信息的静态快照，抓取自组件刚刚创建完毕之后。
 * paramMap 是一个从 URL 中提取的路由参数值的字典。 "id" 对应的值就是要获取的英雄的 id。
 * 路由参数总会是字符串。 
 * JavaScript 的 (+) 操作符会把字符串转换成数字，英雄的 id 就是数字类型。
 */
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  // 相当于浏览器的返回
  goBack(): void {
    this.location.back();
  }

  //html相当于view，点击方法设置在组件中
  // 组件通过调用服务（ViewModel）来处理数据
  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
