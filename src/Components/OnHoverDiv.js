export default function OnHoverDiv({
    header,
    description
}) {
  return (
    <div className="hoverable-div">
        <h3>
            {header}
        </h3>
		{description}
	</div>
  )
}
