import ClaimSummury from './ClaimSummury'
import PatientInfo from './PatientInfo'
import Bills from './Bills'
import AuditIssues from './AuditIssues'
import { ScrollArea } from "@/components/ui/scroll-area"

interface DashboardProps {
  pageNumber?: number
  setPageNumber?: (page: number) => void
}

const Dashboard = ({ setPageNumber }: DashboardProps) => {
  return (
    <ScrollArea className="h-[92vh] ">
      <ClaimSummury />
      <PatientInfo />
      <Bills />
      <AuditIssues onPageJump={setPageNumber} />
    </ScrollArea>
  )
}

export default Dashboard