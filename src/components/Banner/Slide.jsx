import PropTypes from "prop-types";

const Slide = ({ image }) => {
  return (
    <div className="w-full h-full relative">
      <img src={image} className="w-full h-full object-cover object-center" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50"></div>
    </div>
  );
};

Slide.propTypes = {
  image: PropTypes.string,
};

export default Slide;
