import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../user.model';
import { SubscriptionsContainer } from '../subscriptions-container';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuthenticated$ = this.authService.isAuthenticated;
  public subscriptions = new SubscriptionsContainer();
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.dispose();
  }

  public logout(): void {
    this.subscriptions.add = this.authService
      .logout()
      .subscribe(() => this.router.navigate(['/auth']));
  }
}
