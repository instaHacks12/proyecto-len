import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RickAndMortyService } from './services/rick-and-morty.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  characters: any[] = [];

  constructor(private rickAndMortyService: RickAndMortyService) {}

    ngOnInit(): void {
      this.rickAndMortyService.getCharacters().subscribe(data => {
        this.characters = data.results;
      });
    }
    @HostListener('window:scroll', [])
    onScroll(): void {
      const title = document.getElementById('animatedTitle');
      if (title) {
        const scrollY = window.scrollY;
        const scale = Math.max(1, 2 - scrollY / 300);
        const opacity = Math.max(0.5, 1 - scrollY / 500);
        title.style.transform = `scale(${scale})`;
        title.style.opacity = `${opacity}`;
      }
    }
  }