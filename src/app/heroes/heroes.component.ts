// 从 Angular 核心库中导入 Component 符号，并为组件类加上 @Component 装饰器。
import { Component, OnInit } from "@angular/core";
// 从hero.ts中导入Hero类
import { Hero } from "../hero";

//  转为使用服务提供
// import { HEROES } from "../mock-heroes";

import { HeroService } from "../hero.service";



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
  // heroes = HEROES;

  heroes: Hero[];

  // 添加一个属性 先不赋值
  // selectedHero: Hero;
  // 添加一个onSelect方法，此时给selectHero赋值

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }

  // constructor() {}
  // 在构造函数中  导入服务
  /**
   * 
   * @param heroService 
   * 1. 声明了一个私有 heroService 属性，2. 把它标记为一个 HeroService 的注入点。 
    当 Angular 创建 HeroesComponent 时，依赖注入系统就会把这个 heroService 参数设置为 HeroService 的单例对象。
   */
  constructor(private heroService: HeroService) {}

  /**
   * 固然可以在构造函数中调用 getHeroes()，但那不是最佳实践。
    让构造函数保持简单，只做初始化操作，比如把构造函数的参数赋值给属性。 
    构造函数不应该做任何事。 它当然不应该调用某个函数来向远端服务（比如真实的数据服务）发起 HTTP 请求。
   */
  ngOnInit() {
    this.getHeroes();
  }

  // 从服务中获取这些英雄数据。
  /**
   * HeroService.getHeroes() 的函数签名是同步的，
   * 它所隐含的假设是 HeroService 总是能同步获取英雄列表数据。
   * 而 HeroesComponent 也同样假设能同步取到 getHeroes() 的结果。
   */

  /**
 * 这在真实的应用中几乎是不可能的。 现在能这么做，只是因为目前该服务返回的是模拟数据。 
 * 不过很快，该应用就要从远端服务器获取英雄数据了，而那天生就是异步操作。
 * HeroService 必须等服务器给出响应， 而 getHeroes() 不能立即返回英雄数据， 浏览器也不会在该服务等待期间停止响应。
 * HeroService.getHeroes() 必须具有某种形式的异步函数签名。
 * 它可以使用回调函数，可以返回 Promise（承诺），也可以返回 Observable（可观察对象）。
    这节课，HeroService.getHeroes() 将会返回 Observable，因为它最终会使用 Angular 的 HttpClient.get 方法来获取英雄数据，
    而 HttpClient.get() 会返回 Observable。
 */

  getHeroes(): void {
    // this.heroes = this.heroService.getHeroes();
    // 改成订阅模式
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
