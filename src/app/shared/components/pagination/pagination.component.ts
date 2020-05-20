import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() totalCount: number = 0;

  @Input() amountPerPage: number = 0;

  @Output() skipToPage: EventEmitter<number> = new EventEmitter();

  public paginationSteps = [];
  public currentPage = 1;
  public totalPages: number;

  constructor() {}

  ngOnInit() {
    this.setPaginationSteps();
    
  }

  setPaginationSteps(): void {
    const remainder = this.totalCount / this.amountPerPage;
    this.totalPages =  Math.round(this.totalCount / this.amountPerPage);
    if(remainder > this.totalPages) {
      this.totalPages += 1;
    }
    this.paginationSteps = Array.from(Array(this.totalPages),(x,i)=>i+1);
  }

  moveToPage(index: number): void {
    this.skipToPage.emit(index);
    this.currentPage = index;
  }

}
