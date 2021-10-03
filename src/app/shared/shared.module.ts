import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { DefaultImageDirective } from './directives/default-image.directive';
import { DurationConverterPipe } from './pipes/duration-converter.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    DefaultImageDirective,
    DurationConverterPipe
  ],
  exports: [
    NavbarComponent,
    DefaultImageDirective,
    DurationConverterPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ]
})
export class SharedModule {
}
