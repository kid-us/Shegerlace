import "./loading.css";
const Loading = () => {
  return (
    <div className="fixed z-50 bg-primary h-full w-full ">
      <div className="flex justify-center items-center h-full">
        <p className="loading"></p>
      </div>
    </div>
  );
};

export default Loading;
