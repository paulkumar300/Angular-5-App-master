import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { 
    this.getHeroList();
  }

  ngOnInit(): void {
    //this.getHeroList();
  }
  getHeroList(){
    this.heroService.getHeroes()
    .then(heroes => {
      localStorage.setItem('hero', JSON.stringify(heroes));
      heroes = JSON.parse(localStorage.getItem('hero'));
      this.heroes = heroes.slice(0, 8)
    });
  }
}