import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function PdfDownload({contentRef}){

    const handleDownloadPdf = () => {
        html2canvas(contentRef.current).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 190; // Ajusta el ancho de la imagen
            const pageHeight = pdf.internal.pageSize.height;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            let position = 0;

            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('download.pdf');
        });
    };

    return (
        <div className="flex items-center space-x-2">
            <button onClick={handleDownloadPdf} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Exportar</button>
      </div>
    );
};
