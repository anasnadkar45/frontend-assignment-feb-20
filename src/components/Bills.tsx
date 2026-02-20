import { useState } from 'react'
import data from '@/data/data.json'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Bill {
  bill: {
    bill_id: string
    bill_type: string
    bill_date: string
    invoice_number: string
    net_amount: number
    total_discount: number
    facility_details: {
      name: string
    }
    page_number: number
  }
  items: Array<{
    "s.no.": number
    item_id: string
    item_name: string
    category: string
    final_amount: number
    is_nme: boolean
    nme_item_name?: string
    nme_bill_amount?: number
    deduction_reason?: string
  }>
}

const Bills = () => {
  const [expandedBill, setExpandedBill] = useState<string | null>(null)

  const bills: Bill[] = data.edited_data.nme_analysis.bills

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const toggleBillExpansion = (billId: string) => {
    setExpandedBill(expandedBill === billId ? null : billId)
  }

  return (
    <div className="w-full px-2 md:px-4 py-3 md:py-4">
      <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Bills</h2>

      <div className="space-y-3 md:space-y-4">
        {bills.map((bill) => (
          <div key={bill.bill.bill_id} className="border rounded-lg overflow-hidden">
            {/* Bill Header */}
            <button
              onClick={() => toggleBillExpansion(bill.bill.bill_id)}
              className="w-full bg-muted/60 hover:bg-secondary-muted p-3 md:p-4 flex justify-between items-center transition-colors"
            >
              <div className="flex-1 text-left min-w-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Invoice</p>
                    <p className="text-xs md:text-sm font-semibold truncate">{bill.bill.invoice_number}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Date</p>
                    <p className="text-xs md:text-sm font-semibold">{formatDate(bill.bill.bill_date)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Amount</p>
                    <p className="text-xs md:text-sm font-semibold">₹ {bill.bill.net_amount.toFixed(2)}</p>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-xs text-muted-foreground font-medium">Page</p>
                    <p className="text-xs md:text-sm font-semibold">{bill.bill.page_number}</p>
                  </div>
                </div>
              </div>
              <div className="ml-2 md:ml-4 shrink-0">
                <svg
                  className={`w-5 h-5 transition-transform ${expandedBill === bill.bill.bill_id ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </button>

            {/* Bill Items Table */}
            {expandedBill === bill.bill.bill_id && (
              <div className="border-t p-2 md:p-4">
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">S.No.</TableHead>
                        <TableHead>Item Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-center">NME</TableHead>
                        <TableHead>Deduction Reason</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bill.items.map((item) => (
                        <TableRow
                          key={item.item_id}
                          className={item.is_nme ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'}
                        >
                          <TableCell className="font-medium text-sm">{item['s.no.']}</TableCell>
                          <TableCell className="text-sm">
                            <div className="font-medium">{item.item_name}</div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{item.category}</TableCell>
                          <TableCell className="text-right font-medium text-sm">
                            ₹ {item.final_amount.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.is_nme && (
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold">
                                ✓
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-sm">
                            {item.deduction_reason ? (
                              <div className="text-red-700 font-medium">{item.deduction_reason}</div>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-3">
                  {bill.items.map((item) => (
                    <div
                      key={item.item_id}
                      className={`p-3 rounded-lg border ${item.is_nme ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-gray-700 text-sm">#{item['s.no.']}</span>
                            {item.is_nme && (
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold">
                                ✓
                              </span>
                            )}
                          </div>
                          <p className="font-semibold text-sm text-gray-900">{item.item_name}</p>
                        </div>
                        <div className="text-right ml-2">
                          <p className="font-bold text-sm">₹ {item.final_amount.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">
                        <p className="font-medium">{item.category}</p>
                      </div>
                      {item.deduction_reason && (
                        <div className="text-xs font-medium text-red-700 border-t border-red-200 pt-2">
                          {item.deduction_reason}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Bill Summary */}
                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t flex justify-end">
                  <div className="space-y-1 md:space-y-2 text-right text-xs md:text-sm">
                    <div>
                      <span className="text-muted-foreground">Total Amount: </span>
                      <span className="font-bold">₹ {bill.bill.net_amount.toFixed(2)}</span>
                    </div>
                    {bill.bill.total_discount > 0 && (
                      <div>
                        <span className="text-muted-foreground">Total Discount: </span>
                        <span className="font-bold">₹ {bill.bill.total_discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Bills
