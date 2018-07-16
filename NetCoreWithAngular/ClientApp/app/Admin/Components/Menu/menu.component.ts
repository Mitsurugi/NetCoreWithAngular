import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent {
    isExpanded = false;
    role: string;

    collapse() {
        this.isExpanded = false;
    }

    toggle() {
        this.isExpanded = !this.isExpanded;
    }
}