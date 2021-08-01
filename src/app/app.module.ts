import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';


import { TestCommunComponent } from './test-commun/test-commun.component';

import { TestTsGeneralComponent } from './test-ts-general/test-ts-general.component';
import { TestTsParserComponent } from './test-ts-parser/test-ts-parser.component';




@NgModule({
  declarations: [
    AppComponent,
    
    TestCommunComponent,
    
    TestTsGeneralComponent,
    TestTsParserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
