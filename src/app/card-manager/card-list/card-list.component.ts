import {
  Component,
  OnInit
} from '@angular/core';
import {
  CardsListService
} from '../services/cards-list.service';
import {
  MarvelCard
} from 'src/app/models/marvelcard.interface';
import {
  DeleteCardService
} from '../services/delete-card.service';
import {
  NgbModal,
  NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';
import {
  ConfirmationModalComponent
} from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import {
  ToastService
} from 'src/app/services/toast.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  cardList: MarvelCard[];
  loading = true;
  cardTotal = 0;
  cardsPerPage = 10;
  skipToPage = 0;
  updating = false;
  private modalRef: NgbModalRef;

  constructor(
    private readonly cardService: CardsListService,
    private deleteCardService: DeleteCardService,
    private readonly modalService: NgbModal,
    public toastService: ToastService
  ) {
    this.loadCardsList();
  }

  ngOnInit() {}

  loadCardsList(): void {
    this.cardService.getPaginatedCardList(this.cardsPerPage, this.skipToPage).subscribe({
      next: data => {
        console.log('paginated: ', data);
        this.cardList = data.data;
        this.cardTotal = data.totals.total;
        this.loading = false;
        this.updating = false;
      },
      error: error => console.log('error', error),
      complete: () => console.log()
    });
  }

  moveToPage(pagenumber: number): void {
    this.skipToPage = (pagenumber * this.cardsPerPage) - this.cardsPerPage;
    this.updating = true;
    this.loadCardsList();
  }

  deleteCard(cardId: string): void {
    this.loading = true;
    this.deleteCardService.deleteCard(cardId).subscribe({
      next: data => {
        this.showSuccessToast();
        this.loadCardsList();
      },
      error: error => console.log('error', error),
      complete: () => console.log('complete')
    });
  }

  setCardsPerPage(amount: number): void {
    this.cardsPerPage = amount;
    this.skipToPage = 0;
    this.loading = true;
    this.loadCardsList();
  }

  showSuccessToast() {
    this.toastService.show('Card was deleted', {
      classname: 'toast-comics',
      delay: 5000
    });
  }

  public openConfirmDeleteModal(cardId: string) {
    this.modalRef = this.modalService.open(ConfirmationModalComponent);
    this.modalRef.componentInstance.title = 'Delete';
    this.modalRef.componentInstance.message = `Are you sure you want to delete this record ?`;
    this.modalRef.componentInstance.confirmText = 'Confirm';
    this.modalRef.componentInstance.cancelText = 'Cancel';
    this.modalRef.componentInstance.confirmed.subscribe(() => this.deleteCard(cardId));
  }

}
