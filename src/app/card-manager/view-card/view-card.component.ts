import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewCardService } from '../services/view-card.service';
import { MarvelCard } from 'src/app/models/marvelcard.interface';



@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.scss']
})
export class ViewCardComponent implements OnInit {
  card$: MarvelCard;
  loading = true;
  constructor(private route: ActivatedRoute, viewCardService: ViewCardService) { 
    const id = this.route.snapshot.params['id'];
    viewCardService.getCard(id).subscribe({
      next: data => {this.card$ = data; this.loading = false;},
      error: error => console.log(error),
      complete: ()=> console.log('completed')
    })
  }

  ngOnInit() {
    // https://www.thepixelhand.ca/projects/marvelcards/db-images/marvel-cards/s1_001_b.jpg
  }

}
