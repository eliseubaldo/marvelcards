import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListComponent } from './card-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardsListService } from '../services/cards-list.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { DeleteCardService } from '../services/delete-card.service';
import { ToastService } from 'src/app/services/toast.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';



describe('CardListComponent', () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;
  let cardListService: CardsListService;
  let deleteCardService: DeleteCardService;
  let toastService: ToastService;

  const mockData = {
    totals:{total: 1, count: 10, skip:0, max:10},
    data: [
      {
        affiliation: "spider-man",
        alignment: "hero",
        attack: 3,
        cardtype: "single",
        combines: "",
        defense: 3,
        imageback: "s1_002_b.jpg",
        imagefront: "s1_002_f.jpg",
        name: "Spider-Man",
        _id: "5eb1c05ce165ce2800003550",
      }
    ]
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardListComponent ],
      imports: [ SharedModule, RouterTestingModule, HttpClientTestingModule ],
      providers: [ 
        {provide: CardsListService, useValue: {
          getPaginatedCardList: () => of(mockData)
        }},
        {provide: DeleteCardService, useValue: {
          deleteCard: () => of('')
        }},
        {provide: ToastService, useValue: {
          show: () => {}
        }},
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListComponent);
    component = fixture.componentInstance;
    toastService = TestBed.get(ToastService);
    deleteCardService = TestBed.get(DeleteCardService);
    fixture.detectChanges();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(CardListComponent);
    component = fixture.componentInstance;
    cardListService = TestBed.get(CardsListService);
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loadCardsList should get paginated cards from service', () => {
    spyOn(cardListService, 'getPaginatedCardList').and.callThrough();
    component.loadCardsList();
    fixture.detectChanges();
    expect(cardListService.getPaginatedCardList).toHaveBeenCalledWith(10, 0);
  });

  it('setCardsPerPage should get paginated cards with passed amount', () => {
    spyOn(cardListService, 'getPaginatedCardList').and.callThrough();
    component.setCardsPerPage(20);
    fixture.detectChanges();
    expect(cardListService.getPaginatedCardList).toHaveBeenCalledWith(20, 0);
  });

  it('moveToPage should get paginated cards with passed amount', () => {
    spyOn(cardListService, 'getPaginatedCardList').and.callThrough();
    component.moveToPage(2);
    fixture.detectChanges();
    expect(cardListService.getPaginatedCardList).toHaveBeenCalledWith(10, 10);
  });

  it('deleteCard should call toast service when succeed', () => {
    spyOn(deleteCardService, 'deleteCard').and.callThrough();
    spyOn(toastService, 'show');
    component.deleteCard('1');
    fixture.detectChanges();
    expect(toastService.show).toHaveBeenCalled();
  });

  it('showSuccessToast should toast service', () => {
    spyOn(toastService, 'show');
    component.showSuccessToast();
    fixture.detectChanges();
    expect(toastService.show).toHaveBeenCalled();
  });
});
