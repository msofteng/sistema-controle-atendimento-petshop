import { Routes } from '@angular/router';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { MainPageComponent } from './layout/main-page/main-page.component';
import { ContaComponent } from './pages/conta/conta.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { VisualizarAtendimentosComponent } from './pages/listagens/visualizar-atendimentos/visualizar-atendimentos.component';
import { VisualizarClientesComponent } from './pages/listagens/visualizar-clientes/visualizar-clientes.component';
import { VisualizarPetsComponent } from './pages/listagens/visualizar-pets/visualizar-pets.component';
import { VisualizarRacasComponent } from './pages/listagens/visualizar-racas/visualizar-racas.component';
import { LoginComponent } from './pages/login/login.component';
import { PainelComponent } from './pages/painel/painel.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: '',
        component: InicioComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'cadastro',
        component: RegisterComponent
      },
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: PainelComponent
      },
      {
        path: 'atendimentos',
        component: VisualizarAtendimentosComponent
      },
      {
        path: 'clientes',
        component: VisualizarClientesComponent
      },
      {
        path: 'pets',
        component: VisualizarPetsComponent
      },
      {
        path: 'racas',
        component: VisualizarRacasComponent
      },
      {
        path: 'conta',
        component: ContaComponent
      }
    ]
  }
];