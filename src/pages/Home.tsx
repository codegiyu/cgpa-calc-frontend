import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <main className="w-full min-h-screen bg-[#00000080] font-montserrat font-medium text-white text-base">
            <div className="w-full h-screen fixed bg-background z-[-1] bg-cover bg-no-repeat"></div>
            <section className="w-full md:w-[600px] min-h-screen bg-purple80 mx-auto px-8 py-12">
                <p className="font-semibold text-lg text-center mb-16">
                    Welcome to <span className="text-lightBlue z-[2] font-bold text-[20px]">The Standard CGPA Calculator</span> !
                </p>
                
                <p className="">
                    To get started please follow the following instructions:
                </p>

                <ul className="flex flex-col gap-8 my-12 list-disc">
                    <li className="">
                        <p className=" align-top">
                            Enter your previous CGPA in the field provided.
                        </p>
                    </li>
                    <li>
                        <p>
                            Enter the number of courses attempted for the current semester in the designated field.
                        </p>
                    </li>
                    <li>
                        <p>
                            Enter your course codes in their designated fields.
                        </p>
                    </li>
                    <li>
                        <p>
                            Enter the corresponding course unit for each course code entered in the designated field.
                        </p>
                    </li>
                    <li>
                        <p>
                            Enter the corresponding course grade for each course code entered in the designated field (grades should be entered as A, B, C, D, E, F).
                        </p>
                    </li>
                </ul>
                <div className="flex py-8 justify-end">
                    <Link to="/course-details">
                        <p className="text-white bg-purple py-3 px-8 rounded-md no-underline active:scale-95 hover:scale-105 font-semibold">Next</p>
                    </Link>
                </div>
            </section>
        </main>
    )
}

export default Home