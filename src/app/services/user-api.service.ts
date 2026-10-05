import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, timer } from 'rxjs';

import { User } from '../models/user.model';

const INITIAL_USERS: User[] = [
  { id: '1', name: 'Anna Kowalska', email: 'anna.kowalska@example.com', role: 'admin', status: 'active', createdAt: '2023-02-14T09:12:00Z' },
  { id: '2', name: 'Piotr Nowak', email: 'piotr.nowak@example.com', role: 'editor', status: 'active', createdAt: '2023-03-02T11:40:00Z' },
  { id: '3', name: 'Katarzyna Wiśniewska', email: 'k.wisniewska@example.com', role: 'viewer', status: 'inactive', createdAt: '2023-04-21T08:05:00Z' },
  { id: '4', name: 'Tomasz Wójcik', email: 'tomasz.wojcik@example.com', role: 'editor', status: 'active', createdAt: '2023-05-09T14:30:00Z' },
  { id: '5', name: 'Magdalena Kamińska', email: 'm.kaminska@example.com', role: 'viewer', status: 'active', createdAt: '2023-06-30T16:45:00Z' },
  { id: '6', name: 'Michał Lewandowski', email: 'michal.lewandowski@example.com', role: 'viewer', status: 'pending', createdAt: '2023-07-11T10:20:00Z' },
  { id: '7', name: 'Agnieszka Zielińska', email: 'a.zielinska@example.com', role: 'admin', status: 'active', createdAt: '2023-08-27T13:15:00Z' },
  { id: '8', name: 'Krzysztof Szymański', email: 'k.szymanski@example.com', role: 'editor', status: 'inactive', createdAt: '2023-09-18T07:50:00Z' },
  { id: '9', name: 'Joanna Woźniak', email: 'joanna.wozniak@example.com', role: 'viewer', status: 'active', createdAt: '2023-10-03T12:00:00Z' },
  { id: '10', name: 'Paweł Dąbrowski', email: 'pawel.dabrowski@example.com', role: 'editor', status: 'active', createdAt: '2023-11-15T15:25:00Z' },
  { id: '11', name: 'Monika Kozłowska', email: 'monika.kozlowska@example.com', role: 'viewer', status: 'pending', createdAt: '2023-12-01T09:40:00Z' },
  { id: '12', name: 'Marcin Jankowski', email: 'marcin.jankowski@example.com', role: 'viewer', status: 'active', createdAt: '2024-01-08T08:30:00Z' },
  { id: '13', name: 'Ewa Mazur', email: 'ewa.mazur@example.com', role: 'editor', status: 'active', createdAt: '2024-01-29T17:10:00Z' },
  { id: '14', name: 'Grzegorz Kwiatkowski', email: 'g.kwiatkowski@example.com', role: 'viewer', status: 'inactive', createdAt: '2024-02-19T10:55:00Z' },
  { id: '15', name: 'Aleksandra Krawczyk', email: 'ola.krawczyk@example.com', role: 'admin', status: 'active', createdAt: '2024-03-12T13:35:00Z' },
  { id: '16', name: 'Łukasz Piotrowski', email: 'lukasz.piotrowski@example.com', role: 'viewer', status: 'active', createdAt: '2024-04-04T11:05:00Z' },
  { id: '17', name: 'Natalia Grabowska', email: 'natalia.grabowska@example.com', role: 'editor', status: 'pending', createdAt: '2024-04-26T14:45:00Z' },
  { id: '18', name: 'Adam Nowakowski', email: 'adam.nowakowski@example.com', role: 'viewer', status: 'active', createdAt: '2024-05-17T09:20:00Z' },
  { id: '19', name: 'Karolina Pawłowska', email: 'k.pawlowska@example.com', role: 'viewer', status: 'inactive', createdAt: '2024-06-07T16:00:00Z' },
  { id: '20', name: 'Jakub Michalski', email: 'jakub.michalski@example.com', role: 'editor', status: 'active', createdAt: '2024-06-28T08:15:00Z' },
  { id: '21', name: 'Dorota Nowicka', email: 'dorota.nowicka@example.com', role: 'viewer', status: 'active', createdAt: '2024-07-19T12:40:00Z' },
  { id: '22', name: 'Rafał Adamczyk', email: 'rafal.adamczyk@example.com', role: 'viewer', status: 'pending', createdAt: '2024-08-09T15:30:00Z' },
  { id: '23', name: 'Beata Dudek', email: 'beata.dudek@example.com', role: 'admin', status: 'inactive', createdAt: '2024-09-02T10:10:00Z' },
  { id: '24', name: 'Mateusz Zając', email: 'mateusz.zajac@example.com', role: 'editor', status: 'active', createdAt: '2024-09-23T13:50:00Z' },
  { id: '25', name: 'Zofia Wieczorek', email: 'zofia.wieczorek@example.com', role: 'viewer', status: 'active', createdAt: '2024-10-14T09:05:00Z' },
  { id: '26', name: 'Bartosz Jabłoński', email: 'b.jablonski@example.com', role: 'viewer', status: 'active', createdAt: '2024-11-05T11:25:00Z' },
  { id: '27', name: 'Weronika Król', email: 'weronika.krol@example.com', role: 'editor', status: 'pending', createdAt: '2024-11-26T14:00:00Z' },
  { id: '28', name: 'Szymon Majewski', email: 'szymon.majewski@example.com', role: 'viewer', status: 'active', createdAt: '2025-01-13T08:45:00Z' },
  { id: '29', name: 'Julia Olszewska', email: 'julia.olszewska@example.com', role: 'viewer', status: 'inactive', createdAt: '2025-02-04T16:20:00Z' },
  { id: '30', name: 'Dawid Stępień', email: 'dawid.stepien@example.com', role: 'admin', status: 'active', createdAt: '2025-03-01T12:30:00Z' },
];

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private users: User[] = INITIAL_USERS.map((user) => ({ ...user }));

  searchUsers(term: string): Observable<User[]> {
    console.log("REQUEST GOES TO BACKEND")
    const query = term.trim().toLowerCase();

    return this.respond(this.searchResponseTime(query.length), () => {
      if (query.includes('joanna')) {
        throw new HttpErrorResponse({
          status: 500,
          statusText: 'Internal Server Error',
          error: { message: 'Search failed' },
        });
      }

      return this.users
        .filter((user) => `${user.name} ${user.email}`.toLowerCase().includes(query))
        .map((user) => ({ ...user }));
    });
  }

  getUser(id: string): Observable<User> {
    return this.respond(400, () => ({ ...this.findUser(id) }));
  }

  updateUser(user: User): Observable<User> {
    return this.respond(800, () => {
      this.findUser(user.id);

      if (user.email.trim().toLowerCase().endsWith('@blocked.com')) {
        throw new HttpErrorResponse({
          status: 400,
          statusText: 'Bad Request',
          error: { message: 'Email domain not allowed' },
        });
      }

      const updated = { ...user };
      this.users = this.users.map((u) => (u.id === updated.id ? updated : u));
      return { ...updated };
    });
  }

  isEmailTaken(email: string, excludeUserId?: string): Observable<boolean> {
    const normalized = email.trim().toLowerCase();

    return this.respond(500, () =>
      this.users.some(
        (user) => user.id !== excludeUserId && user.email.toLowerCase() === normalized,
      ),
    );
  }

  private findUser(id: string): User {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new HttpErrorResponse({
        status: 404,
        statusText: 'Not Found',
        error: { message: `User ${id} not found` },
      });
    }

    return user;
  }

  private searchResponseTime(length: number): number {
    return length === 0 ? 200 : Math.max(200, 1500 - (length - 1) * 325);
  }

  private respond<T>(responseTime: number, handler: () => T): Observable<T> {
    return timer(responseTime).pipe(map(() => handler()));
  }
}
