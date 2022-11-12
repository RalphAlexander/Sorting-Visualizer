import { useState, useEffect, useRef } from "react";
import sortingData from './data.json';
import OnHoverDiv from "./OnHoverDiv";
import Slider from "./Slider";
import './App.css';

const ARRAY_MIN_SIZE = 10
const ARRAY_MAX_SIZE = 100
const MIN_SLIDER_SPEED = 1
const MAX_SLIDER_SPEED = 30
const MAX_NUM = 300
const MIN_NUM = 5

// Returns the Array component which visualizes the array and multiple
// buttons as functions to sort in multiple ways and to reset the array
export default function Array() {

	const [isInProgress, setIsInProgress] = useState(false)
	const [array, setArray] = useState([])
	const [arraySize, setArraySize] = useState(50)
	const [sortingSpeed, setSortingSpeed] = useState(1)
	const [bubbleSortHover, setBubbleSortHover] = useState(false)
	const [SelectionSortHover, setSelectionSortHover] = useState(false)

	// Stores an array of ref and each index corresponds to the bars
	// from left to right
	const barsRef = useRef([])
	const arraySizeSliderRef = useRef()
	const sortingSpeedSliderRef = useRef()

	useEffect(() => {
		updateArray()
	}, [arraySize])

	// Function that delays in miliseconds determined by the sortingSpeed state
	const timeout = () => new Promise(
		resolve => setTimeout(resolve, sortingSpeed)
	);

	// @param min - minimum value generated
	// @param max - maximum value generated
	//
	// Generates a random number from the minimum to the maximum value passed
	const getRandomIntInclusive = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
	}

	// Function that sets the state of the array state to a new randomly
	// generated array of values within the range of numbers
	const createArray = () => {
		const arr = []
		for (let i = 0; i < arraySize; i++) {
			arr[i] = getRandomIntInclusive(MIN_NUM, MAX_NUM)
		}
		setArray(arr)
	}

	// Function that renders each bar component with a width depending on
	// the size of the array and height depending on the value of the
	// array at the given index
	const VisualizeArray = () => {
		return (
			array.map((value, index) => {
				if (index < arraySize) {
					return (
						<div
							className='bars'
							key={index}
							ref={element => barsRef.current[index] = element}
							style={{
								height: `${value}px`,
								width: `${100 / arraySize}%`
							}}>
						</div>
					)
				}
			})
		)
	}

	// Sorts and animates the array with the bubble sort algorithm
	const BubbleSort = () => {

		// Function that sets the state of BubbleSortHover to true
		const onBubbleSortHover = () => {
			setBubbleSortHover(true)
		}

		// Function that sets the state of BubbleSortHover to false
		const offBubbleSortHover = () => {
			setBubbleSortHover(false)
		}

		// Function that sorts the array and handles the changes visually
		// of the bubble sort algorithm
		async function handleClick() {
			if (isInProgress) {
				return
			}
			else {
				setIsInProgress(true)
				for (let i = 0; i < arraySize; i++) {
					for (let j = 0; j < arraySize - 1; j++) {
						if (array[j] > array[j + 1]) {
							let temp = array[j]
							array[j] = array[j + 1]
							array[j + 1] = temp

							const barOne = barsRef.current[j]
							const barTwo = barsRef.current[j + 1]

							barOne.style.height = `${array[j]}px`
							barTwo.style.height = `${array[j + 1]}px`

							barOne.style.backgroundColor = '#818181'
							barTwo.style.backgroundColor = '#818181'

							setArray(array)

							await timeout()

							barOne.style.backgroundColor = '#2a2a2a'
							barTwo.style.backgroundColor = '#2a2a2a'
						}
					}
				}
			}
			setIsInProgress(false)
		}

		return (
			<>
				<button
					className='button-style'
					onClick={handleClick}
					onMouseEnter={onBubbleSortHover}
					onMouseLeave={offBubbleSortHover}>
					Bubble Sort
				</button>
			</>
		)
	}

	// Sorts and animates the array with the selection sort algorithm
	function SelectionSort() {

		// Function that sets the state of selectionSortHover to true
		const onSelectionSortHover = () => {
			setSelectionSortHover(true)
		}

		// Function that sets the state of selectionSortHover to false
		const offSelectionSortHover = () => {
			setSelectionSortHover(false)
		}

		// Function that sorts the array and handles the changes visually 
		// of the selection sort algorithm
		async function handleClick() {
			if (isInProgress) {
				return
			}
			else {
				setIsInProgress(true)
				for (let i = 0; i < arraySize; i++) {
					var minIndex = i
					for (let j = i; j < arraySize; j++) {
						if (array[j] < array[minIndex]) {
							minIndex = j
						}
						const barOne = barsRef.current[j]
						const barTwo = barsRef.current[minIndex]

						barOne.style.backgroundColor = "#818181"
						barTwo.style.backgroundColor = "#818181"

						await timeout()

						barOne.style.backgroundColor = '#2a2a2a'
						barTwo.style.backgroundColor = '#2a2a2a'
					}
					const barOne = barsRef.current[i]
					const barTwo = barsRef.current[minIndex]

					const temp = array[i]
					array[i] = array[minIndex]
					array[minIndex] = temp


					barOne.style.height = `${array[i]}px`
					barTwo.style.height = `${array[minIndex]}px`
				}
			}
			setIsInProgress(false)
		}

		return (
			<>
				<button
					className='button-style'
					onClick={handleClick}
					onMouseEnter={onSelectionSortHover}
					onMouseLeave={offSelectionSortHover}>
					Selection Sort
				</button>
			</>
		)
	}

	// Function that updates the state of the array by calling the 
	// createArray function but checks if the current arraySize
	// state is less than the current size of the array and splices
	// the excess elements
	const updateArray = () => {
		if (isInProgress) {
			return
		}
		else if (array.length > arraySize) {
			array.splice(arraySize, (array.length - arraySize))
		}
		createArray()
	}

	// Function that updates the state of the arraySize equal to the value of 
	// the arraySizeSliderRef 
	const handleArraySizeSlider = () => setArraySize(arraySizeSliderRef.current.value)
	
	// Function that updates the state of the sortingSpeed equal to the value of 
	// the sortingSpeedSliderRef
	const handleSortingSpeed = () => setSortingSpeed(sortingSpeedSliderRef.current.value)


	return (
		<>
			<div className="main-content-container">
				<div className='flex-display'>
					<div className='slider-layout'>
						<h2>
							Array Size
						</h2>
						<p>
							Small
						</p>
						<Slider
							sliderRef={arraySizeSliderRef}
							minValue={ARRAY_MIN_SIZE}
							maxValue={ARRAY_MAX_SIZE}
							disabled={isInProgress ? true : false}
							handleChange={handleArraySizeSlider} 
							className='slider'/>
						<p>
							Big
						</p>
					</div>
					<div className='divider'/>
					<div className='slider-layout'>
						<h2>
							Sorting Speed
						</h2>
						<p>
							Fast
						</p>
						<Slider
							sliderRef={sortingSpeedSliderRef}
							minValue={MIN_SLIDER_SPEED}
							maxValue={MAX_SLIDER_SPEED}
							disabled={isInProgress ? true : false}
							handleChange={handleSortingSpeed}
							className='slider' />
						<p>
							Slow
						</p>
					</div>
				</div>
				<div className="button-container">
					<button
						className='button-style'
						onClick={updateArray}>
						Reset Array
					</button>
					<BubbleSort />
					<SelectionSort />
				</div>

				<div className="bars-window">
					<VisualizeArray />
				</div>
			</div>
			<div>
				{bubbleSortHover && <OnHoverDiv
					header={sortingData["bubble-sort"].header}
					description={sortingData["bubble-sort"].description}
				/>}
				{SelectionSortHover && <OnHoverDiv
					header={sortingData["selection-sort"].header}
					description={sortingData["selection-sort"].description}
				/>}
			</div>
		</>
	)
}
