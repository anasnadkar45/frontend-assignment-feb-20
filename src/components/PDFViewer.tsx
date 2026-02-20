import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useState } from "react";
import { Button } from "./ui/button";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

type Props = {
    pageNumber: number;
    setPageNumber: (page: number) => void;
};

const PDFViewer = ({ pageNumber, setPageNumber }: Props) => {
    const [numPages, setNumPages] = useState<number>(0);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }
    return (
        <div className="h-[91vh] flex flex-col">

            {/* PDF AREA */}
            <div className="flex-1 min-h-0 overflow-auto flex justify-center items-start p-2">
                <Document
                    file="/final.pdf"
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="rounded-2xl border p-1 bg-secondary mx-auto"
                >
                    <Page
                        pageNumber={pageNumber}
                        width={600}
                        className="mx-auto overflow-hidden rounded-2xl border"
                    />
                </Document>
            </div>

            {/* NAVIGATION BAR */}
            <div className="bg-secondary border-t p-4 flex items-center justify-center gap-6 shadow-md flex-shrink-0">
                <Button
                    disabled={pageNumber <= 1}
                    onClick={() => setPageNumber(pageNumber - 1)}
                >
                    ← Previous
                </Button>

                <span className="font-semibold">
                    Page {pageNumber} of {numPages || "--"}
                </span>

                <Button
                    disabled={pageNumber >= numPages}
                    onClick={() => setPageNumber(pageNumber + 1)}
                >
                    Next →
                </Button>
            </div>

        </div>
    );
};

export default PDFViewer;