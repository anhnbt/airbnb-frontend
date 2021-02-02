import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-hosts-upload',
  templateUrl: './hosts-upload.component.html',
  styleUrls: ['./hosts-upload.component.css']
})
export class HostsUploadComponent implements OnInit {
  selectedImage: File;
  imageSrc: string[] = [];

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private storage: AngularFireStorage) {
    // const ref = this.storage.ref('images/no-image.jpg');
    // this.downloadURL = ref.getDownloadURL();
  }

  ngOnInit(): void {
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
    console.log(event);
    const fileList = (event.target as HTMLInputElement).files;
    if (fileList) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList.item(i);
        if (!file.type.startsWith('image/')) {
          continue;
        }
        const reader = new FileReader();
        reader.onload = () => {
          this.imageSrc.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onSubmit(): void {
    console.log('Submit');
  }

}
