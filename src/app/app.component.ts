import { Component } from '@angular/core';


type Lib = { name: string; version?: string; };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  libs: Array<Lib> = [
    {name: "ts-general"},
    {name: "ts-parser"},
    {name: "ts-pays"},
  ];

}
