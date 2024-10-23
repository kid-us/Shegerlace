import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

interface Props {
  images: string[];
  mainImg: string;
}

const SmallImage = ({ images, mainImg }: Props) => {
  console.log(images.length);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (!emblaApi) return;

    const intervalId = setInterval(() => {
      const nextIndex = (selectedIndex + 1) % images.length; // Cycle back to the first item
      emblaApi.scrollTo(nextIndex);
    }, 5000); // 5 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [emblaApi, selectedIndex, images.length]);

  return (
    <>
      {/* Small device */}
      <div className="lg:hidden md:hidden overflow-hidden mt-5">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {/* Display the main image first */}
            <div className="embla__slide w-[90vw] flex-shrink-0 relative border border-gray-300 rounded-lg p-2 bg-white mx-1">
              <img
                src={mainImg}
                alt="shoes"
                className="h-80 w-full object-contain"
              />
            </div>

            {/* Now iterate through the images */}
            {images.map((s, index) => (
              <div
                key={index}
                className="embla__slide w-[90vw] flex-shrink-0 relative border border-gray-300 rounded-lg p-2 bg-white mx-1"
              >
                <img
                  src={s}
                  alt="shoes"
                  className="mx-10 h-80 w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots for navigation */}
        <div className="flex justify-center mt-5">
          {/* Create buttons including one for mainImg */}
          {[mainImg, ...images].map((_, index) => (
            <button
              key={index}
              className={`mx-2 w-3 h-3 rounded-full ${
                selectedIndex === index ? "btn-bg" : "bg-gray-300"
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SmallImage;
