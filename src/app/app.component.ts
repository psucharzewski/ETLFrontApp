import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  message: string;

  receiveMessage($event) {
    this.message = $event
  }
  title = 'front-end';
}
