import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form } from '@angular/forms'

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: [ './heroes.component.css' ]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  showForm: boolean = false;
  heroId;
  heroName: String;
  notifyMessage = "";
  constructor(
    private router: Router,
    private heroService: HeroService) { }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => { 
      heroes = JSON.parse(localStorage.getItem('hero'));
      this.heroes = heroes
    });
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  addHeroes(){
    this.showForm = false;
    let tempObj = {};
    let heroes = JSON.parse(localStorage.getItem('hero'));
    tempObj['id'] =  heroes.length + 1;
    tempObj['name'] = this.heroName;
    heroes.push(tempObj);
    localStorage.setItem('hero', JSON.stringify(heroes));
    this.notifyMessage = "Heroes details added successfully"
    this.getHeroes();
    setTimeout(()=>{
      this.heroName = "";
      this.notifyMessage = "";
    }, 700);
  }
  removeHeroes(hero){
    let heroes = JSON.parse(localStorage.getItem('hero'));
    for(let i=0; i< heroes.length; i++){
      if(heroes[i]['id'] == hero['id']) {
        heroes.splice(i, 1);
      }
    }
    localStorage.setItem('hero', JSON.stringify(heroes));
    this.notifyMessage = "Heroes removed successfully"
    this.getHeroes();
    setTimeout(()=>{
      this.notifyMessage = "";
    }, 700);
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}