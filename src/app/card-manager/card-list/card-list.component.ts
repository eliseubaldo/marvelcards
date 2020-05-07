import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { MarvelCard } from 'src/app/models/marvelcard.interface';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  cardList: MarvelCard[];
  constructor(private readonly cardService: CardsService) {
  }

  ngOnInit() {
    this.cardService.getCardList().subscribe({
      next: data => this.cardList = data,
      error: error => console.log('error', error),
      complete: ()=> console.log()
    });
  }

}
