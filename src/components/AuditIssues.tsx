import { useState } from 'react'
import data from '@/data/data.json'
import {
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  FileText,
  AlertCircle,
} from 'lucide-react'

interface AuditIssuesProps {
  onPageJump?: (pageNumber: number) => void
}

const AuditIssues = ({ onPageJump }: AuditIssuesProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('legibility')
  const audit = data.audit_analysis
  const segments = data.segments.aggregated_segments

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const handlePageClick = (pageNumber: number) => {
    if (onPageJump) {
      onPageJump(pageNumber)
    }
  }

  // Get page ranges as a formatted string
  const formatPageRange = (ranges: Array<{ start: number; end: number }>) => {
    if (ranges.length === 0) return 'No pages'
    if (ranges.length === 1) {
      const range = ranges[0]
      return range.start === range.end ? `${range.start}` : `${range.start}-${range.end}`
    }
    return ranges.map(r => r.start === r.end ? `${r.start}` : `${r.start}-${r.end}`).join(', ')
  }

  // Flatten page ranges into individual pages
  const getIndividualPages = (ranges: Array<{ start: number; end: number }>) => {
    const pages: number[] = []
    ranges.forEach(range => {
      for (let i = range.start; i <= range.end; i++) {
        pages.push(i)
      }
    })
    return pages
  }

  return (
    <div className="w-full px-2 md:px-4 py-3 md:py-4">
      <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Audit Issues & Analysis</h2>

      <div className="space-y-3 md:space-y-4">
        {/* Medical Legibility Issues */}
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('legibility')}
            className="w-full bg-blue-50 hover:bg-blue-100 p-3 md:p-4 flex justify-between items-center transition-colors border-b"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <div className="text-left">
                <h3 className="font-semibold text-sm md:text-base text-blue-900">Medical Legibility Flags</h3>
                <p className="text-xs md:text-sm text-blue-700">
                  {audit.medical_legibility_issues} issues found
                </p>
              </div>
            </div>
            {expandedSection === 'legibility' ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {expandedSection === 'legibility' && (
            <div className="p-3 md:p-4 space-y-3">
              {/* Summary */}
              <div className="bg-blue-50 p-3 rounded-lg text-xs md:text-sm">
                <p className="font-medium text-blue-900 mb-1">Summary</p>
                <p className="text-blue-700">{audit.medical_legibility.summary}</p>
              </div>

              {/* Checks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                <div className="border rounded p-2 md:p-3">
                  <p className="text-xs font-medium text-gray-600">Prescription-Bill Match</p>
                  <p className={`text-sm font-bold ${audit.medical_legibility.prescription_bill_match ? 'text-green-600' : 'text-red-600'}`}>
                    {audit.medical_legibility.prescription_bill_match ? '✓ Matched' : '✗ Mismatch'}
                  </p>
                </div>
                <div className="border rounded p-2 md:p-3">
                  <p className="text-xs font-medium text-gray-600">Diagnosis-Treatment Consistency</p>
                  <p className={`text-sm font-bold ${audit.medical_legibility.diagnosis_treatment_consistent ? 'text-green-600' : 'text-red-600'}`}>
                    {audit.medical_legibility.diagnosis_treatment_consistent ? '✓ Consistent' : '✗ Inconsistent'}
                  </p>
                </div>
              </div>

              {/* Flagged Items */}
              {audit.medical_legibility.flagged_items.length > 0 && (
                <div>
                  <p className="font-semibold text-sm md:text-base mb-2">Flagged Items ({audit.medical_legibility.flagged_items.length})</p>
                  <div className="space-y-2">
                    {audit.medical_legibility.flagged_items.map((item, idx) => (
                      <div key={idx} className="bg-red-50 border border-red-200 rounded p-2 md:p-3">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                          <div className="flex-1">
                            <p className="font-semibold text-sm text-red-900">{item.item_name}</p>
                            <p className="text-xs text-red-700 mt-1">
                              <span className="font-medium">Issue:</span> {item.flag_reason}
                            </p>
                            <p className="text-xs text-red-700">
                              <span className="font-medium">Recommendation:</span> {item.recommendation}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Policy Violations */}
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('policy')}
            className="w-full bg-orange-50 hover:bg-orange-100 p-3 md:p-4 flex justify-between items-center transition-colors border-b"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <div className="text-left">
                <h3 className="font-semibold text-sm md:text-base text-orange-900">Policy Violations</h3>
                <p className="text-xs md:text-sm text-orange-700">
                  {audit.policy_violations_count} violation{audit.policy_violations_count !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>
            {expandedSection === 'policy' ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {expandedSection === 'policy' && (
            <div className="p-3 md:p-4 space-y-3">
              {/* Policy Remarks */}
              <div className="bg-orange-50 p-3 rounded-lg text-xs md:text-sm">
                <p className="font-medium text-orange-900 mb-1">Policy Remarks</p>
                <p className="text-orange-700">{audit.policy_remarks}</p>
              </div>

              {/* Violations List */}
              {audit.policy_violations.length > 0 && (
                <div className="space-y-2">
                  <p className="font-semibold text-sm md:text-base">Violations ({audit.policy_violations.length})</p>
                  {audit.policy_violations.map((violation, idx) => (
                    <div key={idx} className="bg-orange-50 border border-orange-200 rounded p-2 md:p-3">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-600 mt-1 shrink-0" />
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-orange-900">{violation.item_name}</p>
                          <p className="text-xs text-orange-700 mt-1">
                            <span className="font-medium">Rule:</span> {violation.rule_name}
                          </p>
                          <p className="text-xs text-orange-700">
                            <span className="font-medium">Details:</span> {violation.violation_details}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-xs text-orange-700">
                              <span className="font-medium">Amount Impacted:</span> ₹ {violation.amount_impacted.toFixed(2)}
                            </p>
                            <p className="text-xs font-medium text-orange-800 bg-orange-100 px-2 py-1 rounded">
                              {violation.recommendation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Document Segments */}
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('documents')}
            className="w-full bg-green-50 hover:bg-green-100 p-3 md:p-4 flex justify-between items-center transition-colors border-b"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-green-600" />
              <div className="text-left">
                <h3 className="font-semibold text-sm md:text-base text-green-900">Document Segments</h3>
                <p className="text-xs md:text-sm text-green-700">
                  {Object.keys(segments).length} document type{Object.keys(segments).length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            {expandedSection === 'documents' ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {expandedSection === 'documents' && (
            <div className="p-3 md:p-4">
              <div className="space-y-2">
                {Object.entries(segments).map(([docType, pageData]: [string, any]) => {
                  const pages = getIndividualPages(pageData.page_ranges)
                  const formattedPageRange = formatPageRange(pageData.page_ranges)

                  return (
                    <div key={docType} className="border rounded-lg p-2 md:p-3 hover:bg-gray-50">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-gray-900 capitalize">
                            {docType.replace(/_/g, ' ')}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            Pages: <span className="font-medium">{formattedPageRange}</span>
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1 justify-end">
                          {pages.map(page => (
                            <button
                              key={page}
                              onClick={() => handlePageClick(page)}
                              className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-900 font-semibold text-xs transition-colors cursor-pointer"
                              title="Click to jump to this page in PDF"
                            >
                              {page}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          <div className="border rounded-lg p-2 md:p-3 bg-gray-50">
            <p className="text-xs text-gray-600 font-medium">Bills Analyzed</p>
            <p className="text-lg md:text-2xl font-bold text-gray-900">{audit.bills_analyzed}</p>
          </div>
          <div className="border rounded-lg p-2 md:p-3 bg-gray-50">
            <p className="text-xs text-gray-600 font-medium">Duplicates Found</p>
            <p className="text-lg md:text-2xl font-bold text-gray-900">{audit.duplicates_found}</p>
          </div>
          <div className="border rounded-lg p-2 md:p-3 bg-gray-50">
            <p className="text-xs text-gray-600 font-medium">Corrections Applied</p>
            <p className="text-lg md:text-2xl font-bold text-gray-900">{audit.bills_with_corrections}</p>
          </div>
          <div className="border rounded-lg p-2 md:p-3 bg-gray-50">
            <p className="text-xs text-gray-600 font-medium">Patches Applied</p>
            <p className="text-lg md:text-2xl font-bold text-gray-900">{audit.patches_applied}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuditIssues
