import { StoreDevtoolsOptions } from './../../node_modules/@ngrx/store-devtools/src/config.d';
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { movietablereducer } from './store/action/movietable.reducer';
import { provideServiceWorker } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { MoviesEffects } from './store/action/movies.effects';
import { StoreDevtools, StoreDevtoolsModule, provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideStore(),
    provideState({ name: 'mtable', reducer: movietablereducer }),
    provideEffects(MoviesEffects),
    
    importProvidersFrom(StoreDevtoolsModule.instrument()),
   provideAnimationsAsync(), // required animations providers
   provideToastr( {timeOut: 2000,
    positionClass: 'toast-top-center',
    progressBar : true,
    tapToDismiss : true,
    preventDuplicates: true,}),
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }), provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }),
    importProvidersFrom(HttpClientModule), provideEffects()]
};
