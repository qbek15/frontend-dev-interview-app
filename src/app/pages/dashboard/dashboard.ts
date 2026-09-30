import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly userService = inject(UserService);

  protected readonly users = toSignal(this.userService.getUsers());

  protected readonly stats = computed(() => {
    const users = this.users() ?? [];
    return {
      total: users.length,
      active: users.filter((u) => u.active).length,
      admins: users.filter((u) => u.role === 'admin').length,
    };
  });
}
