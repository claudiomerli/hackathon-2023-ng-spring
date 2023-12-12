import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-form-answer-visualizer',
  templateUrl: './form-answer-visualizer.component.html',
  styleUrls: ['./form-answer-visualizer.component.css']
})
export class FormAnswerVisualizerComponent implements OnInit{

  @Input() idAnswer: string = "";
  formJson: any;



  ngOnInit(): void {
  }

}
