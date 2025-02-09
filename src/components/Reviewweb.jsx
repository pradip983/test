"use client"
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const reviewsData = [
    {
        name: "John Doe",
        comment: "Amazing place! Had a wonderful experience with my family.",
        img: "/agra.jpg"
    },
    {
        name: "Jane Smith",
        comment: "The scenery was breathtaking, and the local food was delicious!",
        img: "/agra.jpg"
    },
    {
        name: "Jane Smith",
        comment: "The scenery was breathtaking, and the local food was delicious!",
        img: "/agra.jpg"
    },
    {
        name: "Jane Smith",
        comment: "The scenery was breathtaking, and the local food was delicious!",
        img: "/agra.jpg"
    },
    {
        name: "Jane Smith",
        comment: "The scenery was breathtaking, and the local food was delicious!",
        img: "/agra.jpg"
    },
    {
        name: "Jane Smith",
        comment: "The scenery was breathtaking, and the local food was delicious!",
        img: "/agra.jpg"
    },
];

function Reviewweb() {

    const [reviews, setReviews] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const { data: session } = useSession()
    const Router = useRouter();

    useEffect(() => {
        if (reviewsContainerRef.current) {
            reviewsContainerRef.current.scrollTop = reviewsContainerRef.current.scrollHeight;


        }
    }, [reviews]);

    useEffect(() => {

        const review = async () => {
            const response = await fetch("api/getReview", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
            )
            if(!response.ok) throw new Error("review not fetch from database")

                const data = await response.json();

                if(data){
                    toast.success(data.message);
                }

                setReviews(data);
        }
     review();
    }, [refresh])


    const [formData, setFormData] = useState({
        name: "",
        comment: "",
        img: session?.user?.image || "/pr.jpg",
    });

    const reviewsContainerRef = useRef(null);



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.name && formData.comment && formData.img) {

            const response = await fetch("api/Review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (!response.ok) throw new Error('Failed to save comment data');
            const data = await response.json();
            if (data) {
                toast.success(data.message);
                setRefresh(prev => !prev);
            }

            setFormData({ ...formData, comment: "" });
            setIsFormVisible(false);
        }

    };

    const handlehome = () => {
        setLoading(true);
        Router.push("/")
    };
 if(!reviews){
    return 
 }
    return (
        <>
            <ToastContainer />
            {!isFormVisible && <div className=" lg:w-full w-full  h-[55vh]   p-4 flex flex-col gap-4 overflow-y-auto items-center">
                {/* Page Header */}
                <header className="lg:w-[80%] w-full text-start flex items-center lg:gap-0 gap-5 justify-between ">
                    <div>
                        <h1 className="text-black lg:text-2xl text-xl font-bold font-sans ">Reviews</h1>
                        <p className="text-black lg:text-xl text-lg font-sans mt-2 ">
                            Share your experience or read reviews from others!
                        </p>
                    </div>

                    {/* Sticky Button */}
                    <div>
                        <button
                            className="rounded-full shadow-lg hover:bg-blue-700   inline-block lg:px-4 lg:py-2 px-4 py-1  text-sm lg:text-base bg-[#364657] text-white font-bold    transition duration-200"
                            onClick={() => setIsFormVisible(true)}
                        >
                            Give Review
                        </button>
                    </div>

                </header>

                {/* Reviews Section */}
                <div ref={reviewsContainerRef} className="lg:w-[80%] w-[100%]  h-[35vh] shadow-2xl mt-2  rounded-lg overflow-y-auto hide-scrollbar">
                    <div className="lg:w-full lg:max-w-5xl  mx-auto">
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <div
                                    key={index}
                                    className={`p-4 flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`
                                    }
                                >

                                    <div className="border-2  lg:min-w-[500px]  p-2 rounded-lg border-gray-200 bg-white shadow-md">

                                        <div className="flex gap-3 justify-start items-center">
                                            <div className="relative w-8 h-8 overflow-hidden rounded-full transform transition-transform">
                                                <img
                                                    src={review.image}
                                                    alt="Avatar"
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="lg:text-lg text-base font-semibold text-gray-800">
                                                    {review.username}
                                                </h3>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 lg:text-base text-sm p-2">{review.comment}</p>
                                    </div>

                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600 text-center p-4">
                                No reviews yet. Be the first to leave one!
                            </p>
                        )}
                    </div>
                </div>


            </div >
            }

            {isFormVisible ? (<div className="w-full h-[60vh] text-black p-4 flex  overflow-y-auto items-center  ">
                <div className="  w-[80%] mx-auto ">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Write a Review
                        </h2>
                        <div className="mb-4 flex items-center  gap-3 ">
                            <div className="relative w-8 h-8 ml-4 overflow-hidden rounded-full transform transition-transform">
                                <img
                                    src={session?.user?.image || "/pr.jpg"}
                                    alt="Avatar"
                                    layout="fill"
                                    className="object-cover w-full h-full"

                                />
                            </div>
                            <div

                                className="block text-lg  font-bold text-gray-700"
                            >
                                {session?.user?.username || "User"}
                            </div>

                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="comment"
                                className="block text-sm font-medium mb-2 ml-4 text-gray-700"
                            >
                                Your Review
                            </label>
                            <textarea
                                id="comment"
                                value={formData.comment}
                                onChange={(e) =>
                                    setFormData({ ...formData, comment: e.target.value })}
                                className="mt-1 p-4  w-full text-gray-600  rounded-md shadow-2xl  sm:text-sm"
                                placeholder="Write your review here"
                                rows="4"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className=" shadow-lg  inline-block  bg-[#364657] text-white font-bold  duration-200 px-6 py-2  rounded-md  hover:bg-blue-700 transition"
                            onClick={(e) => setFormData({ ...formData, name: session?.user?.username || "User" })}
                        >
                            Submit Review
                        </button>
                    </form>
                </div>
            </div>

            ) : ("")}

        </>
    )
}

export default Reviewweb
