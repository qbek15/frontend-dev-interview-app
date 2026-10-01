import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  imports: [AsyncPipe, ReactiveFormsModule, RouterLink],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  private readonly userService = inject(UserService);

  protected readonly search = new FormControl('', { nonNullable: true });

  protected readonly users$: Observable<User[]> = this.search.valueChanges.pipe(
    startWith(this.search.value),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((query) => this.userService.getUsers(query)),
  );
}
