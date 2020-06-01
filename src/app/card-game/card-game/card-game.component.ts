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
  
  // Animation Conditionals
  public runPlayerAnimation = false;
  public runComputerAnimation = false;
  public computerDealCardAnimation = false;
  public playerDealCardAnimation = false;
  public playerRemoveCardAnimaton = false;
  public computerRemoveCardAnimaton = false;

  private roundResults =  {
    roundStarter: null, 
    strikeOut: null, 
    energyLost: null, 
    attackResult: null
  }
  
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

  openConfrontResultModal(message: string): void {
    this.modalRef = this.modalService.open(ConfirmationModalComponent, {size: 'l'});
    this.modalRef.componentInstance.title = 'Confront Result';
    this.modalRef.componentInstance.message = message;
    this.modalRef.componentInstance.confirmText = 'Continue';
    this.modalRef.componentInstance.cancelText = null;
    this.modalRef.componentInstance.confirmed.subscribe(() => this.applyConfrontResults());
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
    this.playerDealtCardAnimation();
    const lastcard = this.playerCardsHand.push(this.playerDeck.shift());
    this.playerCardsHand[lastcard - 1].roundAdded = this.CURRENT_ROUND;
    this.playerHand = true;
    this.updatePlayerTurnPower();
  }

  playerDealtCardAnimation(): void {
    this.playerDealCardAnimation = true;
    this.sleep(1500).then( ()=> {
      this.playerDealCardAnimation = false;
    });
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
        this.playerDoubled = true;
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
    this.computerDealtCardAnimation();
    const lastcard = this.computerCardsHand.push(this.computerDeck.shift());
    this.computerCardsHand[lastcard -1].roundAdded = this.CURRENT_ROUND;
    this.computerHand = true;
    this.updateComputerTurnPower();
  }

  computerDealtCardAnimation(): void {
    this.computerDealCardAnimation = true;
    this.sleep(1500).then( ()=> {
      this.computerDealCardAnimation = false;
    });
  }

  updateComputerTurnPower(): void {
    this.computerHandPowers.attack = 0;
    this.computerHandPowers.defense = 0;

    this.computerCardsHand.forEach(card => {
      this.computerHandPowers.attack += card.attack;
      this.computerHandPowers.defense += card.defense;
    });

    this.sleep(2000).then( ()=> {
      this.endHand('computer');
    });
    
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

  confrontCards(): void {
    // who starts ?
    this.roundResults.roundStarter = this.roundStarter;
    // who attacks first (round starter) has a chance to strike out the opponent card(s)
    if (this.roundStarter === 'player') {

      if(this.playerHandPowers.attack > this.computerHandPowers.defense) {
        this.roundResults.attackResult = true;
        this.roundResults.energyLost = this.playerHandPowers.attack - this.computerHandPowers.defense;
        
        //is it double the defense? to strike out ?
        if (this.roundResults.energyLost > this.computerHandPowers.defense) {
          this.roundResults.strikeOut = true;
        }
      } else {
        this.roundResults.attackResult = false;
        // whoever attacks first and cant attack opponent, get hit back by opponent defense
        this.roundResults.energyLost = this.computerHandPowers.defense - this.playerHandPowers.attack;
       
      }

    } else {
      if(this.computerHandPowers.attack > this.playerHandPowers.defense) {
        this.roundResults.attackResult = true;
        this.roundResults.energyLost = this.computerHandPowers.attack - this.playerHandPowers.defense;
        
        //is it double the defense? to strike out ?
        if (this.roundResults.energyLost > this.playerHandPowers.defense) {
          this.roundResults.strikeOut = true;
        }
      } else {
        this.roundResults.attackResult = false;
        // whoever attacks first and cant attack opponent, get hit back by opponent defense
        this.roundResults.energyLost = this.playerHandPowers.defense - this.computerHandPowers.attack;
      }
    }

    this.confrontResults();
  }

  confrontResults(): void {
    let message: string = '';
    //show results
    // apply results graphically

      message += `Round attacker : ${this.roundResults.roundStarter}`;
      message += ` | Attack result : ${this.roundResults.attackResult}`;
      if (this.roundResults.attackResult) {
        message += ` | Defender energy lost: ${this.roundResults.energyLost}`;
        if (this.roundResults.strikeOut) {
          message += ` | Attacker more than double the defense, cards defeated and out`;
        }
      } else {
        message += ` | Attack failed, defender strike back, energy lost ${this.roundResults.energyLost}`;
        message += ' | Defender exhaust cards in play due to fatigue: will last one round less (out of 3)';
      }

      this.openConfrontResultModal(message);

  }

  applyConfrontResults(): void {
    if(this.roundResults.roundStarter === 'player') {
      if (this.roundResults.attackResult) {
        this.runComputerAnimation = true;
          this.computerEnergy -= this.roundResults.energyLost;
        if (this.roundResults.strikeOut) {
          this.computerRemoveCardAnimaton = true;
          this.sleep(1800).then( ()=> {
            this.computerCardsHand = [];
            this.computerRemoveCardAnimaton = false;
          });
        }
      } else {
        this.runPlayerAnimation = true;
        this.playerEnergy -= this.roundResults.energyLost;
        this.exhaustDefender('computer');
      }
      this.sleep(2200).then( ()=> {
        this.startNewRound('computer');
      });
      
    }
    if(this.roundResults.roundStarter === 'computer') {
      if (this.roundResults.attackResult) {
        this.runPlayerAnimation = true;
        this.playerEnergy -= this.roundResults.energyLost;

        if (this.roundResults.strikeOut) {
          this.playerRemoveCardAnimaton = true;
          this.sleep(1800).then( ()=> {
            this.playerCardsHand = [];
            this.playerRemoveCardAnimaton = false;
          });
            
        }
      } else {
        this.runComputerAnimation = true;
        this.computerEnergy -= this.roundResults.energyLost;
        this.exhaustDefender('player');
      }
      this.sleep(1800).then( ()=> {
        this.startNewRound('player');
      });
    }
  }

  startNewRound(who: string): void {
    this.CURRENT_ROUND += 1;
    this.currentRoundTurn = who;
    this.computerHand = false;
    this.playerHand = false;
    this.playerDoubled = false;
    this.roundStarter = who;
    this.runPlayerAnimation = false;
    this.runComputerAnimation = false;
    this.roundResults =  {
      roundStarter: null, 
      strikeOut: null, 
      energyLost: null, 
      attackResult: null
    }

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
