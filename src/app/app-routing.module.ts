import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// 使用 RouterModule 中的 Routes 类来配置路由器，
// 所以还要从 @angular/router 库中导入这两个符号
import { RouterModule, Routes } from "@angular/router";

// 路由定义 会告诉路由器，当用户点击某个链接或者在浏览器地址栏中输入某个 URL 时，要显示哪个视图。
// 典型的 Angular 路由（Route）有两个属性：
// path：一个用于匹配浏览器地址栏中 URL 的字符串。
// component：当导航到此路由时，路由器应该创建哪个组件。
// 如果你希望当 URL 为 localhost:4200/heroes 时，就导航到 HeroesComponent。
import { HeroesComponent } from "./heroes/heroes.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeroDetailComponent } from "./hero-detail/hero-detail.component";

const routes: Routes = [
  // 路由器将会把 URL 匹配到 path: 'heroes'，并显示 HeroesComponent。

  //  初始时 重定向到仪表盘路径
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  // 参数化路径  path 中的冒号（:）表示 :id 是一个占位符，它表示某个特定英雄的 id。
  { path: "detail/:id", component: HeroDetailComponent },
  { path: "heroes", component: HeroesComponent }
];

/**
通常不会在路由模块中声明组件，所以可以删除 @NgModule.declarations 并删除对 CommonModule 的引用。
你将会使用 RouterModule 中的 Routes 类来配置路由器，
所以还要从 @angular/router 库中导入这两个符号。
添加一个 @NgModule.exports 数组，其中放上 RouterModule 。 
导出 RouterModule 让路由器的相关指令可以在 AppModule 中的组件中使用。
*/
@NgModule({
  // declarations: [],
  // imports: [CommonModule]

  // 把 RouterModule 添加到 @NgModule.imports 数组中，并用 routes 来配置它。
  // 你只要调用 imports 数组中的 RouterModule.forRoot() 函数就行了。
  imports: [RouterModule.forRoot(routes)],

  // 添加一个 @NgModule.exports 数组，其中放上 RouterModule 。
  // 导出 RouterModule 让路由器的相关指令可以在 AppModule 中的组件中使用。
  exports: [RouterModule]
})
export class AppRoutingModule {}
