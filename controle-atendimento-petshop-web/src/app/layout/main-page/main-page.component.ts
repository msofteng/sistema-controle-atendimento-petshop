import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../shared/components/page/footer/footer.component';
import { HeaderComponent } from '../../shared/components/page/header/header.component';

@Component({
  selector: 'app-main-page',
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {}