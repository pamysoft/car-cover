import React, { useEffect, useRef, useState, useCallback } from 'react';

interface SliderComponentProps {
  enableSliderLooping?: boolean;
  autoPlay?: boolean;
  speed?: number;
}

export const SliderComponent: React.FC<SliderComponentProps> = ({
  enableSliderLooping = false,
  autoPlay = false,
  speed = 3000,
}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const sliderItemsRef = useRef<NodeListOf<HTMLDivElement> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [slidesPerPage, setSlidesPerPage] = useState(1);
  const [slideScrollPosition, setSlideScrollPosition] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const sliderItems = slider?.querySelectorAll('[id^="Slide-"]') as NodeListOf<HTMLDivElement>;

    if (slider && sliderItems && sliderItems.length > 1) {
      sliderItemsRef.current = sliderItems;
      initPages(slider, sliderItems);
    }

    const resizeObserver = new ResizeObserver(() => {
      if (slider && sliderItems) {
        initPages(slider, sliderItems);
      }
    });

    if (slider) {
      resizeObserver.observe(slider);
      slider.addEventListener('scroll', updateSlider);
    }

    return () => {
      resizeObserver.disconnect();
      if (slider) {
        slider.removeEventListener('scroll', updateSlider);
      }
    };
  }, []);

  const initPages = useCallback((slider: HTMLDivElement, sliderItems: NodeListOf<HTMLDivElement>) => {
    const sliderItemsToShow = Array.from(sliderItems).filter((element) => element.clientWidth > 0);
    if (sliderItemsToShow.length < 2) return;

    const sliderItemOffset = sliderItemsToShow[1].offsetLeft - sliderItemsToShow[0].offsetLeft;
    const slidesPerPageCalc = Math.floor(
      (slider.clientWidth - sliderItemsToShow[0].offsetLeft) / sliderItemOffset
    );

    setSlidesPerPage(slidesPerPageCalc);
    setTotalPages(sliderItemsToShow.length - slidesPerPageCalc + 1);
    updateSlider();
  }, []);

  const updateSlider = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider || !sliderItemsRef.current) return;

    const previousPage = currentPage;
    const sliderItemOffset = sliderItemsRef.current[1].offsetLeft - sliderItemsRef.current[0].offsetLeft;
    const newCurrentPage = Math.round(slider.scrollLeft / sliderItemOffset) + 1;

    setCurrentPage(newCurrentPage);

    if (!enableSliderLooping) {
      // Disable/enable buttons based on slider scroll position
      // Add logic here for updating next and previous button states
    }

    if (newCurrentPage !== previousPage) {
      // Emit or handle custom slideChanged event here if necessary
    }
  }, [currentPage, enableSliderLooping]);

  const onButtonClick = (direction: 'previous' | 'next') => {
    const step = 1; // Or set dynamically based on the button click data
    const slider = sliderRef.current;
    const sliderItems = sliderItemsRef.current;
    if (!slider || !sliderItems) return;

    const sliderItemOffset = sliderItems[1].offsetLeft - sliderItems[0].offsetLeft;
    const newScrollPosition =
      direction === 'next'
        ? slider.scrollLeft + step * sliderItemOffset
        : slider.scrollLeft - step * sliderItemOffset;

    setSlideScrollPosition(newScrollPosition);
    slider.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
  };

  const setSlidePosition = (position: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollTo({
      left: position,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (autoPlay) {
      play();
      return () => pause();
    }
  }, [autoPlay]);

  const play = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    autoplayRef.current = setInterval(() => {
      onButtonClick('next');
    }, speed);
  };

  const pause = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  return (
    <div className="slider-component">
      <div ref={sliderRef} className="slider">
        {/* Render slides here */}
      </div>
      <button name="previous" onClick={() => onButtonClick('previous')}>
        Previous
      </button>
      <button name="next" onClick={() => onButtonClick('next')}>
        Next
      </button>
      <div className="slider-counter">
        <span className="slider-counter--current">{currentPage}</span> /{' '}
        <span className="slider-counter--total">{totalPages}</span>
      </div>
    </div>
  );
};

export default SliderComponent;
