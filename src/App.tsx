import PDFViewer from "./components/PDFViewer";
import Dashboard from "./components/Dashboard";
import { useState } from "react";
import { Button } from "./components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const App = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [showPdf, setShowPdf] = useState(false); // mobile toggle
  const [viewMode, setViewMode] = useState<"pdf" | "dashboard" | "both">("both");
  return (
    <div className="h-[98vh] border m-2 rounded-md overflow-hidden">

      <div className="p-4 border-b flex items-center justify-between">
        <h1 className="text-2xl font-semibold font-mono">SuperClaims Assignment</h1>
        <div>
          <Select
            value={viewMode}
            onValueChange={(value: "pdf" | "dashboard" | "both") => setViewMode(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="dashboard">Dashboard</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* 📱 MOBILE */}
      <div className="md:hidden h-full flex flex-col">

        {/* Toggle Buttons */}
        <div className="flex border-b">
          <button
            onClick={() => setShowPdf(false)}
            className={`flex-1 p-3 font-semibold ${!showPdf ? "bg-white" : "bg-gray-100"
              }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setShowPdf(true)}
            className={`flex-1 p-3 font-semibold ${showPdf ? "bg-white" : "bg-gray-100"
              }`}
          >
            PDF
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {!showPdf ? (
            <div className="h-full overflow-y-auto">
              <Dashboard />
            </div>
          ) : (
            <PDFViewer
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
          )}
        </div>
      </div>

      {/* 💻 DESKTOP / TABLET */}
      <div className="hidden md:flex h-full">

        {/* DASHBOARD ONLY */}
        {viewMode === "dashboard" && (
          <div className="w-full overflow-y-auto">
            <Dashboard />
          </div>
        )}

        {/* PDF ONLY */}
        {viewMode === "pdf" && (
          <div className="w-full flex-1">
            <PDFViewer
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
          </div>
        )}

        {/* BOTH (Split Screen) */}
        {viewMode === "both" && (
          <>
            <div className="w-1/2 overflow-y-auto border-r">
              <Dashboard />
            </div>

            <div className="w-1/2">
              <PDFViewer
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
              />
            </div>
          </>
        )}

      </div>

    </div>
  );
};

export default App;