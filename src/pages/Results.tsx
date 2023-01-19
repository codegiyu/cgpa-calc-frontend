import { useNavigate } from "react-router-dom";
import useDataStore from "../store/dataStore";

const Results: React.FC = () => {
    let navigate = useNavigate()

    const resetAll = useDataStore(state => state.clearData)
    const gpa = useDataStore(state => state.gpa)
    const cgpa = useDataStore(state => state.cgpa)

    const handleReset = () => {
        resetAll()
        navigate("/", {replace: true})
    }

    return (
        <main className="w-full min-h-screen bg-[#00000080] font-montserrat font-medium text-white text-base">
            <div className="w-full h-screen fixed bg-background z-[-1] bg-cover bg-no-repeat"></div>
            <section className="w-full md:w-[600px] min-h-screen bg-purple80 mx-auto px-8 py-12">
                <h1 className="font-bold text-2xl text-center">Your results for this semester are:</h1>
                <section className="flex justify-center py-10">
                    <div className="w-2/4 aspect-square rounded-full border-4 border-white flex flex-col gap-8 items-center justify-center">
                        <p className="text-purple text-[30px]">GPA:  <span className="text-white">{gpa}</span></p>
                        <p className="text-purple text-[30px]">CGPA:  <span className="text-white">{cgpa}</span></p>
                    </div>
                </section>
                <div className="flex py-8 justify-end">
                    <button 
                        onClick={handleReset} 
                        className="text-white bg-purple py-3 px-8 rounded-md no-underline active:scale-95 hover:scale-105 font-semibold"
                    >
                        Back to Home
                    </button>
                </div>
            </section>
        </main>
    )
}

export default Results