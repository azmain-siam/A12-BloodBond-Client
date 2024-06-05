import { Bars } from "react-loader-spinner";

const LoadingBars = () => {
  return (
    <div className="flex h-full w-full justify-center items-center pt-20">
      <Bars
        height="70"
        width="70"
        color="#E9424F"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default LoadingBars;
