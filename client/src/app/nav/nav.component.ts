import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: true, autoClose: true },
    },
  ],
})
export class NavComponent implements OnInit {
  title = 'Dating App';
  user!: User;
  model: any = {};
  isCollapsed: boolean = false;

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (response:any) => {
        this.user = response;
      },
      error: (err:any) => console.error(err),
    });
  }

  logout() {
    this.accountService.logout();
  }

}
