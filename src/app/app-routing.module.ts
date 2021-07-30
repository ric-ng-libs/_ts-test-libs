import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestTsGeneralComponent } from './test-ts-general/test-ts-general.component';
import { TestTsParserComponent } from './test-ts-parser/test-ts-parser.component';
import { TestTsPaysComponent } from './test-ts-pays/test-ts-pays.component';

const initialComponent: any = TestTsParserComponent;

const routes: Routes = [

  {
    path: '',
    component: initialComponent
  },

  {
    path: 'test-ts-general',
    component: TestTsGeneralComponent
  },

  {
    path: 'test-ts-parser',
    component: TestTsParserComponent
  },  
  

  {
    path: 'test-ts-pays',
    component: TestTsPaysComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }