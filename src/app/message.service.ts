import { Injectable } from '@angular/core';



// 注入到root
@Injectable({
  providedIn: 'root',
})

// 该服务对外暴露了它的 messages 缓存，
// 以及两个方法：add() 方法往缓存中添加一条消息，clear() 方法用于清空缓存。
export class MessageService {
  messages: string[] = [];
 
  add(message: string) {
    this.messages.push(message);
  }
 
  clear() {
    this.messages = [];
  }
}