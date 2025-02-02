import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideStore } from '@ngrx/store';
import { claimReducer } from './store/claim.reducer';
import { ClaimEffects } from './store/claim.effects';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';


// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(),
//   provideNativeDateAdapter(), provideStore(), provideStore({ claims: claimReducer })]
// };

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(),
  provideNativeDateAdapter(), provideHttpClient(), provideStore(), provideStore({ claims: claimReducer }),
  provideEffects([ClaimEffects])]
};
