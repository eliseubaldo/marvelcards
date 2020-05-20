import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common' 
import { ViewCardService } from '../services/view-card.service';
import { MarvelCard } from 'src/app/models/marvelcard.interface';
import { EditCardService } from '../services/edit-card.service';
import { AddCardService } from '../services/add-card.service';
import { ToastService } from 'src/app/services/toast.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CombineCardsModalComponent } from 'src/app/shared/components/combine-cards-modal/combine-cards-modal.component';

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
 public pageMode: string;
 private modalRef: NgbModalRef;
 public fileData: File[] = [];
 public previewCardFrontImage: any = null;
 public previewCardBackImage: any = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private viewCardService: ViewCardService,
    private editCardService: EditCardService,
    private addCardService: AddCardService,
    public toastService: ToastService,
    private readonly modalService: NgbModal,
    ) {
    const id = this.route.snapshot.params['id'];
    this.route.url.subscribe({
      next: route => {
        this.pageMode = route[0].path;
      }
    });
    if(id) {
      this.viewCardService.getCard(id).subscribe({
        next: data => {
          this.populateForm(data);
          this.generateGroupAffiliations();
          this.loading = false;
        },
        error: error => console.log(error),
        complete: ()=> console.log('completed')
      })
    } else {
      this.populateForm();
      this.loading = false;
    }
  }

  ngOnInit() {
  }
  
  populateForm(cardData?: MarvelCard): void {
    if(cardData){
      this.form = this.fb.group(MarvelCard.getDefault(cardData));
    } else {
      this.form = this.fb.group(MarvelCard.getEmptyDefault());
    }
    this.setFormValidation();
  }

  setFormValidation(): void {
    this.form.get('name').setValidators(Validators.required);
    this.form.get('attack').setValidators(Validators.required);
    this.form.get('defense').setValidators(Validators.required);
    this.form.get('cardtype').setValidators(Validators.required);
    this.form.get('alignment').setValidators(Validators.required);
    this.form.get('imagefront').setValidators(Validators.required);
    this.form.get('imageback').setValidators(Validators.required);
    this.form.get('combines').disable();
  }

  generateGroupAffiliations(): void {
    const affiliationValues = this.form.get('affiliation').value.split(',');
    this.affiliationsArray = affiliationValues.map( value => {
      return { 'name': value, 'selected': true }
    });
    console.log(this.affiliationsArray)
  }

  addGroup(value: string): void {
    this.affiliationsArray.push({ 'name': value, 'selected': true });
    this.extraGroup = ''; 
    this.setGroupAffiliations();
  }

  setGroupAffiliations(): void {
    const values = [];
    this.affiliationsArray.map( group => {
          if (group.selected) {
            values.push(group.name)
          }
    });
   this.form.patchValue({
     affiliation: values.toString()
   })
  }

  submitForm(): void {
    
    if(this.form.valid) {

      this.loading = true;
      if (this.pageMode === 'edit-card') {
        this.editCardService.updateCard(this.form.value._id, this.form.value).subscribe({
          next: data => {
            this.showSuccessToast();
            console.log('finished:', data);
            this.loading = false;
          },
          error: error => console.log(error),
          complete: ()=> console.log('completed')
        });
      } else {
          this.addCardService.addCard(this.form.value).subscribe({
            next: data => {
              this.showSuccessToast();
              console.log('finished:', data);
              this.loading = false;
            },
            error: error => console.log(error),
            complete: ()=> console.log('completed')
          });
      }
      
    } else {
      this.form.markAllAsTouched();
    }
  }

  showSuccessToast(): void {
    this.toastService.show('Card Saved', { classname: 'bg-success text-light', delay: 5000 });
  }


  openCombineModal(): void {
    this.modalRef = this.modalService.open(CombineCardsModalComponent, {size: 'xl'});
    this.modalRef.componentInstance.combineWithCard = this.form.get('name').value;
    this.modalRef.componentInstance.selectedCards.subscribe((cards) => this.appendCombineCards(cards) );
  }

  appendCombineCards(cards: string): void {
    this.form.patchValue({
      combines: cards
    })
  }

  removeCombineCards(): void {
    this.form.patchValue({
      combines: null
    })
  }

  seeform() {
    console.log(this.form);
    console.log(this.affiliationsArray);
    this.setGroupAffiliations();
  }

  fileProgress(fileInput: any, cardSide: string): void {
    switch (cardSide) {
      case 'front':
        this.fileData[0] = <File>fileInput.target.files[0];
        console.log('filedata: ',this.fileData);
         this.previewImage(this.fileData[0], cardSide);
        break;
      case 'back':
        this.fileData[1] = <File>fileInput.target.files[0];
        console.log('filedata: ',this.fileData);
         this.previewImage(this.fileData[1], cardSide);
        break;
      default:
        break;
    } 
  }

  previewImage(file: File, cardSide: string) {
    // Show preview 
    var mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();      
    reader.readAsDataURL(file); 
    reader.onload = (_event) => {
      switch (cardSide) {
        case 'front':
          this.previewCardFrontImage = reader.result; 
          break;
        case 'back':
          this.previewCardBackImage = reader.result; 
          break;
        default:
          break;
      } 
    }
  }

}
