import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { GestionMedicosComponent } from './pagina/admin/gestion-medicos/gestion-medicos.component';
import { DiaLibreComponent } from './pagina/medico/dia-libre/dia-libre.component';
import { AgendaComponent } from './pagina/medico/agenda/agenda.component';
import { ConsultaComponent } from './pagina/medico/consulta/consulta.component';
import { HistoricoConsultasComponent } from './pagina/medico/historico-consultas/historico-consultas.component';
import { FacturaComponent } from './pagina/medico/factura/factura.component';
import { HistorialConsultasComponent } from './pagina/admin/historial-consultas/historial-consultas.component';
import { MenuAdminComponent } from './pagina/admin/menu-admin/menu-admin.component';
import { MenuMedicoComponent } from './pagina/medico/menu-medico/menu-medico.component';
import { PqrsAdminComponent } from './pagina/admin/pqrs-admin/pqrs-admin.component';
import { RegistroMedicosComponent } from './pagina/admin/registro-medicos/registro-medicos.component';
import { RecuperarPasswordComponent } from './pagina/recuperar-password/recuperar-password.component';
import { TratamientoComponent } from './pagina/tratamiento/tratamiento.component';
import { MenuPacienteComponent } from './pagina/paciente/menu-paciente/menu-paciente.component';
import { ConsultasPacienteComponent } from './pagina/paciente/consultas-paciente/consultas-paciente.component';
import { GestionInfoPersonalComponent } from './pagina/paciente/gestion-info-personal/gestion-info-personal.component';
import { PedirCitaComponent } from './pagina/paciente/pedir-cita/pedir-cita.component';
import { PqrsPacienteComponent } from './pagina/paciente/pqrs-paciente/pqrs-paciente.component';
import { LoginGuard } from './guards/permiso.service';
import { RolesGuard } from './guards/roles.service';


const routes: Routes = [
    { path: "", component: InicioComponent },
    { path: "recuperar-password/:email", component: RecuperarPasswordComponent },
   
    { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
    { path: "registro", component: RegistroComponent, canActivate: [LoginGuard] },
    {
        path: "paciente/pqrs-paciente", component: PqrsPacienteComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["paciente"]
        }
    },
    {
        path: "medico/factura/:codigoConsulta", component: FacturaComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["medico"]
        }
    },
    {
        path: "paciente/consultas-paciente", component: ConsultasPacienteComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["paciente"]
        }
    },
    {
        path: "tratamiento/:codigoConsulta", component: TratamientoComponent, canActivate: [RolesGuard],
        data: { expectedRole: ["paciente", "medico", "admin"] }
    },
  
    {
        path: "paciente/gestion-info-personal", component: GestionInfoPersonalComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["paciente"]
        }
    },
    {
        path: "paciente/pedir-cita", component: PedirCitaComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["paciente"]
        }
    },

    {
        path: "medico/agenda", component: AgendaComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["medico"]
        }
    },

    {
        path: "medico/consulta/:codigoCita/:codigoPaciente", component: ConsultaComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["medico"]
        }
    },

    {
        path: "medico/dia-libre", component: DiaLibreComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["medico"]
        }
    },

    {
        path: "medico/historico-consultas", component: HistoricoConsultasComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["medico"]
        }
    },

    { path: "**", pathMatch: "full", redirectTo: "" }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

