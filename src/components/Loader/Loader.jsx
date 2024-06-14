import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      className={`min-h-[calc(100vh-80px)] flex flex-col  justify-center  items-center `}
    >
      <BeatLoader size={40} color="#125FD2" />
    </div>
  );
};

export default Loader;
