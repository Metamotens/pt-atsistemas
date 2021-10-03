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

  show() {
    this.sidenav.nativeElement.classList.remove("-translate-x-full")
  }

  hide() {
    this.sidenav.nativeElement.classList.add("-translate-x-full")
  }
}
