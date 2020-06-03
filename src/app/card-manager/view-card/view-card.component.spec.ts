import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCardComponent } from './view-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ViewCardService } from '../services/view-card.service';

describe('ViewCardComponent', () => {
  let component: ViewCardComponent;
  let fixture: ComponentFixture<ViewCardComponent>;

  let viewCardService: ViewCardService;
  const paramsMock = Observable.create((observer) => {    
    observer.next({    
    id: '1'    
    });    
    observer.complete();    
   });   

   const mockData = {
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCardComponent ],
      imports: [SharedModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: ActivatedRoute, useValue: { params: paramsMock, snapshot: {} } },
        {provide: ViewCardService, useValue: {
          getCard: (id) => of(mockData)
        }},
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(async() => {
    fixture = TestBed.createComponent(ViewCardComponent);
    component = fixture.componentInstance;
    viewCardService = TestBed.get(ViewCardService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('viewCardService should get  card from service', () => {
    spyOn(viewCardService, 'getCard').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    expect(viewCardService.getCard).toHaveBeenCalledWith('1');
  });
});
