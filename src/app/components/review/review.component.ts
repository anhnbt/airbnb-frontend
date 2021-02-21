import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ReviewService} from '../../services/review.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Observable} from 'rxjs';
import {UserService} from "../../services/user.service";
import {BookingService} from "../../services/booking.service";
import {LocalStorageService} from "../../services/localStorage.service";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviews: Observable<any>;
  dataSource: any;
  checkReview = true;
  ratingArr = [1, 2, 3, 4, 5];
  myForm: FormGroup = new FormGroup({
    reviewBody: new FormControl(''),
    rating: new FormControl('')
  });
  star = this.myForm.value.rating;
  booking = {};

  @Input() childId: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private reviewService: ReviewService,
              private fb: FormBuilder,
              private changeDetectorRef: ChangeDetectorRef,
              private userService: UserService,
              private bookingService: BookingService,
              private local: LocalStorageService
  ) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      reviewBody: [''],
      rating: ['']
    });
    this.loadData();
  }

  send(): void {
    console.log(this.myForm.get('reviewBody').value);
    console.log(this.myForm.get('rating').value);

    this.bookingService.getBookingByRoomAndByUser(this.childId, this.local.get(localStorage.key(0)).id)
      .subscribe(res => {
        this.booking = res.data;
        console.log(this.booking);
        this.reviewService.save(this.myForm.get('reviewBody').value, this.myForm.get('rating').value, this.booking).subscribe(res => {
          console.log(res.data);
          this.loadData();
          this.myForm.reset();
        });
        // console.log(this.local.get(localStorage.key(0)).id);
      });
  }

  loadData(): void {
    if (this.local.get(localStorage.key(0)) != null) {
      this.bookingService.getBookingByRoomAndByUser(this.childId, this.local.get(localStorage.key(0)).id)
        .subscribe(res => {
          if (res.data != null) {
            this.checkReview = false;
          } else {
            this.checkReview = true;
          }
        });
    } else {
      this.checkReview = true;
    }
    this.reviewService.getAll(this.childId).subscribe(res => {
      this.dataSource = new MatTableDataSource(res.data);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.reviews = this.dataSource.connect();
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
    switch (rating) {
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
