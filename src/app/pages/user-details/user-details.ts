import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-details',
  imports: [DatePipe, RouterLink],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
})
export class UserDetails {
  private readonly userService = inject(UserService);

  /** Bound from the `:id` route param (withComponentInputBinding). */
  readonly id = input.required<string>();

  protected readonly user = toSignal(
    toObservable(this.id).pipe(switchMap((id) => this.userService.getUser(Number(id)))),
  );
}
