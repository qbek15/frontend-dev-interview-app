import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { interval } from 'rxjs';

import { UserApiService } from '../../../services/user-api.service';

@Component({
  selector: 'app-user-stats',
  imports: [DatePipe],
  templateUrl: './user-stats.component.html',
  styleUrl: './user-stats.component.scss',
})
export class UserStatsComponent implements OnInit {
  @Input() users: any[] = [];

  private readonly api = inject(UserApiService);

  roles = ['admin', 'editor', 'viewer'];
  stats: any = {};
  loaded = false;

  ngOnInit(): void {
    this.calculateStats();

    setTimeout(() => {
      this.loaded = true;
      this.updateLastRefresh();
    });

    interval(30000).subscribe(() => {
      this.api.searchUsers('').subscribe((users: any) => {
        this.users = users;
        this.calculateStats();
        this.updateLastRefresh();
      });
    });
  }

  calculateStats() {
    const stats: any = { byRole: {}, byStatus: {} };

    this.users.forEach((user: any) => {
      stats.byRole[user.role] = (stats.byRole[user.role] || 0) + 1;
      stats.byStatus[user.status] = (stats.byStatus[user.status] || 0) + 1;
    });

    this.stats = stats;
  }

  getCountByRole(role: string) {
    return this.stats.byRole[role] || 0;
  }

  getActiveCount() {
    return this.users.filter((user: any) => user.status === 'active').length;
  }

  getInactiveCount() {
    return this.users.filter((user: any) => user.status === 'inactive').length;
  }

  getPendingCount() {
    return this.users.filter((user: any) => user.status === 'pending').length;
  }

  getRecentUsers() {
    return this.users
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }

  updateLastRefresh() {
    const element = document.querySelector('.last-updated');

    if (element) {
      element.textContent = 'Last updated: ' + new Date().toLocaleTimeString();
    }
  }
}
