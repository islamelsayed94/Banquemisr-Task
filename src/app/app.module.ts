import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ConverterComponent } from './converter/components/converter/converter.component';
import { UsdDetailsComponent } from './details/components/usd-details/usd-details.component';
import { EurDetailsComponent } from './details/components/eur-details/eur-details.component';
import { DetailsComponent } from './details/components/details/details.component';
import { QuickConversionsComponent } from './converter/components/quick-conversions/quick-conversions.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConverterComponent,
    UsdDetailsComponent,
    EurDetailsComponent,
    DetailsComponent,
    QuickConversionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
