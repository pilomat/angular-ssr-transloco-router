import {InjectionToken, Injector, NgModule} from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {
  localizeRouterConfig,
  LocalizeRouterModule,
  LOCALIZE_ROUTER_CONFIG, LocalizeRouterConfig, LocalizeParser, CacheMechanism,
} from '@penleychan/ngx-transloco-router';

import {HomeComponent} from './modules/general/home/home.component';
import {NotFoundComponent} from './modules/general/not-found/not-found.component';
import {TranslocoService} from "@ngneat/transloco";
import {Location} from "@angular/common"
import {DeviceDetectorService} from "ngx-device-detector";

const MOBILE_ROUTERS = new InjectionToken('mobileRouterResolver');

export class RouterLocalizeParser extends LocalizeParser {

  load(routes: Routes): Promise<any> {

    return new Promise((resolve: any) => {
      this.deviceDetectorService.isMobile() ? this.init(this.mobileRouters).then(resolve) : this.init(routes).then(resolve)
    });
  }

  constructor(
    translateService: TranslocoService,
    location1: Location,
    injector: Injector,
    private mobileRouters: Routes,
    private deviceDetectorService: DeviceDetectorService
  ) {
    super(translateService, location1, injector.get(LOCALIZE_ROUTER_CONFIG) as LocalizeRouterConfig);
  }
}

const mobileRoutes: Routes = [
  {
    path: 'about',
    loadChildren: () =>
      import('./modules/general/about-mobile/about-mobile.module').then(
        (mod) => mod.AboutMobileModule
      ),
  }
]

const routes: Routes = [
  {path: '', component: HomeComponent},

  {
    path: 'about',
    loadChildren: () =>
      import('./modules/general/about/about.module').then(
        (mod) => mod.AboutModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/general/login/login.module').then(
        (mod) => mod.LoginModule
      ),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./modules/general/signup/signup.module').then(
        (mod) => mod.SignupModule
      ),
  },

  {
    path: 'bootstrap',
    loadChildren: () =>
      import('./modules/application/example-bootstrap/tutorial.module').then(
        (mod) => mod.TutorialModule
      ),
  },
  {
    path: 'components',
    loadChildren: () =>
      import('./modules/application/example-components/tutorial.module').then(
        (mod) => mod.TutorialModule
      ),
  },
  {
    path: 'forms',
    loadChildren: () =>
      import('./modules/application/example-forms/tutorial.module').then(
        (mod) => mod.TutorialModule
      ),
  },
  {
    path: 'services',
    loadChildren: () =>
      import('./modules/application/example-services/tutorial.module').then(
        (mod) => mod.TutorialModule
      ),
  },

  {
    path: 'contact',
    loadChildren: () =>
      import('./modules/general/contact/contact.module').then(
        (mod) => mod.ContactModule
      ),
  },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LocalizeRouterModule.forRoot(routes),
  ],
  providers: [
    {
      provide: LOCALIZE_ROUTER_CONFIG,
      useValue: localizeRouterConfig({
        defaultLangFunction: () => 'fr'
      }),
    },
    {
      provide: MOBILE_ROUTERS,
      useValue: mobileRoutes
    }
  ],
  exports: [RouterModule, LocalizeRouterModule],
  declarations: [],
})
export class AppRoutingModule {
}
