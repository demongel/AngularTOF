import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// 使用ngModel 双向绑定需要导入
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';

// 把 FormsModule 添加到 @NgModule 元数据的 imports 数组中，这里是该应用所需外部模块的列表。
// 每个组件都必须声明在（且只能声明在）一个 NgModule 中。
// Angular CLI 在生成 HeroesComponent 组件的时候就自动把它加到了 AppModule 中。
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent
  ],

  imports: [
    BrowserModule,
    FormsModule   
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
