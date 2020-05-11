import { Component, OnInit } from '@angular/core';
import { CardsListService } from '../services/cards-list.service';
import { MarvelCard } from 'src/app/models/marvelcard.interface';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  cardList: MarvelCard[];
  constructor(private readonly cardService: CardsListService) {
  }

  ngOnInit() {
    this.cardService.getCardList().subscribe({
      next: data => {this.cardList = data; console.log(data)},
      error: error => console.log('error', error),
      complete: ()=> console.log()
    });
  }

}
