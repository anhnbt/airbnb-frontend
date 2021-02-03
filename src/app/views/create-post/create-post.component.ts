import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HomeService} from './home.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPost: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
    pricePerNight: new FormControl('', [Validators.required]),
    // roomtype: new FormControl(),
    // city: new FormControl(),
    address: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(250)]),
    numBathrooms: new FormControl('', [Validators.required, Validators.min(1)]),
    numBedrooms: new FormControl('', [Validators.required, Validators.min(1)]),
    description: new FormControl(),
  });

  constructor(private homeService: HomeService) {
  }

  ngOnInit(): void {
  }

  submitPost(): any {
    console.log(this.createPost.value);
    this.homeService.save(this.createPost.value).subscribe((res: any) => {
      console.log(res.data);
    });
  }
}
