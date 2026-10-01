import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../models/user.model';
import { UserApiService } from '../../services/user-api.service';
import { UserStatsComponent } from './user-stats/user-stats.component';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, UserStatsComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private readonly api = inject(UserApiService);

  protected readonly users$: Observable<User[]> = this.api.searchUsers('');
}
