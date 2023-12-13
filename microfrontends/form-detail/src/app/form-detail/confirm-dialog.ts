import {Component, inject, Input} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgIf} from "@angular/common";

@Component({
  selector: 'confirm-modal-content',
  standalone: true,
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Sicuro di voler cancellare la form?</h4>
      <button type="button" class="btn-close" aria-label="Close"
              (click)="activeModal.dismiss('No')"></button>
    </div>
    <div class="modal-body text-center">
      <div class="row row-btn">
        <div class="col-6">
          <button style="width: 50%" type="button" class="btn btn-danger" (click)="activeModal.close('No')">
            {{'No'}}
          </button>
        </div>
        <div class="col-6">
          <button style="width: 50%" type="button" class="btn btn-success" (click)="activeModal.close('Si')">
            {{'Si'}}
          </button>
        </div>
      </div>
    </div>
    <!--<div class="modal-footer">
      <button type="button" class="btn btn-success" (click)="activeModal.close('Si')">Si</button>
      <button type="button" class="btn btn-danger" (click)="activeModal.close('No')">No</button>
    </div>-->
  `,
  imports: [
    NgIf
  ]
})
export class NgbdModalContent {
  activeModal = inject(NgbActiveModal);

  @Input() name!: string;
  protected readonly undefined = undefined;
}
