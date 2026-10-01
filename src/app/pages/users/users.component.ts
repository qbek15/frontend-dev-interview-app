import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { mergeMap, startWith } from 'rxjs';

import { User } from '../../models/user.model';
import { UserApiService } from '../../services/user-api.service';

@Component({
  selector: 'app-users',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  private readonly api = inject(UserApiService);

  search = new FormControl('', { nonNullable: true });
  users: User[] = [];

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        startWith(''),
        mergeMap((term) => this.api.searchUsers(term)),
      )
      .subscribe((users) => {
        this.users = users;
      });
  }
}
