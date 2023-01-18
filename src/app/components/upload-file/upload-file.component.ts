import { Component } from '@angular/core';
import { UploadFileService } from 'src/app/upload-file/upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  files!: Set<File>;

  constructor(private service: UploadFileService) { }

  onChange(event: any){
    this.files = new Set();
    this.files.add(event.srcElement.files[0]);
    event.srcElement.files[0].text().then((text: string) => {
      console.log(text);
    });
  }

  onUpload(){
    if (this.files && this.files.size > 0) {
      this.service.upload(this.files, 'http://localhost:3000/upload')
        .subscribe((res: any) => {
          console.log('Upload Concluído');
        } );
    }
  }

}
