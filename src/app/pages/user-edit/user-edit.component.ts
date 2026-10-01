import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserApiService } from '../../services/user-api.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
})
export class UserEditComponent {
  private readonly api = inject(UserApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
}
