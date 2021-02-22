import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogContentComponent} from '../../layout/dialog-content/dialog-content.component';
import {FormBuilder, Validators} from '@angular/forms';
import {Room} from '../../../models/room';
import {RoomService} from '../../../services/room.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-update',
  templateUrl: './dialog-update.component.html',
  styleUrls: ['./dialog-update.component.css']
})
export class DialogUpdateComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Room,
    private roomService: RoomService) {
  }

  myForm = this.fb.group({
    cancelled: [false, Validators.required]
  });

  ngOnInit(): void {
    this.myForm.patchValue({
      cancelled: this.data.cancelled
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const cancelled = this.myForm.get('cancelled').value;
    this.roomService.cancelled(this.data.id, cancelled).subscribe(res => {
      console.log(res);
      this.openSnackBar('Cập nhật thành công!', 'Close');
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

}
