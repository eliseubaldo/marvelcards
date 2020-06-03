import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombineCardsModalComponent } from './combine-cards-modal.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CardsListService } from 'src/app/card-manager/services/cards-list.service';
import { of } from 'rxjs';

describe('CombineCardsModalComponent', () => {
  let component: CombineCardsModalComponent;
  let fixture: ComponentFixture<CombineCardsModalComponent>;
  let cardService: CardsListService;
  const mockData =  [
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
  ];
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombineCardsModalComponent, SpinnerComponent ],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [
        {provide: NgbActiveModal },
        {provide: CardsListService, useValue: {
          getCardList: () => of(mockData)
        }},
    
      ]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombineCardsModalComponent);
    component = fixture.componentInstance;
    cardService = TestBed.get(CardsListService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loadCardsList should get paginated cards from service', () => {
    spyOn(cardService, 'getCardList').and.callThrough();
    component.loadCards();
    fixture.detectChanges();
    expect(cardService.getCardList).toHaveBeenCalled();
  });
});
