import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @ViewChild("showHideMenu") sidenav!: ElementRef;

  constructor() {
  }

  showHide() {
    this.sidenav.nativeElement.classList.toggle("-translate-x-full")
  }
}
