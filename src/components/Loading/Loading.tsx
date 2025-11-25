import { logo_sm } from "../../assets";
import "./loading.css";
const Loading = () => {
  return (
    <div className="fixed left-0 z-50 bg-primary h-full w-full ">
      <div className="flex justify-center items-center h-full">
        {/* <p className="loading"></p> */}
        <img src={logo_sm} alt="logo" className="w-24 animate-pulse" />
      </div>
    </div>
  );
};

export default Loading;
