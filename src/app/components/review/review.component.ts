import { Component, OnInit } from '@angular/core';
import {ReviewService} from '../../services/review.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  displayedColumns: string[] = ['rating', 'review_body'];
  dataSource: any;
  ratingArr = [1, 2, 3, 4, 5];
  myForm: FormGroup = new FormGroup({
    reviewBody: new FormControl(''),
    rating: new FormControl('')
  });
  star = this.myForm.value.rating;

  constructor(private reviewService: ReviewService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      reviewBody: [''],
      rating: ['']
    });
    this.loadData();
  }

  send(): void {
    this.reviewService.save(this.myForm.value).subscribe(res => {
      this.loadData();
      console.log(res.data.booking.user.username);
      this.myForm.reset();
    });
  }

  loadData(): void {
    this.reviewService.getAll().subscribe(res => {
      this.dataSource = res.data;
      console.log(this.dataSource);
    });
  }

  onClick(index: number): void {
    this.myForm.patchValue({
      rating: index /// vua nay dat ten sai
      // sua ratings thanh rating thoi ma
    });
  }

  showIcon(index: number): string {
    if (this.myForm.get('rating').value >= index) {
      // Sua dong 46 nua, may thieu .value
      return 'star';
    } else {
      return 'star_border';
    }
  }

  showRating(rating: number): string {
    switch (rating){
      case 1:
        return 'star';
        break;
      case 2:
        return 'star star';
        break;
      case 3:
        return 'star star star';
        break;
      case 4:
        return 'star star star star';
        break;
      case 5:
        return 'star star star star star ';
        break;
    }
  }
}
