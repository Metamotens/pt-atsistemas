import { Component } from '@angular/core';
import { fromEvent } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    fromEvent(document, 'click')
      .subscribe(
        (event: Event) => {
          const isMenu = (event.target as HTMLElement).id.includes('sidebar')
            || (event.target as HTMLElement).id.includes('navbar')
            || (event.target as HTMLElement).id.includes('menu');

          if (!isMenu) {
            const sidebar = document.getElementById('sidebar');
            if (sidebar && !sidebar.classList.contains('-translate-x-full')) {
              sidebar.classList.add("-translate-x-full")
            }
          }
        }
      );
  }
}
