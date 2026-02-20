import Info from './Info';
import data from "../data/data.json"

const PatientInfo = () => {
    console.log(data)
    const patientInfo = {
        name: data.edited_data.patient_summary.patient_details.patient_name,
        dob: data.edited_data.patient_summary.patient_details.patient_dob,
        policyNo: data.edited_data.patient_summary.patient_details.patient_policy_no,
        contact:{
            email: data.edited_data.patient_summary.patient_details.patient_email,
            phone: data.edited_data.patient_summary.patient_details.patient_mobile,
        }
    }
  return (
    <div className="p-4 border-b">
      <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <Info label="Name" value={patientInfo.name} />
        <Info label="Date of Birth" value={patientInfo.dob} />
        <Info label="Policy Number" value={patientInfo.policyNo} />
        <Info label="Email" value={patientInfo.contact.email} />
        <Info label="Phone" value={patientInfo.contact.phone} />
      </div>
    </div>
  )
}

export default PatientInfo