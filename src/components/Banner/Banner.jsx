import PropTypes from "prop-types";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import { useForm } from "react-hook-form";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Slide from "./Slide";
import "./swiper.css";

const bannerImages = [
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1558920558-fb0345e52561?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1515669097368-22e68427d265?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1558467523-46113f1fcf72?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const Banner = ({ setSearch }) => {
  const { register, handleSubmit, reset } = useForm();
  const handleSearch = (data) => {
    console.log(data.search);
    setSearch(data.search);
    reset();
  };

  return (
    <div className="mx-auto mt-6 mb-10 h-[350px] md:h-[450px] lg:h-[480px] relative">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        loop={true}
        autoplay={{ delay: 2000 }}
        navigation={true}
        modules={[Navigation, Pagination, Autoplay]}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
        }}
        className="mySwiper"
      >
        {bannerImages.map((image, index) => (
          <SwiperSlide key={index}>
            <Slide image={image} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="text-4xl md:text-5xl w-[80%] mx-auto lg:text-6xl absolute top-[20%] left-[10%] z-20 text-center">
        <h1 className="font-bold w-fit mx-auto  select-none font-lexend mb-8">
          <span className="font-bold text-slate-700">Buzz Forums</span>
        </h1>
        <p className="text-base lg:text-xl w-[80%] md:w-[70%] lg:w-[60%] mx-auto text-slate-200">
          Welcome to Buzz Forums! Join our vibrant community to discuss tech
          trends, share DIY projects, get career advice, and more. Connect,
          engage, and enjoy!
        </p>

        <form
          onSubmit={handleSubmit((data) => handleSearch(data))}
          className="max-w-md px-4 mx-auto md:mt-8 lg:mt-12 text-base"
        >
          <div className="relative">
            <button className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <input
              type="text"
              placeholder="Search for post title"
              {...register("search")}
              className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

Banner.propTypes = {
  setSearch: PropTypes.func,
};

export default Banner;
