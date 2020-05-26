import { Component, OnInit } from '@angular/core';
import { CardsListService } from 'src/app/card-manager/services/cards-list.service';
import { MarvelCard } from 'src/app/models/marvelcard.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.scss']
})
export class CardGameComponent implements OnInit {

  private START_ENERGY = 100;
  private DECK_START_CARDS = 12;
  private START_DOUBLE_CARDS = 2;

  private HEROES_CARDS = [];
  private VILLAINS_CARDS = [];
  private BATTLE_CARDS = [];
  private GROUP_CARDS = [];
  private COMIC_CARDS = [];

  public playerEnergy = this.START_ENERGY;
  public computerEnergy = this.START_ENERGY;
  public playerDeck = [];
  public computerDeck = [];
  public playerCardsHand = [];
  public computerCardsHand = [];

  public playerHandPowers = {
    attack: 0,
    defense: 0
  };

  public computerHandPowers = {
    attack: 0,
    defense: 0
  }


  public loading = true;

  constructor(private cardListService: CardsListService) { 
    this.cardListService.getCardList().subscribe({
      next: data => {
        this.filterCards(data);
        this.setPlayersDeck();
        this.loading = false;
      },
      error: error => console.log('error:', error),
      complete: ()=> console.log('complete')
    });
  }

  ngOnInit() {
    
  }

  filterCards(cardList: MarvelCard[]): void {
    console.log(cardList);

    this.HEROES_CARDS = cardList.filter((card: any) => {
      if (card.cardtype === 'single' && card.alignment === 'hero') {
        card.picked = false;
        return card
      }
    });

    this.VILLAINS_CARDS = cardList.filter((card: any ) => {
      if (card.cardtype === 'single' && card.alignment === 'villain') {
        card.picked = false;
        return card
      }
    });

    this.shuffleAndResetCards();


    console.log('heroes', this.HEROES_CARDS);
    console.log('villains ', this.VILLAINS_CARDS)
  }

  shuffleAndResetCards(): void {
    this.HEROES_CARDS.sort((card)=> {
      card.picked = false;
      return Math.round(Math.random()) - 0.5
    });

    this.VILLAINS_CARDS.sort((card)=> {
      card.picked = false;
      return Math.round(Math.random()) - 0.5
    });
  }

  setPlayersDeck(): void {
    this.HEROES_CARDS.forEach((card,index) => {
      if(index < this.DECK_START_CARDS) {
        this.playerDeck.push(card);
      }
    });

    this.VILLAINS_CARDS.forEach((card,index) => {
      if(index < this.DECK_START_CARDS) {
        this.computerDeck.push(card);
      }
    });

    console.log('playerdeck:', this.playerDeck);
    console.log('computerdeck: ', this.computerDeck);
  }

  playCard(): void {
    this.playerCardsHand.push(this.playerDeck.shift());
    this.updatePlayerTurnPower();


    
  }

  updatePlayerTurnPower(): void {
    this.playerHandPowers.attack = 0;
    this.playerHandPowers.defense = 0;

    this.playerCardsHand.forEach(card => {
      this.playerHandPowers.attack += card.attack;
      this.playerHandPowers.defense += card.defense;
    })

  }

}
