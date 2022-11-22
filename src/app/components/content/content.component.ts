import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass']
})
export class ContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true); //third parameter
  }

  scroll = (event: any): void => {
    console.log("scroll ====>", window.scrollY);
    let position = window.scrollY

    if (position != 0) {
      window.scrollTo(0,-100000)
    }
    else{
      window.scrollTo(0,100000)
    }
    // window.scroll(0, 0);
  };

}
