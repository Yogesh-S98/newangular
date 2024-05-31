import { Component, OnInit } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { PdfService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor(private pdfService: PdfService) {
  }
  async editPdf() {
    const url = '../../assets/saved.pdf'; // URL of the PDF file
    const response = await fetch(url);
    const pdfBytes = new Uint8Array(await response.arrayBuffer());

    const modifiedPdfBytes = await this.pdfService.modifyPdf(pdfBytes);

    // Create a Blob from the modified PDF bytes and generate a URL
    const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);

    // Trigger the download
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'modified-pdf-file.pdf';
    link.click();

    // Revoke the object URL
    URL.revokeObjectURL(blobUrl);
  }
  async ngOnInit() {
  }
}
