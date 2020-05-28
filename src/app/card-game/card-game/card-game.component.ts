import { Component, OnInit } from '@angular/core';
import { CardsListService } from 'src/app/card-manager/services/cards-list.service';
import { MarvelCard } from 'src/app/models/marvelcard.interface';
import { map } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.scss']
})
export class CardGameComponent implements OnInit {

  private START_ENERGY = 25;
  private DECK_START_CARDS = 12;
  private START_DOUBLE_CARDS = 2;
  private HEROES_CARDS = [];
  private VILLAINS_CARDS = [];
  private BATTLE_CARDS = [];
  private GROUP_CARDS = [];
  private COMIC_CARDS = [];
  public CURRENT_ROUND = 1;
  private computerHand = false; // If computer played his hand in current turn
  private playerHand = false; // Same above for player
  private roundStarter = 'player'; // Rnd later
  public playerDoubled = false; // if player played a double card
  public playerDoubleCards = this.START_DOUBLE_CARDS;
  public computerDoubleCards = this.START_DOUBLE_CARDS;
  public playerEnergy = this.START_ENERGY;
  public computerEnergy = this.START_ENERGY;
  public playerDeck = [];
  public computerDeck = [];
  public playerCardsHand = [];
  public computerCardsHand = [];
  public currentRoundTurn = 'player';
  private modalRef: NgbModalRef;
  
  public playerHandPowers = {
    attack: 0,
    defense: 0
  };

  public computerHandPowers = {
    attack: 0,
    defense: 0
  }

  public loading = true;

  constructor(private cardListService: CardsListService, private readonly modalService: NgbModal) { 
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

  openGameEndModal(winner: string): void {
    this.modalRef = this.modalService.open(ConfirmationModalComponent, {size: 'xl'});
    this.modalRef.componentInstance.title = 'GAME END';
    this.modalRef.componentInstance.message = winner;
    this.modalRef.componentInstance.confirmText = 'Play again';
    this.modalRef.componentInstance.cancelText = 'End';
    this.modalRef.componentInstance.confirmed.subscribe(() => console.log('said yes'));
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

  playCard(type: string = null): void {
    if (type === 'double') {
      this.playerDoubled = true;
      this.playerDoubleCards -= 1;
    }
    const lastcard = this.playerCardsHand.push(this.playerDeck.shift());
    this.playerCardsHand[lastcard - 1].roundAdded = this.CURRENT_ROUND;
    this.playerHand = true;
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

  endHand(who: string): void {
    switch (who) {
      case 'player':
        this.playerHand = true;
      break;

      case 'computer':
        this.computerHand = true;
      break;
      default:
        break;
    }

    if (this.playerHand && this.computerHand) { 
      console.log('run ConfrontCards');
      this.currentRoundTurn = null;
      this.confrontCards();
    };

    if (this.playerHand && !this.computerHand) {
      this.currentRoundTurn = 'computer';
       this.computerPlayTurn();
    }

    if (this.computerHand && !this.playerHand) {
      this.currentRoundTurn = 'player';
    }
  }

  computerPlayTurn(): void {
    const lastcard = this.computerCardsHand.push(this.computerDeck.shift());
    this.computerCardsHand[lastcard -1].roundAdded = this.CURRENT_ROUND;
    this.computerHand = true;
    this.updateComputerTurnPower();
  }

  updateComputerTurnPower(): void {
    this.computerHandPowers.attack = 0;
    this.computerHandPowers.defense = 0;

    this.computerCardsHand.forEach(card => {
      this.computerHandPowers.attack += card.attack;
      this.computerHandPowers.defense += card.defense;
    });

    this.sleep(3000).then( ()=> {
      this.endHand('computer');
    });
    
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

  confrontCards(): void {
    // who starts ?
    let opResult = 0;
    // who attacks first (round starter) has a chance to strike out the opponent card(s)
    if (this.roundStarter === 'player') {

      if(this.playerHandPowers.attack > this.computerHandPowers.defense) {
        opResult = this.playerHandPowers.attack - this.computerHandPowers.defense;
        
        //is it double the defense? to strike out ?
        if (opResult >= this.computerHandPowers.defense) {
          this.computerCardsHand = [];
        }
        this.computerEnergy -= opResult;
      } else {
        // whoever attacks first and cant attack opponent, get hit back by opponent defense
        this.playerEnergy -= this.computerHandPowers.defense - this.playerHandPowers.attack;
       this.exhaustDefender('computer');
      }

      this.startNewRound('computer');

    } else {
      if(this.computerHandPowers.attack > this.playerHandPowers.defense) {
        opResult = this.computerHandPowers.attack - this.playerHandPowers.defense;
        
        //is it double the defense? to strike out ?
        if (opResult >= this.playerHandPowers.defense) {
          this.playerCardsHand = [];
        }
        this.playerEnergy -= opResult;
      } else {
        // whoever attacks first and cant attack opponent, get hit back by opponent defense
        this.computerEnergy -= this.playerHandPowers.defense - this.computerHandPowers.attack;
        this.exhaustDefender('player');
      }
      this.startNewRound('player');

    }

  }

  startNewRound(who: string): void {
    this.CURRENT_ROUND += 1;
    this.currentRoundTurn = who;
    this.computerHand = false;
    this.playerHand = false;
    this.playerDoubled = false;
    this.roundStarter = who;

    this.playersCanPlay();

    this.exhaustPlayersCards();

    if (who === 'computer') {
      this.computerPlayTurn();
    }
  }


  exhaustDefender(who: string): void {
    //  "card gets tired" by lasting one less round
    if (who === 'computer') {
       this.reduceCardsRound(this.computerCardsHand);
    } else {
      this.reduceCardsRound(this.playerCardsHand);
    }
  }

  exhaustPlayersCards(): void {

   this.removeCards(this.playerCardsHand, 'player');
   this.removeCards(this.computerCardsHand, 'computer');


  }

  private removeCards(cardArray: any, who: string): void {
    let attackReducer = 0, defenseReducer = 0;
    cardArray.forEach((card, index) => {
      const exhaustFactor = this.CURRENT_ROUND - card.roundAdded;
      if (exhaustFactor > 3) {
        const removedCard = cardArray.splice(index, 1);
        attackReducer += removedCard[0].attack;
        defenseReducer += removedCard[0].defense;
      }
    });
    if (who === 'player') {
      this.playerHandPowers.attack -= attackReducer;
      this.playerHandPowers.defense -= defenseReducer;
    } else {
      this.computerHandPowers.attack -= attackReducer;
      this.computerHandPowers.defense -= defenseReducer;
    }
  }

  private reduceCardsRound(cardsArray: any): void {
    cardsArray.forEach((card) => {
      card.roundAdded --;
    });
  }

  private playersCanPlay(): void {
    if (this.playerEnergy <= 0) {
      this.openGameEndModal('Computer Wins');
    } else if (this.computerEnergy <= 0) {
      this.openGameEndModal('Player Wins');
    }

  }

}
