import { SingleCourse } from "../store/dataStore";

interface Props {
    rowProps: SingleCourse;
}

const CourseTableRow: React.FC<Props> = (props) => {
    let {code, units, grade} = props.rowProps

    return (
        <tr>
            <td className="font-normal text-white py-1 text-center">
                <span className="">{code}</span>
            </td>
            <td className="font-normal text-white py-1 text-center">
                <span className="">{units}</span>
            </td>
            <td className="font-normal text-white py-1 text-center">
                <span className="">{grade}</span>
            </td>
        </tr>
    )
}

export default CourseTableRow