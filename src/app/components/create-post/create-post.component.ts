import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RoomService} from '../../services/room.service';
import {ProvinceService} from '../../services/province.service';
import {PropertyTypeService} from '../../services/property-type.service';
import {Observable} from 'rxjs';
import {DialogContentComponent} from '../layout/dialog-content/dialog-content.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {RoomImageService} from '../../services/room-image.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  provinceList: any;
  propertyTypeList: any;

  images: string[] = [];
  imagesFirebase = {
    imageUrl: ''
  };

  fileList: any = [];
  newFileList: any = [];
  uploadPercent: Observable<number>;

  firstFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    pricePerNight: new FormControl('', [Validators.required]),
    propertyType: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    province: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(250)]),
    totalOfBedroom: new FormControl('', [Validators.required, Validators.min(1)]),
    totalOfBathroom: new FormControl('', [Validators.required, Validators.min(1)]),
    description: new FormControl(),
  });

  secondFormGroup = this.fb.group({
    image: [null, Validators.required],
    imageSource: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private provinceService: ProvinceService,
    private propertyTypeService: PropertyTypeService,
    private roomImageService: RoomImageService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private storage: AngularFireStorage,
  ) {
  }

  ngOnInit(): void {
    // this.roomService.getAll().subscribe((res: any) => {
    //   console.log(res.data);
    // });
    this.provinceService.getAll().subscribe((res: any) => {
      this.provinceList = res.data;
    });
    this.propertyTypeService.getAll().subscribe((res: any) => {
      this.propertyTypeList = res.data;
    });
  }

  submitPost(): any {
    console.log(this.firstFormGroup.value);
    this.roomService.save(this.firstFormGroup.value).subscribe((res: any) => {
      console.log(res.data);
      this.openSnackBar('Upload nhà thành công', 'Close');
      for (const file of this.newFileList) {
        this.uploadFile(file);
      }
    });
  }

  uploadFile(file: File): void {
    // const file = event.target.files[0];
    const filePath = `${file.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    // const filePath = `${this.product.name}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(async url => {
          this.imagesFirebase.imageUrl = url;
          await this.roomImageService.save(this.imagesFirebase).subscribe(res => {
            this.openSnackBar('Upload ảnh thành công', 'Close');
          });
        });
      })
    )
      .subscribe();
  }


  showPreview(event: Event): void {
    if (this.newFileList.length === 0) {
      this.fileList = (event.target as HTMLInputElement).files;
      this.newFileList = Array.from(this.fileList);
    } else {
      // @ts-ignore
      for (const file of (event.target as HTMLInputElement).files) {
        this.newFileList.push(file);
      }
    }
    console.log(this.newFileList);
    this.images = [];
    if (this.fileList && this.fileList.length) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.newFileList.length; i++) {
        const file: File = this.newFileList[i];
        // Kiểm tra nếu không phải là ảnh
        if (!file.type.startsWith('image/')) {
          continue;
        }
        // Kiểm tra nếu kích thước ảnh vượt quá 1Mb
        if (file.size > 1024000 * 5) {
          this.openSnackBar('Ảnh có kích thước không quá 1MB', 'Close');
          continue;
        }
        const reader = new FileReader();
        reader.onload = (evt: any) => {
          this.images.push(evt.target.result);

          this.secondFormGroup.patchValue({
            imageSource: file
          });
          this.secondFormGroup.get('imageSource').updateValueAndValidity();
        };
        reader.readAsDataURL(file);
      }
    }
    event.preventDefault();
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  openConfirmDialog(index: number): void {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '250px',
      data: {title: 'Xác nhận', content: 'Bạn có muốn xoá ảnh này?', confirm: 'Xóa', close: 'Hủy'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.images.splice(index, 1);
        this.newFileList.splice(index, 1);
        console.log(this.newFileList);
      }
    });
  }

  onSubmit(): void {
    this.submitPost();
  }
}
