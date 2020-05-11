import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ViewCardService } from '../services/view-card.service';
import { MarvelCard } from 'src/app/models/marvelcard.interface';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {
 public card$: MarvelCard;
 public form: FormGroup;
 public loading = true;
 public affiliationsArray = [];
 public extraGroup: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private viewCardService: ViewCardService) {
    const id = this.route.snapshot.params['id'];
    this.viewCardService.getCard(id).subscribe({
      next: data => {
        this.populateForm(data);
        this.generateGroupAffiliations();
        this.loading = false;
      },
      error: error => console.log(error),
      complete: ()=> console.log('completed')
    })
  }

  ngOnInit() {
  }
  
  populateForm(cardData: MarvelCard): void {
    this.form = this.fb.group({
      name: [cardData.name, Validators.required],
      attack: [cardData.attack, Validators.required],
      defense: [cardData.defense, Validators.required],
      combines: [cardData.combines],
      cardtype: [cardData.cardtype, Validators.required],
      alignment: [cardData.alignment, Validators.required],
      affiliation: [cardData.affiliation],
      imagefront: [cardData.imagefront, Validators.required],
      imageback: [cardData.imageback, Validators.required],
      _id: [cardData._id]
    });
    
    console.log(this.form)
  }

  generateGroupAffiliations(): void {
    const affiliationValues = this.form.get('affiliation').value;
    
    this.affiliationsArray = affiliationValues.split(',');
  }

  addGroup(value: string): void {
    this.affiliationsArray.push(value);
    this.extraGroup = ''; 
  }

  setGroupAffiliations(): void {
    const values = this.affiliationsArray.map( group => {

    })
    // this.form.patchValue({
    //   affiliation: value
    // })
  }



  seeform() {
    console.log(this.form);
  }

}
