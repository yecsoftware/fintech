import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loaderInterceptor } from './app/services/loader.interceptor';
import { authInterceptor } from './app/services/auth.interceptor';

import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(withInterceptors([authInterceptor, loaderInterceptor])),
    provideAnimations(), // <-- zorunlu!
    importProvidersFrom(
      ToastrModule.forRoot({
        positionClass: 'toast-bottom-right',
        closeButton: true,
        progressBar: true,
        timeOut: 3000
      })
    )
  ]
})
.catch((err) => console.error(err));