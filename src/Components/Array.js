import { useState, useEffect, useRef } from "react";
import './App.css';

const ARRAY_SIZE = 100
const MAX_NUM = 300
const MIN_NUM = 5
const ANIM_DELAY = 1

// Returns the Array component which visualizes the array and multiple
// buttons as functions to sort in multiple ways and to reset the array
export default function Array() {
	
	// Determines whether an array is being sorted or not
	var isInProgress = false
	// Stores the state of the array
	const [array, setArray] = useState([])
	
	// Stores an array of ref and each index corresponds to the bars
	// from left to right
	const barsRef = useRef([])

	// On reload, a new array is generated and is visualized as bars
    useEffect(()=> {
        VisualizeArray()
    }, [])

	const timeout = ms => new Promise(
		resolve => setTimeout(resolve, ms)
	  );

    // @param min - minimum value generated
    // @param max - maximum value generated
    //
    // Generates a random number from the minimum to the maximum value passed
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
      }

	// Function that sets the state of the array state to a new randomly
	// generated array of values within the range of numbers
    function resetArray() {
      for (let i = 0; i < ARRAY_SIZE; i++){
          array[i] = getRandomIntInclusive(MIN_NUM, MAX_NUM)
      }
      setArray(array)
    }  

	// Function that renders each bar component with a width depending on
	// the size of the array and height depending on the value of the
	// array at the given index
    function VisualizeArray() {
      resetArray()
      
		return(
			array.map((value, index) => {
				return(
					<div
					className='bars'
					key = {index}
					ref = {el => barsRef.current[index] = el}
					style={{
						height: `${value}px`,
						width: `${100/ARRAY_SIZE}%`}}> 
					</div>
				)
			})
		)
    }

	// Sorts and animates the array with the bubble sort algorithm
	function BubbleSort() {

		async function handleClick() {
			if (isInProgress){
				return
			}
			else {
				isInProgress = true
				for (let i = 0; i < ARRAY_SIZE; i++){
					for (let j = 0; j < ARRAY_SIZE - 1;j++){
						if (array[j] > array[j+1]){
							let temp = array[j]
							array[j] = array[j+1]
							array[j+1] = temp

							const barOne = barsRef.current[j]
							const barTwo = barsRef.current[j+1]

							barOne.style.height = `${array[j]}px`
							barTwo.style.height = `${array[j+1]}px`

							barOne.style.backgroundColor = '#af0000'
							barTwo.style.backgroundColor = '#af0000'

							setArray(array)
						
							await timeout(ANIM_DELAY)

							barOne.style.backgroundColor = '#F7D9B2'
							barTwo.style.backgroundColor = '#F7D9B2'
						}
					}
				}
			}
			isInProgress = false
		}

		return (
			<button
			className='button-style'
				onClick={handleClick}>
					Bubble Sort
			</button>
		
		)
	}

	// Sorts and animates the array with the selection sort algorithm
	function SelectionSort() {
		async function handleClick() {
			if (isInProgress){
				return
			}
			else {
				isInProgress = true
				// sorting here
				for (let i = 0; i <ARRAY_SIZE; i++){
					var minIndex = i
					for (let j = i; j <ARRAY_SIZE; j++){
						if (array[j] < array[minIndex]){
							minIndex = j
						}
						const barOne = barsRef.current[j]
						const barTwo = barsRef.current[minIndex]

						barOne.style.backgroundColor = "#af0000"
						barTwo.style.backgroundColor = "#af0000"

						await timeout(ANIM_DELAY)

						barOne.style.backgroundColor = '#F7D9B2'
						barTwo.style.backgroundColor = '#F7D9B2'
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
			isInProgress = false
		}

		return (
			<button
			className='button-style'
				onClick={handleClick}>
					Selection Sort
			</button>
		)
	}
	
	// Calls the resetArray function which updates and repopulates the array
	// state with new values and updates the bar's height depending on the 
	// value of the array at the given index
	function handleResetArray(){
	
		resetArray()

		for (let i = 0; i < ARRAY_SIZE; i++){
			const bar = barsRef.current[i]
			bar.style.height = `${array[i]}px`
		}
	}
	

  return (
  	<div className="bars-container">
		<div className="bars-window">
	  		<VisualizeArray />
		</div>
	  	<div className="button-container">
			<button
				className='button-style'
				onClick={handleResetArray}>
				Reset Array
			</button>
			<BubbleSort
				array={array}
				ARRAY_SIZE={ARRAY_SIZE} />
				<SelectionSort />
	  	</div>
    </div>
  )
}
