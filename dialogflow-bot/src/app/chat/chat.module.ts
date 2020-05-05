import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { NbLayoutModule, NbButtonModule, NbChatModule } from '@nebular/theme';



@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbButtonModule,
    NbChatModule
  ]
})
export class ChatModule { }
