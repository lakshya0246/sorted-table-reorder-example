import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'removable-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
  @Input() title: string = '';
  @Output() remove: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
