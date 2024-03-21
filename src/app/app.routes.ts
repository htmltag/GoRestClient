import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './add-user/add-user.component';
import { authGuard } from './auth.guard';
import { ListUsersComponent } from './list-users/list-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [
    {path: "", pathMatch: 'full', redirectTo: '/login'},
    {path: "login", component: LoginComponent},
    {path: "add-user", component: AddUserComponent, canActivate: [authGuard]},
    {path: "list-users", component: ListUsersComponent, canActivate: [authGuard]},
    {path: "edit-user", component: EditUserComponent, canActivate: [authGuard]},
    {path: "delete-user", component: DeleteUserComponent, canActivate: [authGuard]},
    {path: "logout", component: LogoutComponent, canActivate: [authGuard]}
];
