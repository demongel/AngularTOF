import { Injectable } from "@angular/core";
import { Hero } from "./hero";
import { HEROES } from "./mock-heroes";

// 从 RxJS 中导入 Observable 和 of 符号。
import { Observable, of } from "rxjs";

import { MessageService } from "./message.service";

// 导入一些所需的 HTTP 符号：
import { HttpClient, HttpHeaders } from "@angular/common/http";

//  异常处理
import { catchError, map, tap } from "rxjs/operators";

// 设置请求头
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

/** 
 * 这个新的服务导入了 Angular 的 Injectable 符号，
并且给这个服务类添加了 @Injectable() 装饰器。 
它把这个类标记为依赖注入系统的参与者之一。
HeroService 类将会提供一个可注入的服务，
并且它还可以拥有自己的待注入的依赖。
@Injectable() 装饰器会接受该服务的元数据对象，就像 @Component() 对组件类的作用一样。
*/

/**
 * 在要求 Angular 把 HeroService 注入到 HeroesComponent 之前，你必须先把这个服务提供给依赖注入系统。
 *  你可以通过注册提供商来做到这一点。提供商用来创建和交付服务，在这个例子中，它会对 HeroService 类进行实例化，以提供该服务。
 你需要确保 HeroService 已经作为该服务的提供商进行过注册。 你要用一个注入器注册它。
 注入器就是一个对象，负责在需要时选取和注入该提供商。
默认情况下，Angular CLI 命令 ng generate service 会通过给 @Injectable 装饰器添加元数据的形式，用根注入器将你的服务注册成为提供商。
如果你看看 HeroService 紧前面的 @Injectable() 语句定义，就会发现 providedIn 元数据的值是 'root'：

当你在顶层提供该服务时，Angular 就会为 HeroService 创建一个单一的、共享的实例，并把它注入到任何想要它的类上。 
在 @Injectable 元数据中注册该提供商，还能允许 Angular 通过移除那些完全没有用过的服务来进行优化。
 */

@Injectable({
  providedIn: "root"
})
export class HeroService {
  private heroesUrl = "api/heroes"; // URL to web api

  //  构造中引入
  // 这是一个典型的“服务中的服务”场景：
  // 把 MessageService 注入到了 HeroService 中，
  // 而 HeroService 又被注入到了 HeroesComponent 中。
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  //  添加获取英雄的方法
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  /**
 * of(HEROES) 会返回一个 Observable<Hero[]>，它会发出单个值，这个值就是这些模拟英雄的数组。
在 HTTP 教程中，你将会调用 HttpClient.get<Hero[]>() 它也同样返回一个 Observable<Hero[]>，
它也会发出单个值，这个值就是来自 HTTP 响应体中的英雄数组。
 * @param HEROES 
 */

  // getHeroes(): Observable<Hero[]> {
  //   return of(HEROES);
  // }

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    // this.messageService.add("HeroService: fetched heroes");
    // this.log("fetched heroes");

    // 从服务端获取英雄
    return (
      this.http
        .get<Hero[]>(this.heroesUrl)
        // catchError() 操作符会拦截失败的 Observable。
        // 它把错误对象传给错误处理器，错误处理器会处理这个错误。
        .pipe(
          tap(_ => this.log("fetched heroes")),
          catchError(this.handleError<Hero[]>("getHeroes", []))
        )
    );
    // return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    // 反引号 ( ` )(英文符号，1的左边) 用于定义 JavaScript 的 模板字符串字面量，以便嵌入 id。
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    // this.log(`fetched hero id=${id}`);
    // 从HEROES中找到id和传入id相同的hero
    // return of(HEROES.find(hero => hero.id === id));

    /** GET hero by id. Will 404 if id not found */
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>("updateHero"))
    );
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>("addHero"))
    );
  }

  /** DELETE: delete the hero from the server */
  //  参数hero 是一个 Hero类型 或者是number类型
  // 参见 https://www.typescriptlang.org/docs/home.html
  deleteHero(hero: Hero | number): Observable<Hero> {
    //  如果hero是一个number类型 返回hero，否则返回hero.id
    const id = typeof hero === "number" ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>("deleteHero"))
    );
  }

  
  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>("searchHeroes", []))
    );
  }

  //  通用异常处理
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
