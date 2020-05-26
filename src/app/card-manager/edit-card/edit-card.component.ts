import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common' 
import { ViewCardService } from '../services/view-card.service';
import { MarvelCard } from 'src/app/models/marvelcard.model';
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
    this.form.get('imagefront').disable();
    this.form.get('imageback').disable();
  }

  generateGroupAffiliations(): void {
    if (this.form.get('affiliation').value) {
      const affiliationValues = this.form.get('affiliation').value.split(',');
      this.affiliationsArray = affiliationValues.map( value => {
        return { 'name': value, 'selected': true }
      });

    }
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
        this.editCardService.updateCard(this.form.value._id, this.form.getRawValue()).subscribe({
          next: data => {
            if (this.previewCardFrontImage || this.previewCardBackImage) {
              this.submitPictures();
            } else {
              this.showSuccessToast();
              console.log('finished:', data);
              this.loading = false;
            }
          },
          error: error => console.log(error),
          complete: ()=> console.log('completed')
        });
      } else {
          this.addCardService.addCard(this.form.getRawValue()).subscribe({
            next: data => {
              this.submitPictures();
            },
            error: error => console.log(error),
            complete: ()=> console.log('completed')
          });
      }
      
    } else {
      this.form.markAllAsTouched();
    }
  }

  submitPictures(): void {
    const formData = new FormData();
    this.fileData.forEach((file,index) => formData.append('file'+index, file));
    formData.forEach((value,key) => {
      console.log(key+" "+value)
    });
    this.addCardService.addImages(formData).subscribe({
      next: data => {
        this.showSuccessToast();
        console.log('finished:', data);
        this.loading = false;
      },
      error: error => console.log('error:',error),
      complete: ()=> console.log('completed')
    });
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
    console.log('raw value:', this.form.getRawValue());
    console.log(this.affiliationsArray);
    this.setGroupAffiliations();
  }

  fileProgress(fileInput: any, cardSide: string): void {
    switch (cardSide) {
      case 'front':
        this.fileData[0] = <File>fileInput.target.files[0];
        console.log('filedata: ',this.fileData);
         this.previewImage(this.fileData[0], cardSide);
         this.form.get('imagefront').patchValue(this.fileData[0].name)
        break;
      case 'back':
        this.fileData[1] = <File>fileInput.target.files[0];
        console.log('filedata: ',this.fileData);
         this.previewImage(this.fileData[1], cardSide);
         this.form.get('imageback').patchValue(this.fileData[1].name)
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

  showPreviewFrontImage(): boolean {
    return this.pageMode === 'edit-card' && !this.previewCardFrontImage;
  }

  showPreviewBackImage(): boolean {
    return this.pageMode === 'edit-card' && !this.previewCardBackImage;
  }

}
