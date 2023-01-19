import { Link } from "react-router-dom";


const NoPage = () => {
    return (
        <main className="w-full h-screen bg-[#00000080] flex items-center justify-center font-montserrat font-medium text-white text-base">
            <div className="w-full h-screen fixed bg-background z-[-1] bg-cover bg-no-repeat"></div>
            <div>
                <h1>404</h1>
                <p className="">The page you are looking for does not exist!</p>
                <Link to={"/"} className="">
                    <p>Back to Home</p>
                </Link>
            </div>
        </main>
    )
}

export default NoPage