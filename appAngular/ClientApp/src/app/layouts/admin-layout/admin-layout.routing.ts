import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import { LoginComponent} from '../../start/login/login.component';
import { RegistroComponent} from '../../start/registro/registro.component';
import { NavGuardGuard } from 'src/app/guard/nav-guard.guard';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent,             canActivate: [NavGuardGuard]},
    { path: 'user',           component: UserComponent,             canActivate: [NavGuardGuard] },
    { path: 'table',          component: TablesComponent,           canActivate: [NavGuardGuard] },
    { path: 'typography',     component: TypographyComponent,       canActivate: [NavGuardGuard] },
    { path: 'icons',          component: IconsComponent,            canActivate: [NavGuardGuard] },
    { path: 'maps',           component: MapsComponent,             canActivate: [NavGuardGuard] },
    { path: 'notifications',  component: NotificationsComponent,    canActivate: [NavGuardGuard] },
    { path: 'upgrade',        component: UpgradeComponent,          canActivate: [NavGuardGuard] },
    { path: 'login',          component: LoginComponent,            },
    { path: 'registro',       component: RegistroComponent,         },
];
