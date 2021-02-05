import { Component, OnInit } from '@angular/core';
import {ReviewService} from '../../services/review.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  displayedColumns: string[] = ['rating', 'reviewBody'];
  dataSource: any;
  myForm: FormGroup = new FormGroup({
    reviewBody: new FormControl('')
  });
  constructor(private reviewService: ReviewService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      reviewBody: ['']
    });
    this.loadData();
  }

  send(): void{
    this.reviewService.save(this.myForm.value).subscribe(res => {
      this.loadData();
      console.log(res.data);
      this.myForm.reset();
    });
  }
  loadData(): void{
    this.reviewService.getAll().subscribe( res => this.dataSource = res.data);
  }
}
