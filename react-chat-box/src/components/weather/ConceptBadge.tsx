interface ConceptBadgeProps {
  label: string
}

function ConceptBadge({ label }: ConceptBadgeProps) {
  return <span className="concept-badge">{label}</span>
}

export default ConceptBadge
