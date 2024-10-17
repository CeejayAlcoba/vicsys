import { toPng } from "html-to-image";
import documentRepository from "../repositories/documentRepository";

export default function documentService() {
  const _documentRepository = documentRepository();

  const downloadHTMLToImage = (qrRef: React.RefObject<HTMLDivElement>) => {
    if (qrRef.current) {
      toPng(qrRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "qr-code.png";
          link.click();
        })
        .catch((err) => {
          console.error("Error generating image:", err);
        });
    }
  };
  return { ..._documentRepository, downloadHTMLToImage };
}
