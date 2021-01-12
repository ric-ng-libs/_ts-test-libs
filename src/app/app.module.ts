import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { TestCommunComponent } from './test-commun/test-commun.component';

import { TestTsGeneralComponent } from './test-ts-general/test-ts-general.component';
import { TestTsCodeAnalyzerComponent } from './test-ts-code-analyzer/test-ts-code-analyzer.component';
import { TestTsPaysComponent } from './test-ts-pays/test-ts-pays.component';



@NgModule({
  declarations: [
    AppComponent,
    
    TestCommunComponent,
    
    TestTsGeneralComponent,
    TestTsCodeAnalyzerComponent,
    TestTsPaysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
