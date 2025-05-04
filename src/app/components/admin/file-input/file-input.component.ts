import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-file-input',
    template: `
    <div class="input-group">
      <input
        type="file"
        class="form-control" 
        (change)="handleFileChange($event)"
        [accept]="accept"
      >
      <span class="input-group-text">
        {{ displayFileName || placeholder }}
      </span>
    </div>
  `,
  styles: [`
    span { width: 70% }
    `], 
  standalone: true
})

export class FileInputComponent {
    @Input() accept = '*';
    @Input() placeholder = 'No file chosen';
    @Input() displayFileName: string | null = null;
    @Input() required = false;
    @Input() maxSize?: number; 
    @Output() fileSelected = new EventEmitter<Event>();

  
    handleFileChange(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.displayFileName = input.files[0].name;
      } else {
        this.displayFileName = '';
      }
      this.fileSelected.emit(event)
    }
}