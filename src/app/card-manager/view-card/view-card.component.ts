import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  ViewCardService
} from '../services/view-card.service';
import {
  MarvelCard
} from 'src/app/models/marvelcard.interface';



@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.scss']
})
export class ViewCardComponent implements OnInit {
  card$: MarvelCard;
  loading = true;
  constructor(private route: ActivatedRoute, private viewCardService: ViewCardService) {
   
  }

  ngOnInit() {
    let id;
    this.route.params.subscribe(params => {
      id = params.id;   
    });
    this.viewCardService.getCard(id).subscribe({
      next: data => {
        this.card$ = data;
        this.loading = false;
      },
      error: error => console.log(error),
      complete: () => console.log('completed')
    });
  }

}
