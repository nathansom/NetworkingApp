import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { ToastrService } from 'ngx-toastr';
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
  title = 'harmonix';
  model: any = {};
  isCollapsed: boolean = false;

  constructor(public accountService: AccountService, 
              private router: Router, 
              private toastr: ToastrService) {}

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (response:any) => {
        if (response !== null) {
          const user = response;
          this.toastr.success(`Welcome back, ${user?.username}!`);
        }
        this.router.navigateByUrl('/members')
      },
      error: (err:any) => {
        console.error(err);
        this.toastr.error(err.error);
      },
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
