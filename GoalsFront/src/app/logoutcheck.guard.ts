import { CanDeactivateFn } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';

export const logoutcheckGuard: CanDeactivateFn<HomeComponent> = (component, currentRoute, currentState, nextState) => {
  var result = confirm("Are you sure you want to logout?");
  return result;
  component.checkStatus();
};
