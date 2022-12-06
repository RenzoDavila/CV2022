import { Component, Input, OnInit } from '@angular/core';
import { ObservableService } from 'src/app/services/observable/observable.service';

@Component({
  selector: 'app-pixel',
  templateUrl: './pixel.component.html',
  styleUrls: ['./pixel.component.sass']
})
export class PixelComponent implements OnInit {
  selectedPage$ = this.observableService.selectedPage$
  @Input() main:any
  @Input() experience:any
  @Input() projects:any
  @Input() studies:any

  constructor(private observableService: ObservableService,) { }

  ngOnInit(): void {
  }

}
