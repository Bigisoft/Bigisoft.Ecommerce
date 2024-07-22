import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-msg-modal',
  standalone: true,
  imports: [],
  templateUrl: './msg-modal.component.html',
  styleUrl: './msg-modal.component.css'
})
export class MsgModalComponent implements OnInit {
  @Input() message: string = '';
  @Output() modalClose = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {

  }

  modalCloseClicked() {
    this.modalClose.emit(true);
  }
}
