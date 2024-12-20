import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import baseUrl from "../../services/request";
import { AllShoes, StockShoes } from "../../hooks/useStock";
import useEmblaCarousel from "embla-carousel-react";

interface Props {
  brand: string;
}
const SimilarItem = ({ brand }: Props) => {
  const [stock, setStock] = useState<StockShoes[]>([]);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .get<AllShoes>(`${baseUrl}store/get-shoes-by-filter?brand=${brand}`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((response) => {
        setStock(response.data.shoes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [brand]);

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
      const nextIndex = (selectedIndex + 1) % stock.length; // Cycle back to the first item
      emblaApi.scrollTo(nextIndex);
    }, 5000); // 5 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [emblaApi, selectedIndex, stock.length]);

  return (
    <>
      {/* Large Device */}
      <div className="lg:flex hidden gap-x-3 overflow-x-scroll scrollbar-hide mt-5 snap-x snap-mandatory mb-20 ps-1">
        {stock.map(
          (s) =>
            Number(s.stock) > 0 && (
              <button
                key={s.id}
                onClick={() => (window.location.href = `/shoes/${s.uid}`)}
              >
                <img
                  src={s.main_picture}
                  alt="shoes"
                  className="bg-white h-80 w-full  object-cover snap-center rounded"
                />
              </button>
            )
        )}
      </div>

      {/* Small device */}
      <div className="lg:hidden md:hidden overflow-hidden mt-3">
        {/* Prevents overflow */}
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {stock.map(
              (s) =>
                Number(s.stock) > 0 && (
                  <button
                    key={s.id}
                    onClick={() => (window.location.href = `/shoes/${s.uid}`)}
                    className="embla__slide w-[99vw] flex-shrink-0 relative border border-gray-300 rounded-lg p-2"
                  >
                    <button
                      key={s.id}
                      onClick={() => (window.location.href = `/shoes/${s.uid}`)}
                    >
                      <img
                        src={s.main_picture}
                        alt="shoes"
                        className="bg-white h-80 w-full object-cover snap-center rounded"
                      />
                    </button>
                  </button>
                )
            )}
          </div>
        </div>
        {/* Dots for navigation */}
        <div className="flex justify-center mt-5">
          {stock.map((_, index) => (
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

export default SimilarItem;
