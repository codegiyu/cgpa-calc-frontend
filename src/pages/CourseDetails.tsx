import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Select from "../components/Select";
import Radio, { RadioProps } from "../components/Radio";
import ErrorBoundary from "../components/ErrorBoundary";
import CourseRow from "../components/CourseRow";
import useDataStore, { AuxillaryData, defaultCourse, defAuxillary, SingleCourse } from "../store/dataStore";



const CourseDetails: React.FC = () => {
    let navigate = useNavigate()

    const globalAuxillary = useDataStore(state => state.globalAuxillary)
    const globalCourses = useDataStore(state => state.globalCourses)
    const setGlobalAuxillary = useDataStore(state => state.setGlobalAuxillary)
    const setGlobalCourses = useDataStore(state => state.setGlobalCourses)

    let [auxillaryData, setAuxillaryData] = useState<AuxillaryData>(defAuxillary)
    let [auxillaryErrors, setAuxillaryErrors] = useState<AuxillaryData>(defAuxillary)
    let [courseData, setCourseData] = useState<SingleCourse[] | []>([])

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let name: string = e.target.name

        if (name === "level" || name === "admission") {
            setAuxillaryData((prevState: AuxillaryData) => {
                return {...prevState, [name]: e.target.value}
            })
            setAuxillaryErrors((prevState: AuxillaryData) => {
                return {...prevState, [name]: ""}
            })
        }

        if (name.includes("grade")) {
            let index: number = Number(name.slice(5))

            if (index || index === 0) {
                setCourseData((prevState) => {
                    let array = [...prevState]
                    array[index] = {...array[index], grade: e.target.value, gradeError: ""}

                    return array
                })
            }
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            let name: string = e.target.name
            
            if (name === "semester" || name === "prevCGPA" || name === "courses") {
                setAuxillaryData((prevState: AuxillaryData) => {
                    return {...prevState, [name]: e.target.value}
                })

                if (name === "prevCGPA") {
                    if (!((/^[0-4](\.\d+)?$/g.test(e.target.value)) || (/^5(\.0+)?$/g.test(e.target.value)))) {
                        throw new Error("Invalid CGPA format")
                    }
                }
    
                if (name === "courses") {
                    let newCoursesNumber = Number(e.target.value)
                    if (/^\d+$/g.test(e.target.value) && newCoursesNumber > 0 && newCoursesNumber < 15){
                        if (courseData.length < newCoursesNumber) {
                            let difference = newCoursesNumber - courseData.length
                            let partArray: SingleCourse[] = Array(difference).fill(0).map(item => defaultCourse)
                            setCourseData((prevState) => [...prevState, ...partArray])
                        } else if (courseData.length > newCoursesNumber) {
                            setCourseData((prevState) => prevState.slice(0, Number(e.target.value)))
                        }
                    } else throw new Error("Invalid number of courses")
                    
                }

                setAuxillaryErrors((prevState) => {
                    return {...prevState, [name]: "" }
                })
            }

            if (name.includes("code") || name.includes("units")) {
                let index: number = name.includes("code") ? Number(name.slice(4)) : Number(name.slice(5))
                let newName = name.includes("code") ? "code" : "units"

                if (index || index === 0) {
                    setCourseData((prevState) => {
                        let array = [...prevState]
                        array[index] = {...array[index], [newName]: e.target.value.toUpperCase()}
                        return array
                    })

                    if (newName === "code") {
                        if (!/^[a-z]{3}[0-9]{3}$/gi.test(e.target.value)) {
                            throw new Error(`Invalid`)
                        } else {
                            setCourseData((prevState) => {
                                let array = [...prevState]
                                array[index] = {...array[index], codeError: "" }
                                return array
                            })
                        }
                    }

                    if (newName === "units") {
                        if (!(/^\d$/g.test(e.target.value) && Number(e.target.value) >= 0 && Number(e.target.value) <= 6)) {
                            throw new Error(`Invalid`)
                        } else {
                            setCourseData((prevState) => {
                                let array = [...prevState]
                                array[index] = {...array[index], unitsError: "" }
                                return array
                            })
                        }
                    }
                }
            }
        } catch (error: Error | any) {
            let name = e.target.name

            if (error?.message === "Invalid CGPA format") {
                if (/[^\d.]/g.test(e.target.value)) {
                    setAuxillaryErrors((prevState) => {
                        return {...prevState, prevCGPA: "Only numbers allowed" }
                    })
                } else {
                    setAuxillaryErrors((prevState) => {
                        return {...prevState, prevCGPA: "Invalid CGPA format" }
                    })
                }
            }

            if (error?.message === "Invalid number of courses") {
                setAuxillaryErrors((prevState: AuxillaryData) => {
                    return {...prevState, courses: "Invalid number of courses" }
                })
            }

            if (error?.message === "Invalid") {
                let index: number = name.includes("code") ? Number(name.slice(4)) : Number(name.slice(5))
                let newName = name.includes("code") ? "code" : "units"

                if (index || index === 0) {
                    setCourseData((prevState) => {
                        let array = [...prevState]
                        array[index] = {...array[index], [`${newName}Error`]: "Invalid"}
                        return array
                    })
                }
            }
        }   
    }

    const removeRow = (index: number) => {
        setCourseData((prevState) => {
            let array = [...prevState]
            array.splice(index,1)
            return array
        })
        setAuxillaryData((prevState) => {
            return {...prevState, courses: String(Number(prevState.courses) - 1)}
        })
    }

    const handleAddRow = () => {
        setCourseData((prevState) => {
            let array = [...prevState, defaultCourse]
            console.log(array)
            return array
        })
        setAuxillaryData((prevState) => {
            return {...prevState, courses: String(Number(prevState.courses) + 1)}
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const auxillaryisComplete = () => {
            return Object.values(auxillaryData).every(item => item !== "")
        }

        const auxillaryisErrorFree = () => {
            return Object.values(auxillaryErrors).every(item => item === "")
        }

        const coursesAreComplete = () => {
            if (courseData.length > 0) {
                return courseData.every(obj => obj.code !== "" && obj.grade !== "" && obj.units !== "")
            }
            return false
        }

        const coursesAreErrorFree = () => {
            return courseData.every(obj => obj.codeError === "" && obj.unitsError === "")
        }

        const findIncompleteAuxillaryData = () => {
            for (let item of Object.entries(auxillaryData)) {
                if (item[1] === "") {
                    setAuxillaryErrors((prevState: AuxillaryData) => {
                        return {...prevState, [item[0]]: "Required field" }
                    })
                }
            }
        }

        const findIncompleteCourseData = () => {
            for (let i = 0; i < courseData.length; i++) {
                for (let item of Object.entries(courseData[i])) {
                    if (item[1] === "") {
                        setCourseData((prevState) => {
                            let array = [...prevState]
                            array[i] = {...array[i], [`${item[0]}Error`]: "Required Field"}
                            return array
                        })
                    }
                }
            }
        }

        if(auxillaryisComplete()) {
            if (auxillaryisErrorFree()) {
                console.log("free")
                if (coursesAreComplete()) {
                    console.log("complete")
                    if (coursesAreErrorFree()) {
                        console.log("done")
                        setGlobalAuxillary(auxillaryData)
                        setGlobalCourses(courseData)
                        navigate("/course-review")
                    }
                } else {
                    findIncompleteCourseData()
                    return
                }
            }
        } else {
            findIncompleteAuxillaryData()
            return
        }
    }

    let admissionProps = {
        label: "Admission Mode",
        name: "admission",
        value: auxillaryData.admission,
        defaultOption: "UTME or DE Admission",
        errorVal: auxillaryErrors.admission,
        handleSelectChange,
        options: ["UTME","DE"],
    }

    let levelProps = {
        label: "Level",
        name: "level",
        value: auxillaryData.level,
        defaultOption: "Select your current level",
        errorVal: auxillaryErrors.level,
        handleSelectChange,
        options: ["100","200","300","400","500","600"],
    }

    let radios: RadioProps[] = [
        {
            label: "1st",
            name: "semester",
            value: "1",
            checked: auxillaryData.semester === "1",
            handleRadioChange: handleInputChange
        },
        {
            label: "2nd",
            name: "semester",
            value: "2",
            checked: auxillaryData.semester === "2",
            handleRadioChange: handleInputChange
        }
    ]

    let numberProps = {
        label: "Number of Courses",
        type: "text",
        name: "courses",
        value: auxillaryData.courses,
        placeholder: "Number of courses this semester",
        errorVal: auxillaryErrors.courses,
        handleInputChange,
    }

    let prevCGPAProps = {
        label: "Previous CGPA",
        type: "text",
        name: "prevCGPA",
        value: auxillaryData.prevCGPA,
        placeholder: "Enter your previous CGPA",
        errorVal: auxillaryErrors.prevCGPA,
        handleInputChange,
    }

    useEffect(() => {
        setCourseData(globalCourses)
        setAuxillaryData(globalAuxillary)
    }, [])

    return (
        <main className="w-full min-h-screen bg-[#00000080] font-montserrat font-medium text-white text-base">
            <div className="w-full h-screen fixed bg-background z-[-1] bg-cover bg-no-repeat"></div>
            <form onSubmit={(e: React.FormEvent) => e.preventDefault()} className="w-full md:w-[600px] min-h-screen bg-purple80 mx-auto px-8 py-12">
                <div className="w-full flex flex-col md:flex-row md:flex-wrap gap-8 md:gap-5 my-4">
                    <div className="w-full md:w-[48%]">
                        <ErrorBoundary>
                            <Select selectProps={admissionProps} />
                        </ErrorBoundary>
                    </div>
                    <div className="w-full md:w-[48%]">
                        <ErrorBoundary>
                            <Select selectProps={levelProps} />
                        </ErrorBoundary>
                    </div>
                    <div className="w-full md:w-[48%]">
                        <fieldset className="w-full flex flex-col">
                            <span className="text-purple font-semibold mb-2">Current Semester</span>
                            <div className="w-full flex gap-10 h-[39px]">
                                <ErrorBoundary>
                                    <Radio radioProps={radios[0]} />
                                </ErrorBoundary>
                                <ErrorBoundary>
                                    <Radio radioProps={radios[1]} />
                                </ErrorBoundary>
                            </div>
                            <div className="w-full h-4">
                                <span className="text-red-700 text-xs">{auxillaryErrors.semester}</span>
                            </div>
                        </fieldset>
                    </div>
                    <div className="w-full md:w-[48%]">
                        <ErrorBoundary>
                            <Input inputProps={prevCGPAProps} />
                        </ErrorBoundary>
                    </div>
                    <div className="w-full md:w-[48%]">
                        <ErrorBoundary>
                            <Input inputProps={numberProps} />
                        </ErrorBoundary>
                    </div>
                </div>

                <fieldset className="mt-14">
                    <h2 className="font-bold text-white text-lg mb-6 text-center">Courses Data</h2>
                    <div>
                        <ErrorBoundary>
                            {courseData.map((item, idx) => {
                                let rowData = {
                                    index: String(idx),
                                    values: courseData[idx],
                                    handleSelectChange,
                                    handleInputChange,
                                    removeRow
                                }

                                return <CourseRow key={`row${idx}`} rowProps={rowData} />
                            })}
                        </ErrorBoundary>
                    </div>
                    <div className="w-full flex items-center justify-center my-6">
                        <button onClick={handleAddRow} className="text-purple text-base bg-transparent outline-none border-none cursor-pointer hover:text-lightBlue active:scale-95">
                            <span className="font-bold text-xl">+</span> Add row
                        </button>
                    </div>
                </fieldset>
                
                <div className="flex py-8 justify-between">
                    <Link to="/">
                        <p className="text-white bg-purple py-3 px-8 rounded-md no-underline active:scale-95 hover:scale-105 font-semibold">
                            Back
                        </p>
                    </Link>
                    <button type="submit" onClick={handleSubmit} className="text-white outline-none border-none bg-purple py-3 px-8 rounded-md no-underline 
                        active:scale-95 hover:scale-105 font-semibold" 
                    >
                        Next
                    </button>
                </div>
            </form>
        </main>
    )
}

export default CourseDetails