import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  standalone:false,
  
})
export class SplashComponent implements OnInit {
  @Input() showSplash: boolean = true; // Permite controlar si el Splash debe mostrarse

  ngOnInit(): void {
    setTimeout(() => {
      this.showSplash = false; // Oculta el Splash después de 3 segundos
    }, 3000);
  }
}