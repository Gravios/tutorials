import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxThreeModule } from 'ngx-three';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MarkerComponent, Box } from './marker/marker.component';

@NgModule({
  declarations: [
    AppComponent,
    MarkerComponent,
    Box
  ],
  imports: [
    BrowserModule,
    NgxThreeModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
.catch(err => console.log(err));
