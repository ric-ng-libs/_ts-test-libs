import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestTsGeneralComponent } from './test-ts-general/test-ts-general.component';
import { TestTsPaysComponent } from './test-ts-pays/test-ts-pays.component';


const routes: Routes = [
  {
    path: 'test-ts-general',
    component: TestTsGeneralComponent
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
