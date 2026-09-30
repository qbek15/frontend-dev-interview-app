import { Injectable } from '@angular/core';
import { Observable, delay, map, of, throwError } from 'rxjs';

import { User } from '../models/user.model';

const USERS: User[] = [
  { id: 1, firstName: 'Anna', lastName: 'Kowalska', email: 'anna.kowalska@example.com', role: 'admin', active: true, createdAt: '2024-01-15' },
  { id: 2, firstName: 'Piotr', lastName: 'Nowak', email: 'piotr.nowak@example.com', role: 'editor', active: true, createdAt: '2024-03-02' },
  { id: 3, firstName: 'Katarzyna', lastName: 'Wiśniewska', email: 'k.wisniewska@example.com', role: 'viewer', active: false, createdAt: '2024-05-21' },
  { id: 4, firstName: 'Tomasz', lastName: 'Wójcik', email: 'tomasz.wojcik@example.com', role: 'editor', active: true, createdAt: '2024-07-09' },
  { id: 5, firstName: 'Magdalena', lastName: 'Kamińska', email: 'm.kaminska@example.com', role: 'viewer', active: true, createdAt: '2024-09-30' },
  { id: 6, firstName: 'Michał', lastName: 'Lewandowski', email: 'michal.lewandowski@example.com', role: 'viewer', active: false, createdAt: '2025-01-11' },
  { id: 7, firstName: 'Agnieszka', lastName: 'Zielińska', email: 'a.zielinska@example.com', role: 'admin', active: true, createdAt: '2025-02-27' },
  { id: 8, firstName: 'Krzysztof', lastName: 'Szymański', email: 'k.szymanski@example.com', role: 'editor', active: false, createdAt: '2025-04-18' },
];

/** Simulated network latency in ms. */
const LATENCY = 400;

@Injectable({ providedIn: 'root' })
export class UserService {
  getUsers(query = ''): Observable<User[]> {
    const term = query.trim().toLowerCase();

    return of(USERS).pipe(
      delay(LATENCY),
      map((users) =>
        term
          ? users.filter((u) =>
              `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(term),
            )
          : users,
      ),
    );
  }

  getUser(id: number): Observable<User> {
    const user = USERS.find((u) => u.id === id);

    return user
      ? of(user).pipe(delay(LATENCY))
      : throwError(() => new Error(`User with id ${id} not found`));
  }
}
