import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownModule, CommonModule],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.css',
})
export class FormInputComponent implements OnInit {
  @Input() tableHeadersData: string[];

  constructor(private cd: ChangeDetectorRef) {}

  columnOptionData: string[];
  rulesForm: FormGroup;
  onSubmit: () => void;

  ngOnInit(): void {
    this.rulesForm = new FormGroup({
      column: new FormControl(''),
      valueType: new FormControl(''),
      filterValue: new FormControl(''),
      filterCondition: new FormControl(''),
      logicalOperator: new FormControl(''),
    });

    this.onSubmit = () => {
      console.log(this.rulesForm.value);
    };
  }

  // Define, customize, save, revert filter rules
  // Options: AND and OR
  // Field Type: Number, Text, Date
  // Field Condition: Greater Than, Greater Than or Equal To,
  // Less Than, Less Than or Equal To,
  // Containing, Not Containing,
  // Beginning With, Ending With,
  // Equal To, Not Equal To
}
