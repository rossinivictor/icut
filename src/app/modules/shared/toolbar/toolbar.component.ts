import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public user: boolean;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  authCondition() {
    if (this.auth.enterprise) {
      this.user = true;
    }
    if (this.auth.user) {
      this.user = true;
    }
  }
}

