import React, { Component } from "react";
import QRCode from "qrcode";
import { saveAs } from "file-saver";
import JSZip from "jszip";

class QRCodeGenerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numbers: [12822, 13057, 13189], // Replace with your array of numbers
    };
  }

  async downloadAllQRCodes() {
    const { numbers } = this.state;
    const zip = new JSZip();

    for (const number of numbers) {
      const qrCodeData = `${number}`;

      try {
        // Generate the QR code as an SVG string
        const svgString = await QRCode.toString(qrCodeData, {
          type: "svg",
          width: 400,
          errorCorrectionLevel: "H",
        });

        zip.file(`${number}.svg`, svgString);
      } catch (error) {
        console.error(error);
      }
    }

    zip.generateAsync({ type: "blob" }).then(function (content) {
      // Create a file name for the Zip file
      const zipFileName = "qr_codes_with_numbers.zip";

      // Use file-saver to trigger the download of the Zip file
      saveAs(content, zipFileName);
    });
  }

  render() {
    return (
      <div>
        <h2>QR Code Generator with Number in SVG</h2>
        <div>
          <button onClick={() => this.downloadAllQRCodes()}>
            Download All QR Codes
          </button>
        </div>
      </div>
    );
  }
}

export default QRCodeGenerator;
