import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import ErrorBoundary from "../components/ErrorBoundary";
import useDataStore, { AuxillaryData, defAuxillary, SingleCourse } from "../store/dataStore";
import CourseTableRow from "../components/CourseTableRow";
import uuid from "react-uuid";

interface Data {
    CGPA: number;
    GPA: number;
    "Coure Codes": string[];
    "Course Units": number[];
    grades: number[];
}

const CourseReview: React.FC = () => {
    let navigate = useNavigate()

    const globalAuxillary = useDataStore(state => state.globalAuxillary)
    const globalCourses = useDataStore(state => state.globalCourses)
    const setGPA = useDataStore(state => state.setGPA)
    const setCGPA = useDataStore(state => state.setCGPA)

    let [auxillaryData, setAuxillaryData] = useState<AuxillaryData>(defAuxillary)
    let [courseData, setCourseData] = useState<SingleCourse[] | []>([])
    let [isLoading, setIsLoading] = useState<boolean>(false)
 
    const handleCalcCGPA = async () => {
        setIsLoading(true)
        const courseCodes = courseData.map(item => item.code)
        const courseUnits = courseData.map(item => Number(item.units))
        const courseGrades = courseData.map(item => {
            if (item.grade === "A") return 5.0
            else if (item.grade === "B") return 4.0
            else if (item.grade === "C") return 3.0
            else if (item.grade === "D") return 2.0
            else if (item.grade === "E") return 1.0
            else return 0.0
        })

        const packageObj = {
            admission_mode: auxillaryData.admission,
            level: Number(auxillaryData.level),
            sem: Number(auxillaryData.semester),
            prev_cgpa: Number(auxillaryData.prevCGPA),
            course_codes: courseCodes,
            course_units: courseUnits,
            grades: courseGrades
        }
        console.log("https://cal-cgpa.adaptable.app/generate_result")

        let res = await fetch(
            "https://cal-cgpa.adaptable.app/generate_result",
            {
                method: "POST",
                body: JSON.stringify(packageObj),
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )

        console.log(res)
        if (res.status === 200) {
            let dataString = await res.text()
            let data: Data = JSON.parse(dataString)
            console.log(data)
            setIsLoading(false)
            setGPA(data["GPA"])
            setCGPA(data["CGPA"])
            navigate("/results")
        } else {
            setIsLoading(false)
            alert(res.statusText || "CORS Error")
        }
    }

    useEffect(() => {
        setCourseData(globalCourses)
        setAuxillaryData(globalAuxillary)
    }, [])

    return (
        <main className="w-full min-h-screen bg-[#00000080] font-montserrat font-medium text-white text-base">
            <div className="w-full h-screen fixed bg-background z-[-1] bg-cover bg-no-repeat"></div>
            <section className="w-full md:w-[600px] min-h-screen bg-purple80 mx-auto px-8 py-12">
                <section className="w-full py-8">
                    <div className="grid border-separate border border-white font-normal mb-8">
                        <div className="border border-white grid grid-cols-[max-content_1fr] grid-rows-[auto_auto] md:grid-rows-[auto] 
                            md:grid-cols-[max-content_1fr_min-content_1fr] md:py-2"
                        >
                            <div className=" border-white border-b md:border-none py-2 pl-4">
                                <span className="font-bold text-purple">Admission Mode:  </span>
                            </div>
                            <div className="flex justify-end md:justify-center pr-4 md:pr-0 border-white border-b md:border-none py-2">
                                <span className="">{auxillaryData.admission}</span>
                            </div>
                            <div className="border-white border-t md:border-none py-2 pl-4">
                                <span className="font-bold text-purple">Level:  </span>
                            </div>
                            <div className="flex justify-end md:justify-center pr-4 md:pr-0 border-white border-t md:border-none py-2">
                                <span className="">{auxillaryData.level}</span>
                            </div>
                        </div>
                        <div className="grid grid-rows-[auto_auto] md:grid-rows-[auto] grid-cols-[max-content_1fr] 
                            md:grid-cols-[max-content_1fr_max-content_1fr] border border-white md:py-2"
                        >
                            <div className=" border-white border-b md:border-none py-2 pl-4">
                                <span className="font-bold text-purple">Semester:  </span>
                            </div>
                            <div className="flex justify-end md:justify-center pr-4 md:pr-0 border-white border-b md:border-none py-2">
                                <span className="">{auxillaryData.semester === "1" ? "1st" : auxillaryData.semester === "2" ? "2nd" : ""}</span>
                            </div>
                            <div className="border-white border-t md:border-none py-2 pl-4">
                                <span className="font-bold text-purple">Courses This Semester:  </span>
                            </div>
                            <div className="flex justify-end md:justify-center pr-4 md:pr-0 border-white border-t md:border-none py-2">
                                <span className="">{auxillaryData.courses}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-[max-content_1fr] md:grid-cols-[max-content_1fr] border border-white px-4 py-2">
                            <div>
                                <span className="font-bold text-purple">Previous CGPA:  </span>
                            </div>
                            <div className="flex justify-end md:justify-center ">
                                <span className="">{auxillaryData.prevCGPA}</span>
                            </div>
                        </div>
                    </div>
                    <table className="w-full table course-table table-fixed border-collapse border-spacing-px">
                        <thead className="font-bold text-purple">
                            <tr className="">
                                <th className="w-[40%] py-1">
                                    <span className="">Code</span>
                                </th>
                                <th className="w-[30%] py-1">
                                    <span className="">Units</span>
                                </th>
                                <th className="w-[30%] py-1">
                                    <span className="">Grade</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseData.map(item => <CourseTableRow key={uuid()} rowProps={item} />)}
                        </tbody>
                    </table>
                </section>
                
                <div className="flex py-8 justify-between">
                    <Link to="/course-details">
                        <p className="text-white bg-purple py-3 px-8 rounded-md no-underline active:scale-95 hover:scale-105 font-semibold">
                            Back 
                        </p>
                    </Link>
                    <button type="button" onClick={handleCalcCGPA} className="text-white outline-none border-none bg-purple py-3 px-8 
                        rounded-md no-underline active:scale-95 hover:scale-105 font-semibold" 
                    >
                        {isLoading ? "Loading..." : "Confirm Data" }
                    </button>
                </div>
            </section>
        </main>
    )
}

export default CourseReview