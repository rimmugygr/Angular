import {Component, OnInit} from '@angular/core';
import {MessageService} from './services/message.service';
import {Topic} from './services/topic';
import {Message} from './services/message';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Message UI';
  allTopics: string[] = [''];
  actualTopic: Topic;
  errorMessage = '';
  newMessage: Message = {author: '', content: ''};
  newTopic: string = null;

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.getAllTopics();
  }

  public getAllMessage(topic: string) {
    this.messageService.getMessages(topic).subscribe(
      data => this.actualTopic = data as Topic,
      error => console.log(error)
    );
  }

  public getAllTopics() {
    this.messageService.getTopics().subscribe(
      data => this.allTopics = data,
      error => console.log(error)
    );
  }

  public sendMessage(){
    if (this.newMessage.content === '' || this.newMessage.author === '') {
      this.errorMessage = 'Empty field';
    }
    this.messageService.postMessage(this.newMessage, this.actualTopic.name).subscribe(
      data => this.actualTopic = data as Topic,
      error => console.log(error),
      () => {
        this.newMessage.content = '';
        this.errorMessage = '';
      }
    );
  }

  public addNewTopic() {
    if (this.newTopic !== null && this.newTopic !== '') {
      this.allTopics.push(this.newTopic);
      this.getAllMessage(this.newTopic);
    }
  }
}
