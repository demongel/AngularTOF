import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

// 选择器
// 模板
// css
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})

/**
 * 它定义了一个 heroes 数组属性。
 * 它的构造函数希望 Angular 把 HeroService 注入到私有的 heroService 属性中。
 * 在 ngOnInit() 生命周期钩子中调用 getHeroes。
 */
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  // getHeroes 函数会截取第 2 到 第 5 位英雄，
  // 也就是说只返回四个顶级英雄（第二，第三，第四和第五）
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}