import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConverterComponent } from './converter/components/converter/converter.component';
import { UsdDetailsComponent } from './details/components/usd-details/usd-details.component';
import { EurDetailsComponent } from './details/components/eur-details/eur-details.component';
import { DetailsComponent } from './details/components/details/details.component';


const routes: Routes = [
  { path: '', component: ConverterComponent },
  { path: 'usd', component: UsdDetailsComponent },
  { path: 'eur', component: EurDetailsComponent },
  { path: 'details', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
