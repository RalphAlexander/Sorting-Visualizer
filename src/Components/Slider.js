export default function Slider({
    sliderRef,
    minValue,
    maxValue,
    handleChange,
    disabled
}) {
  return (
    <input type='range'
				ref={sliderRef}
				min={minValue}
				max={maxValue}
				onChange={handleChange}
        disabled={disabled}
			/>
  )
}
