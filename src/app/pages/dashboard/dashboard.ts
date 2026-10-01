import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { UserService } from '../../services/user.service';

interface DashboardStats {
  total: number;
  active: number;
  admins: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly userService = inject(UserService);

  protected readonly stats$: Observable<DashboardStats> = this.userService.getUsers().pipe(
    map((users) => ({
      total: users.length,
      active: users.filter((u) => u.active).length,
      admins: users.filter((u) => u.role === 'admin').length,
    })),
  );
}
