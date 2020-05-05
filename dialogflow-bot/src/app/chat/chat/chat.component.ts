import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages:any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.messages.push(
      {
        type : 'text',
        message: "Test Message Text",
        reply: "Reply message text",
        sender: "John Doe",
        date: new Date(),
        quote: "TEst quote of chat message", 
      }
    );
  }


  
  sendMessage(event:any) {
    console.log("IT WORKS");
    this.messages.push(
    {
     type : 'text',
     message: "Test Message Text",
     reply: "Reply message text",
     sender: "John Doe",
     date: new Date(),
     quote: "TEst quote of chat message", 
   });


  }

}
