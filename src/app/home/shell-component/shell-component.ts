import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from 'src/app/animation';

@Component({
  selector: 'pm-shell-component',
  templateUrl: './shell-component.html',
  styleUrls: ['./shell-component.css'],
  animations: [slideInAnimation]
})
export class ShellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
