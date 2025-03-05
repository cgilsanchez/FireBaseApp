import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  standalone:false,
  
})
export class SplashComponent implements OnInit {
  @Input() showSplash: boolean = true; 

  ngOnInit(): void {
    setTimeout(() => {
      this.showSplash = false; 
    }, 3000);
  }
}