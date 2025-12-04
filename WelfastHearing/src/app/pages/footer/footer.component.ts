import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {

    // Handle #fragment scrolling
    this.route.fragment.subscribe(fragment => {
      if (!fragment || fragment.trim() === '') return; // ❗ Prevent invalid selector (#)

      const target = document.querySelector(`#${fragment}`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    // Scroll to top on route change
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, left: 0 });
      }
    });
  }
}
