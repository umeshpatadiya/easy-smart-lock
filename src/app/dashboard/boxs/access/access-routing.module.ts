import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessPage } from './access.page';

const routes: Routes = [
  {
    path: ':id',
    component: AccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessPageRoutingModule {}
