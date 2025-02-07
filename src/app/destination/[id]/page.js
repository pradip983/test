'use client';
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import React from 'react';
import { useSession } from 'next-auth/react';
import Information from '@/components/Information';
import Location from '@/components/Location';
import Food from '@/components/Food';
import Review from '@/components/Review';
import NearPlave from '@/components/NearPlave';
import Navbar from '@/components/Navbar';
import Services from '@/app/ServicePage/page';
import Lottie from "lottie-react";


export default function DestinationDetails({ params: paramsPromise }) {

  const { data: session } = useSession();
 

  const [cdestination, setCDestination] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("information"); // Track the active section
  const [showNavbar, setShowNavbar] = useState(false);


  // Unwrap params using React.use()
  const params = React.use(paramsPromise);
  const { id } = params;

  useEffect(() => {

 
    
       const fetchloading = async () => { fetch("/loadingp.json")
         .then((response) => response.json())
         .then((data) => setLoading(data))
         .catch((error) => console.error("Error loading animation:", error));
       }

       fetchloading();
    


    const fetchData = async () => {
      try {
        const response = await fetch(`/api/cdestination/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch destination data');
        }
        const data = await response.json();

        if (data) {
          setCDestination(data);
        } else {
          setError('Destination not found');
        }
      } catch (error) {
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };




    fetchData();
  }, [id]);




  const handleToggleNavbar = () => {
    setShowNavbar((prev) => !prev);
  };


  const handleClickOutside = (event) => {
    if (!event.target.closest('.navbar-container') && showNavbar) {
      setShowNavbar(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showNavbar]);





  const data = {
    image: "/background img.png",
    title: "The Majestic Himalayas",
    subtitle: "Explore the serene beauty of the mountains",
    description:
      "The Himalayas are a majestic range of mountains that stretch across several countries. They offer breathtaking views, a rich cultural history, and countless opportunities for adventure and spiritual awakening.",
    highlights: [
      "Snow-capped peaks and stunning valleys",
      "Rich flora and fauna",
      "Trekking, camping, and paragliding opportunities",
      "Historic monasteries and cultural landmarks",
    ],
    gallery: [
      "/him1.jpg",
      "/him2.jpg",
      "/him3.jpg",
      "/him4.jpg",



    ],

    detail: [
      {
        title: "The Himalayas: A Natural Marvel",
        p1: "The Himalayas, often referred to as the Abode of Snow, stand as one of the most awe-inspiring mountain ranges in the world. Stretching across five countries—India, Nepal, Bhutan, China, and Pakistan—this majestic range is home to some of the planet's highest peaks, including Mount Everest, which towers at an incredible 8,848 meters. The Himalayas not only act as a natural barrier separating the Indian subcontinent from the Tibetan Plateau but also play a crucial role in shaping the region’s climate. These towering mountains are the source of many great rivers like the Ganges, Indus, and Brahmaputra, which sustain millions of people and wildlife.",
        p2: "Beyond their geographical importance, the Himalayas hold profound cultural and spiritual significance. They are revered in Hinduism and Buddhism, with many temples, monasteries, and sacred sites dotting their vast expanse. Pilgrims from across the globe travel to destinations like Kedarnath, Badrinath, and Mount Kailash, which are considered divine by devotees. The region's mystique has also inspired countless travelers, poets, and adventurers. Its snow-capped peaks, lush valleys, and pristine lakes embody the essence of natural beauty and provide a serene escape from the chaos of urban life.",
        p3: "Ecologically, the Himalayas are a biodiversity hotspot, boasting unique flora and fauna that cannot be found elsewhere. From the elusive snow leopard to the vibrant rhododendron forests, the range is a treasure trove for nature enthusiasts. Its diverse ecosystems range from tropical forests at lower altitudes to alpine meadows and glaciers higher up. However, the region faces challenges like deforestation, climate change, and glacial melting, threatening its fragile environment. Conservation efforts are underway to preserve this natural wonder for future generations.",
        p4: "For adventure seekers, the Himalayas offer endless opportunities for exploration. Trekkers flock to trails like the Annapurna Circuit and the Everest Base Camp trek to experience the thrill of high-altitude hiking. Mountaineers challenge themselves to scale its formidable peaks, while others enjoy activities like paragliding, rafting, and skiing in its valleys. Whether for spiritual rejuvenation, ecological study, or sheer adventure, the Himalayas stand as an enduring testament to the grandeur and resilience of nature.",
      },
    ],
    reviews: [
      {
        name: "John Doe",
        comment: "This place is a must-visit for anyone who loves nature!",
      },
      {
        name: "Jane Smith",
        comment: "The scenery here is out of this world!",
      },
    ],
  };

  const foods = [
    {
      name: "Butter Chicken",
      description:
        "A creamy and flavorful dish made with tender chicken cooked in a spiced tomato sauce.",
      image: "/bt.jpg",
      origin: "Delhi, India",
      recipe: "https://example.com/butter-chicken-recipe",
    },
    {
      name: "Dal Makhani",
      description:
        "A comforting dish of slow-cooked lentils enriched with butter and cream, known for its smoky flavor.",
      image: "/dm.jpg",
      recipe: "https://example.com/dal-makhani-recipe",
      origin: "Punjab, India",
    },
    {
      name: "Gulab Jamun",
      description:
        "Soft and syrupy milk-based dumplings, a classic Indian dessert.",
      image: "/gul.jpg",
      recipe: "https://example.com/gulab-jamun-recipe",
      origin: "India (widely associated with Bengal)",
    },
    {
      name: "Paneer Tikka",
      description:
        "Chunks of paneer marinated in yogurt and spices, grilled to perfection with vegetables.",
      image: "/pt.jpg",
      recipe: "https://example.com/paneer-tikka-recipe",
      origin: "North India (Punjab region)",
    },
    {
      name: "Biryani",
      description:
        "A fragrant rice dish layered with spiced meat or vegetables, cooked with saffron and aromatic herbs.",
      image: "/bir.jpg",
      recipe: "https://example.com/biryani-recipe",
      origin: "Persia (introduced to India during Mughal rule)",
    },
    {
      name: "Rasgulla",
      description:
        "A spongy dessert made from chhena (curdled milk) balls soaked in sugar syrup.",
      image: "/ras.jpg",
      recipe: "https://example.com/rasgulla-recipe",
      origin: "Bengal, India",
    },
  ];

  const places = [
    {
      name: "Manali",
      image: "/malvan.jpg",
      description: "A beautiful hill station nestled in the Himalayas, known for its scenic beauty and adventure sports.",
      detailsLink: "/destination/6780dd4db7733f6de3ad2191/"
    },
    {
      name: "Shimla",
      image: "/Shimla.jpg",
      description: "The Queen of Hills, famous for its colonial architecture and breathtaking views.",
      detailsLink: "/destination/6780d71fb7733f6de3ad2175/"
    },
    {
      name: "Kasol",
      image: "/kasol.jpg",
      description: "A serene village by the Parvati River, popular for its hippie vibe and trekking trails.",
      detailsLink: "/destination/6780dd4db7733f6de3ad2191/"
    },
    {
      name: "Dalhousie",
      image: "/massuri.jpg",
      description: "A charming hill station offering panoramic views of the Dhauladhar mountain range.",
      detailsLink: "/destination/6780dd25b7733f6de3ad2190/"
    },
    {
      name: "Dharamshala",
      image: "/mathura.jpg",
      description: "The spiritual home of the Dalai Lama, offering tranquility and stunning views.",
      detailsLink: "/destination/6780dc87b7733f6de3ad218f/"
    }
  ];

  const location = {
    name: "Manali",
    address: "Mall Road, Manali, Himachal Pradesh, India",
    latitude: 32.2396,
    longitude: 77.1887,
    transportation: [
      "Nearest Airport: Kullu-Manali Airport (50 km away)",
      "Nearest Railway Station: Joginder Nagar Railway Station (165 km away)",
      "Bus: Frequent buses available from Delhi and Chandigarh",
    ],
    nearbyPlaces: [
      "Rohtang Pass",
      "Solang Valley",
      "Hadimba Temple",
      "Manu Temple",
    ],
  };

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





  // Section Data Components
  const renderSectionContent = () => {
    switch (activeSection) {
      case "information":
        return <Information data={data} />;
      case "Foods":
        return <Food foods={foods} />;
      case "Near Place":
        return <NearPlave places={places} />;
      case "Location":
        return <Location location={location} />;
      case "Review":
        return <Review reviewsData={reviewsData} />;
      case "Booking":
        return <Services />;
      default:
        return <div>Welcome to the Destination Details page.</div>;
    }
  };


  if (!cdestination) {
    return <div className='h-[100vh] w-[100vw] bg-[#f8f9fa] flex items-center justify-center'><Lottie animationData={loading} loop className="h-[25vh] " /></div>
  }
  else {


    return (
      <>

        {/* Clickable Area */}
        <div
          className="fixed top-0 left-0 w-full h-[7vh] z-50 bg-transparent "
          onClick={handleToggleNavbar}
        ></div>

        {/* Navbar */}
        <div
          className={`fixed top-0 left-0 w-full   z-50 bg-gray-900 text-white navbar-container transition-all duration-200 ${showNavbar ? 'visible opacity-100' : 'invisible opacity-0'
            }`}
        >
          <Navbar />
        </div>

        <div className="w-full h-screen bg-[#f5f5f5] flex justify-center items-center gap-2 text-black">
          <div className='left w-[24vw] h-full'>
            <div className="relative w-[95%] h-[90%] mx-auto mt-7 border-4 border-gray-50 rounded-lg shadow-2xl flex flex-col overflow-hidden select-none font-sans">
              <div className="w-full min-h-[80px] rounded-xl z-10 flex items-center justify-around gap-10 transition-all">
                <div>
                  <a href="/" className="text-2xl font-semibold transition-opacity">
                    ExploreIND
                  </a>
                </div>
                <div>
                  <img src="/less.svg" alt="" className='w-[16px]' />
                </div>
              </div>

              {/* Sidebar */}
              <div className="flex-1 w-full overflow-x-hidden transition-all rtl">
                {[{ name: "information", img: "/detail.svg" }, { name: "Foods", img: "/food2.svg" }, { name: "Near Place", img: "/nearplace.svg" }, { name: "Location", img: "/location.svg" }, { name: "Review", img: "/review.svg" }, { name: "Booking", img: "/detail.svg" }].map(
                  (item, index) => (
                    <div
                      key={index}
                      className={`w-full h-[57px] flex items-center justify-center`}
                    >
                      <div
                        className={`relative flex items-center h-[40px] w-[85%] rounded-tl-3xl rounded-br-3xl p-3 border-[1px] border-[#364657] text-[#8392a5] cursor-pointer z-10 shadow-xl transform transition-transform duration-300 hover:scale-[1.05] ${activeSection === item.name ? "text-[#dfe4ec] bg-[#5e6f80]" : ""
                          }`}
                        onClick={() => setActiveSection(item.name)} // Update active section
                      >
                        <img src={item.img} alt="" className='opacity-[0.7]' />
                        <span className="ml-4">{item.name}</span>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Nav Footer */}
              <div className="relative w-full h-[54px] flex flex-col z-10 transition-all mb-1">
                <div className="relative flex items-center w-[90%] mx-auto bg-[#364657] p-2 text-[#c2c7ce] rounded-lg h-[50px]">
                  <div className="relative w-8 h-8 ml-4 overflow-hidden rounded-full transform transition-transform">
                    
                    <img
                      src= {session?.user?.image || "/pr.jpg"}
                      alt="Avatar"
                      layout="fill"
                      className='h-full w-full object-cover'
                      
                    />
                    
                  </div>
                  <div className="relative ml-4 flex flex-col opacity-100 transition-opacity">
                    <a 
                      className="font-bold"
                    >
                      {session ? session.user.username : "User"}
                    </a>
                    <span className="text-xs text-[#8392a5]">{session ? session.user.location : "Location"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className='right w-[74vw] h-full relative'>
            <div className='w-[98%] h-[92.4%] mx-auto mt-3 overflow-y-auto hide-scrollbar border-4 border-gray-50 rounded-lg shadow-2xl p-4'>
              {renderSectionContent()}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
