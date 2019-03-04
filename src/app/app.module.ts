import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// 使用ngModel 双向绑定需要导入
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

// 网络请求
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { HeroSearchComponent } from './hero-search/hero-search.component';


// 把 FormsModule 添加到 @NgModule 元数据的 imports 数组中，这里是该应用所需外部模块的列表。
// 每个组件都必须声明在（且只能声明在）一个 NgModule 中。
// Angular CLI 在生成 HeroesComponent 组件的时候就自动把它加到了 AppModule 中。
@NgModule({
   declarations: [
      AppComponent,
      HeroesComponent,
      HeroDetailComponent,
      MessagesComponent,
      DashboardComponent,
      HeroSearchComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      HttpClientModule,
      // forRoot() 配置方法接受一个 InMemoryDataService 类（初期的内存数据库）作为参数。
      HttpClientInMemoryWebApiModule.forRoot(
         InMemoryDataService, { dataEncapsulation: false }
       )
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})

export class AppModule { }
