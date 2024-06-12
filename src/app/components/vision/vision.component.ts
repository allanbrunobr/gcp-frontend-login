import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {VisionService} from "../../services/vision.service";

@Component({
  selector: 'app-vision',
  standalone: true,
  imports: [],
  templateUrl: './vision.component.html',
  styleUrl: './vision.component.css'
})
export class VisionComponent implements OnInit, AfterViewInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  @ViewChild('imageElement', { static: false }) imageElement!: ElementRef;

  constructor(private visionService: VisionService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.fileInput.nativeElement.addEventListener('change', (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageElement.nativeElement.src = reader.result as string;
        };
        reader.readAsDataURL(file);
      } else {
        this.imageElement.nativeElement.src = '/assets/no-picture.png'; // Ajuste o caminho conforme necessário
      }
    });
  }

  onSubmit(): void {
    const file = this.fileInput.nativeElement.files[0];
    if (file) {
      this.visionService.uploadFileToVisionFace(file).subscribe(response => {
        // Trate a resposta conforme necessário
        console.log(response);
        // Redirecionar para outro componente se necessário
      }, error => {
        console.error('Erro ao enviar o arquivo', error);
      });
    }
  }
}
