import React from 'react'

import data from "../data/data.json"
import Info from './Info';
const Dashboard = () => {
  console.log(data)

  const claimSummary = {
    claimId: data.claim_id,
    type: data.claim_type,
    status: data.status,

    claimedAmount: data.audit_analysis.original_claimed_amount,
    billsTotal: data.audit_analysis.original_total_of_bills,
    discrepancyAmount: data.audit_analysis.discrepancy_amount,
    discrepancyReason: data.audit_analysis.discrepancy_reason,
  };
  const difference = claimSummary.claimedAmount - claimSummary.billsTotal;
  return (
    <div>
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold mb-4">Claim Summary</h2>

        <div className="grid grid-cols-2 gap-4">
          <Info label="Claim ID" value={claimSummary.claimId} />
          <Info label="Type" value={claimSummary.type} />
          <Info label="Status" value={claimSummary.status} />

          <Info label="Claimed Amount" value={`₹ ${claimSummary.claimedAmount}`} />
          <Info label="Bills Total" value={`₹ ${claimSummary.billsTotal}`} />

          <Info
            label="Difference"
            value={`₹ ${difference}`}
            highlight
          />

          <div className="col-span-2">
            <p className="text-sm text-gray-500">Discrepancy Reason</p>
            <p className="font-medium text-red-600">
              {claimSummary.discrepancyReason}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard