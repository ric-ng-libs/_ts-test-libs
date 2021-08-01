import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestTsGeneralComponent } from './test-ts-general/test-ts-general.component';
import { TestTsParserComponent } from './test-ts-parser/test-ts-parser.component';

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
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }