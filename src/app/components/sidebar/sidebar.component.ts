
import { Component, OnInit } from '@angular/core';
import { ObservableService } from 'src/app/services/observable/observable.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
  selectedPage$ = this.observableService.selectedPage$

  constructor(private observableService: ObservableService,) { }

  ngOnInit(): void {

  }

}
