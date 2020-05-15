import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from './message';




@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient) { }

  getMessages(topic: string): Observable<any> {
    return this.httpClient.get('/api/message/' + topic).pipe();
  }

  getTopics(): Observable<any> {
    return this.httpClient.get('/api/topic').pipe();
  }

  postMessage(message: Message, topic: string) {
    return this.httpClient.post('/api/message/' + topic, message).pipe();
  }

}
