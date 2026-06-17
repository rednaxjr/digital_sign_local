import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {
  sidebarOpen = true;

  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
    { label: 'Employees', icon: 'people', route: '/admin/employees' },
    { label: 'DTR Files', icon: 'description', route: '/admin/dtr' },
  ];

  constructor(public auth: AuthService) {}

  get currentUser() { return this.auth.getUser(); }

  toggleSidebar() { this.sidebarOpen = !this.sidebarOpen; }

  logout() { this.auth.logout(); }
}
