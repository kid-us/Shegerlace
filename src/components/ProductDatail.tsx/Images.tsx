interface Props {
  images: string[];
  main: string;
  activeImage: string;
  setActiveImage: (img: string) => void;
}

const Images = ({ images, main, activeImage, setActiveImage }: Props) => {
  return (
    <>
      <div className="sticky top-24 self-start col-span-3 lg:grid hidden grid-cols-5">
        <div>
          {images.map((shoe, index) => (
            <div
              key={index}
              className={`${
                activeImage === shoe ? "bg-gray-100" : "bg-white"
              } rounded-lg mb-1 mx-4 shadow`}
            >
              <div
                onMouseEnter={() => setActiveImage(shoe)}
                className="flex justify-center"
              >
                <img
                  src={shoe}
                  alt="Shoe"
                  className={`${
                    activeImage === shoe && "-rotate-[20deg]"
                  } h-[88.5px] w-16 object-contain`}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-4 w-full h-full">
          <img
            src={main}
            className="bg-white w-full h-[600px] object-contain rounded-xl shadow"
            alt="Shoe"
          />
        </div>
      </div>
    </>
  );
};

export default Images;
