import { Component } from '@angular/core';
import { UploadFileService } from 'src/app/upload-file/upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})

export class UploadFileComponent {
  error!: string;
  files!: Set<File>;

  constructor(private service: UploadFileService) { }

  onChange(event: any){
    this.files = new Set();
    this.files.add(event.srcElement.files[0]);

  }

  onUpload(){
    if (this.files.values().next().value.size < 5 * 1024 * 1024 && (this.files.values().next().value.type).slice(0, 6) === 'image/') {
      this.service.upload(this.files, 'http://localhost:3000/upload')
        .subscribe((res: any) => {
          console.log('Upload Concluído');
        } );
        this.error = '';
    } else {
      this.error = 'Arquivo muito grande ou você não escolheu um imagem';
    }
  }
}
