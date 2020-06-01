import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input
} from '@angular/core';
import {
  NgbActiveModal
} from '@ng-bootstrap/ng-bootstrap';
import {
  CardsListService
} from 'src/app/card-manager/services/cards-list.service';
import {
  map
} from 'rxjs/operators';


@Component({
  selector: 'app-combine-cards-modal',
  templateUrl: './combine-cards-modal.component.html',
  styleUrls: ['./combine-cards-modal.component.scss']
})
export class CombineCardsModalComponent implements OnInit {

  @Input()
  public combineWithCard: string;

  @Output()
  public selectedCards: EventEmitter < string > = new EventEmitter();

  cardList = [];
  loading = true;


  constructor(private activeModal: NgbActiveModal, private readonly cardService: CardsListService) {

    this.cardService.getCardList()
      .pipe(
        map(card => card.filter(card => card.cardtype === 'single'))
      )
      .subscribe({
        next: data => {
          this.cardList = data;
          this.loading = false;
        },
        error: error => console.log('error', error),
        complete: () => console.log()
      });
  }


  ngOnInit() {}

  joinCombinations(): string {
    const values = [];
    this.cardList.map(card => {
      if (card.selected) {
        values.push(card.name)
      }
    });
    return values.toString()
  }

  public confirm(): void {
    this.activeModal.dismiss();
    this.selectedCards.emit(this.joinCombinations());
  }

  public cancel(): void {
    this.activeModal.dismiss();
  }
}
