import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


export interface AuxillaryData {
    level: string;
    semester: string;
    courses: string;
    prevCGPA: string;
    admission: string;
}

export interface SingleCourse {
    code: string;
    units: string;
    grade: string;
    codeError: string;
    unitsError: string;
    gradeError: string;
}

export const defaultCourse: SingleCourse = {
    code: "",
    units: "",
    grade: "",
    codeError: "",
    unitsError: "",
    gradeError: ""
}

export const defAuxillary: AuxillaryData = {
    level: "",
    semester: "",
    courses: "",
    prevCGPA: "",
    admission: ""
}

interface DataState {
    globalAuxillary: AuxillaryData;
    globalCourses: SingleCourse[] | [];
    gpa: number | any;
    cgpa: number | any;
    setGPA: (x: number) => void;
    setCGPA: (x: number) => void;
    setGlobalAuxillary: (obj: AuxillaryData) => void;
    setGlobalCourses: (arr: SingleCourse[] | []) => void;
    clearData: () => void;
}

const useDataStore = create<DataState>()(
    persist((set,get) => ({
        globalAuxillary: defAuxillary,
        globalCourses: [],
        cgpa: null,
        gpa: null,
        setGPA: (x: number) => set(() => (
            { gpa: x }
        )),
        setCGPA: (x: number) => set(() => (
            { cgpa: x }
        )),
        setGlobalAuxillary: (obj: AuxillaryData) => set(() => (
            { globalAuxillary: obj }
        )),
        setGlobalCourses: (arr: SingleCourse[] | []) => set(() => (
            { globalCourses: arr }
        )),
        clearData: () => set(() => (
            {
                globalAuxillary: defAuxillary,
                globalCourses: [],
                gpa: null,
                cgpa: null
            }
        ))
    }),
    {
        name: "Course Data",
        storage: createJSONStorage(() => sessionStorage)
    })
)

export default useDataStore