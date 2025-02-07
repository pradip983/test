"use client"
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Review({ reviewsData }) {
  const [reviews, setReviews] = useState(reviewsData);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession()
  const Router = useRouter();
  const [formData, setFormData] = useState({
    name: session?.user?.username || "Anonymous",
    comment: "",
    img: session?.user?.image,
  });

  const reviewsContainerRef = useRef(null);

  useEffect(() => {
    if (reviewsContainerRef.current) {
      reviewsContainerRef.current.scrollTop = reviewsContainerRef.current.scrollHeight;
    }
  }, [reviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.comment && formData.img) {
      setReviews([...reviews, formData]); // Add new review
      setFormData({ ...formData, comment: "" }); // Reset comment field
      setIsFormVisible(false); // Hide form after submission
    }
  };

  const handlehome = () => {
    setLoading(true);
    Router.push("/")
  };


  if (session) {
    return (
      <>
        {!isFormVisible && <div className=" w-full  h-full bg-gray-50 p-4 flex flex-col gap-4 overflow-y-auto items-center">
          {/* Page Header */}
          <header className="w-full max-w-4xl text-center ">
            <h1 className="text-4xl font-extrabold text-gray-800">Reviews</h1>
            <p className="text-lg text-gray-600 mt-2">
              Share your experience or read reviews from others!
            </p>
          </header>

          {/* Reviews Section */}
          <div ref={reviewsContainerRef} className="w-full shadow-2xl  rounded-lg overflow-y-auto hide-scrollbar">
            <div className="w-full max-w-5xl  mx-auto">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div
                    key={index}
                    className={`p-4 flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`
                    }
                  >

                    <div className="border-2 min-w-[500px] p-2 rounded-lg border-gray-200 bg-white shadow-md">

                      <div className="flex gap-3 justify-start items-center">
                        <div className="relative w-8 h-8 overflow-hidden rounded-full transform transition-transform">
                          <img
                            src={review.img}
                            alt="Avatar"
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {review.name}
                          </h3>
                        </div>
                      </div>
                      <p className="text-gray-600 p-2">{review.comment}</p>
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

          {/* Sticky Button */}
          <div>
            <button
              className="rounded-full shadow-lg hover:bg-blue-700   inline-block px-6 py-3 bg-[#364657] text-white font-bold    transition duration-200"
              onClick={() => setIsFormVisible(true)}
            >
              Give Review
            </button>
          </div>
        </div >
        }

        {isFormVisible ? (<div className="w-full max-w-4xl mx-auto mt-6">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Write a Review
            </h2>
            <div className="mb-4 flex gap-3 ">
              <div className="relative w-8 h-8 ml-4 overflow-hidden rounded-full transform transition-transform">
                <img
                  src={session?.user?.image}
                  alt="Avatar"
                  layout="fill"

                />
              </div>
              <div

                className="block text-lg  font-bold text-gray-700"
              >
                {session.user.username}
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
                  setFormData({ ...formData, comment: e.target.value })
                }
                className="mt-1 p-4  w-full  rounded-md shadow-2xl  sm:text-sm"
                placeholder="Write your review here"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className=" shadow-lg  inline-block  bg-[#364657] text-white font-bold  duration-200 px-6 py-2  rounded-md  hover:bg-blue-700 transition"
            >
              Submit Review
            </button>
          </form>
        </div>

        ) : ("")}

      </>
    );
  }
  else {
    return (
      <>
        <div className="flex w-full h-[75vh] items-center justify-center px-6 py-12 lg:px-8">
          <div className="w-[45vw] h-[55vh] border-4 border-gray-50 rounded-lg shadow-2xl">
            <div className="sm:mx-auto sm:w-full">
              <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign in of your account
              </h2>
            </div>

            <div className="mt-14 sm:mx-auto sm:w-[50%]">
              <div className="mt-5">
                <button
                  onClick={handlehome}
                  disabled={loading}
                  className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
                    }`}
                >
                  {loading ? "Redirect" : "Home"}
                </button>
              </div>

              <p className="mt-5 text-center text-sm text-gray-500">
                Register and Explore India?
              </p>
            </div>
          </div>
        </div>

      </>
    );
  }

}

