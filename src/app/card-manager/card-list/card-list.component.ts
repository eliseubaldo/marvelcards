import { Component, OnInit } from '@angular/core';
import { CardsListService } from '../services/cards-list.service';
import { MarvelCard } from 'src/app/models/marvelcard.interface';
import { DeleteCardService } from '../services/delete-card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  cardList = [];
  loading = true;
  constructor(private readonly cardService: CardsListService, private deleteCardService: DeleteCardService) {
  }

  ngOnInit() {
    this.cardService.getCardList().subscribe({
      next: data => {
        this.cardList = data; 
        this.loading = false; 
        console.log(this.cardList)},
      error: error => console.log('error', error),
      complete: ()=> console.log()
    });
  }

  deleteCard(cardId): void {
    // TODO: modal are you sure to delete ?
    this.deleteCardService.deleteCard(cardId).subscribe({
      next: data => console.log(data),
      error: error => console.log('error', error),
      complete: ()=> console.log('complete')
    });
  }

}
