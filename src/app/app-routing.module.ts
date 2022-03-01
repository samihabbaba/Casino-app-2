import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tab1/tab1.module').then((m) => m.Tab1PageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  // {
  //   path: 'wallet',
  //   loadChildren: () =>
  //     import('./wallet/wallet.module').then((m) => m.WalletPageModule),
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'table-selection',
    loadChildren: () =>
      import('./table-selection/table-selection.module').then(
        (m) => m.TableSelectionPageModule
      ),
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
