export const ComplianceBadge = ({ standard }) => {
  const standards = {
    gdpr: { label: 'GDPR Ready', color: 'bg-green-100 text-green-800' },
    soc2: { label: 'SOC 2 Compliant', color: 'bg-blue-100 text-blue-800' },
    hipaa: { label: 'HIPAA Compatible', color: 'bg-purple-100 text-purple-800' }
  }

  return (
    <div className={`px-4 py-2 rounded-full ${standards[standard].color}`}>
      {standards[standard].label}
    </div>
  )
} 