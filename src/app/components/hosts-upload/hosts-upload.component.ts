import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DialogContentComponent} from '../layout/dialog-content/dialog-content.component';

@Component({
  selector: 'app-hosts-upload',
  templateUrl: './hosts-upload.component.html',
  styleUrls: ['./hosts-upload.component.css']
})
export class HostsUploadComponent implements OnInit {

  myGroup = this.fb.group({
    city: [null, Validators.required],
    images: [null, Validators.required]
  });
  imageSrc: string[] = [];
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    // const ref = this.storage.ref('images/no-image.jpg');
    // this.downloadURL = ref.getDownloadURL();
  }

  ngOnInit(): void {
  }

  get images(): AbstractControl {
    return this.myGroup.get('images');
  }

  uploadFile(event): void {
    const file = event.target.files[0];
    const filePath = 'name-your-file-path-here';
    // const filePath = `${this.product.name}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL())
    )
      .subscribe();
  }

  showPreview(event: Event): void {
    const fileList = (event.target as HTMLInputElement).files;
    if (fileList) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < fileList.length; i++) {
        const file: File = fileList.item(i);
        // Kiểm tra nếu không phải là ảnh
        if (!file.type.startsWith('image/')) {
          continue;
        }
        // Kiểm tra nếu kích thước ảnh vượt quá 1Mb
        if (file.size > 1024000) {
          this.openSnackBar('Ảnh có kích thước không quá 1MB', 'Close');
          continue;
        }
        const reader = new FileReader();
        reader.onload = () => {
          this.imageSrc.push(reader.result as string);
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
        this.imageSrc.splice(index, 1);
      }
    });
  }

  onSubmit(): void {
    console.log('Submit');
  }

}
