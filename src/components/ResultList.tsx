import { Result } from "@/models/result"
import { faKeyboard } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

interface Results {
    results: Array<Result>
}

export default function ResultList({results} : Results) {
  return (
    <>
        <p>Your best results of all time are: </p>
        {results.map((row, index) => {
            return (
            <div className="flex flex-col justify-center items-center" key={index}>
                <div className="flex justify-center w-1/2 text-2xl font-bold p-4 bg-gray-100 border-gray-200 shadow-lg">
                    <p>{row.WPM}<span className="text-sm"> WPM</span></p>
                </div>
            </div>
            )
        })}
    </>
  )
}
