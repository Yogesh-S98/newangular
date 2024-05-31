import { Injectable } from '@angular/core';
import { PDFDocument, rgb, degrees } from 'pdf-lib';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  async modifyPdf(pdfBytes: Uint8Array): Promise<Uint8Array> {
    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Get the width and height of the first page
    const { width, height } = firstPage.getSize();

    // Draw a string of text diagonally across the first page
    firstPage.drawText('Hello, world!', {
      x: 50,
      y: height - 50,
      size: 30,
      color: rgb(0, 0.53, 0.71),
      rotate: degrees(-45),
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    return pdfDoc.save();
  }
}