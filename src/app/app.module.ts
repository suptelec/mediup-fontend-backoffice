import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';
import { AppComponent } from './app.component';

/* Modal components */
import { ModalComponent } from './components/modal/modal.component';
import { ModalHeaderComponent } from './components/modal/header.component';
import { ModalBodyComponent } from './components/modal/body.component';
import { ModalFooterComponent } from './components/modal/footer.component';

/* Spinner component & interceptor */
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerInterceptor } from './components/spinner/spinner.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    SpinnerComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, RouterModule, HttpClientModule, CoreModule, SharedModule, AppRoutingModule, MatIconModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
