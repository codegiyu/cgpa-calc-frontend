import Input from "./Input";
import Select from "./Select";
import ErrorBoundary from "./ErrorBoundary";
import { SingleCourse } from "../store/dataStore";


export interface CourseRowProps {
    index: string;
    values: SingleCourse;
    handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removeRow: (index: number) => void;
}

interface Props {
    rowProps: CourseRowProps;
}

const CourseRow: React.FC<Props> = (props) => {
    let {index, values, handleInputChange, handleSelectChange, removeRow} = props.rowProps

    const handleRemoveRow = () => {
        let idx: number = Number(index)
        removeRow(idx)
    }

    let gradeProps = {
        label: "Grade",
        name: `grade${index}`,
        value: values.grade,
        defaultOption: "Select grade",
        handleSelectChange,
        errorVal: values.gradeError,
        options: ["A","B","C","D","E","F"],
    }

    let codeProps = {
        label: "Code",
        type: "text",
        name: `code${index}`,
        value: values.code,
        placeholder: "e.g ABC101",
        errorVal: values.codeError,
        handleInputChange,
    }

    let unitProps = {
        label: "Units",
        type: "number",
        name: `units${index}`,
        value: values.units,
        placeholder: "Credit load",
        errorVal: values.unitsError,
        handleInputChange,
    }

    return (
        <section className="w-full flex flex-col my-6">
            <div className="w-full flex items-center justify-between">
                <h3 className="font-bold text-purple text-lg">{`Course ${Number(index) + 1}`}</h3>
                <button onClick={handleRemoveRow} className="text-purple text-sm bg-transparent outline-none border-none cursor-pointer hover:text-lightBlue active:scale-95">
                    <span className="font-bold text-base">-</span> Remove row
                </button>
            </div>
            <div className="w-full flex items-center gap-4 mt-4">
                <div className="w-[40%]">
                    <ErrorBoundary>
                        <Input inputProps={codeProps} />
                    </ErrorBoundary>
                </div>
                <div className="w-[30%]">
                    <ErrorBoundary>
                        <Input inputProps={unitProps} />
                    </ErrorBoundary>
                </div>
                <div className="w-[30%]">
                    <ErrorBoundary>
                        <Select selectProps={gradeProps} />
                    </ErrorBoundary>
                </div>
            </div>
        </section>
    )
}

export default CourseRow