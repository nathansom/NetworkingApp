import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private accountService: AccountService) {}

  ngOnInit() {
      this.setCurrentUser();
  }

  setCurrentUser() {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user') || "");
      this.accountService.setCurrentUser(user);
    } else {
      this.accountService.setCurrentUser(null);
    }
  }
}
