import { ServiceService } from './services/service.service';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './pages/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'WelfastHearing';
  showNavbar = true;
  constructor(private navbarService: ServiceService) { }

   ngOnInit() {
    // Subscribe to navbar visibility changes
    this.navbarService.navbarVisible$.subscribe(visible => {
 console.log(visible);

      this.showNavbar = visible;
    });
  }
}
