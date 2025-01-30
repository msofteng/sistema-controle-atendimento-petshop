import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/components/page/header/header.component';
import { SidebarComponent } from '../../shared/components/page/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    HeaderComponent,
    SidebarComponent,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  openSidebar = true;
}