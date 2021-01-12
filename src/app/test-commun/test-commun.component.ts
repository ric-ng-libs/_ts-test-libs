import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-test-commun',
  templateUrl: './test-commun.component.html',
  styleUrls: ['./test-commun.component.css']
})
export class TestCommunComponent implements OnInit {

  @Input() gitHubOrganizationName: string = "ric-ng-libs";
  @Input() npmOrganizationName: string = "ric-ng";
  @Input() libraryName: string = "";
  @Input() libraryDescription: string = "";

  constructor() {


  }
  
  ngOnInit() {

  }

}
