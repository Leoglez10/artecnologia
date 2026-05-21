import React, { useState, useEffect, useRef } from 'react';

/**
 * CardSwap - A premium, highly interactive and responsive 3D card stacking component.
 * Allows swipe/drag gestures (mouse & touch) to swap cards, supports auto-rotation with pause-on-hover,
 * and handles responsive card offsets.
 */
export default function CardSwap({
  children,
  delay = 5000,
  pauseOnHover = true,
  cardDistance = 32,
  verticalDistance = 24,
  onChange = () => {},
  className = ''
}) {
  const childrenCount = React.Children.count(children);
  
  // Track stack order: indexes[0] is the card in the front, indexes[N-1] is the card in the back
  const [stack, setStack] = useState(() => Array.from({ length: childrenCount }, (_, i) => i));
  const [swappingIndex, setSwappingIndex] = useState(null); // Index of the card currently sliding out
  const [swapDirection, setSwapDirection] = useState('right'); // 'left' or 'right'
  const [dragX, setDragX] = useState(0); // Current drag offset along X axis
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [responsiveOffsets, setResponsiveOffsets] = useState({ x: cardDistance, y: verticalDistance });

  const dragStartX = useRef(0);
  const autoPlayTimer = useRef(null);

  // Sync active index with parent onChange handler
  const activeIndex = stack[0];
  useEffect(() => {
    onChange(activeIndex);
  }, [activeIndex, onChange]);

  // Handle responsive offsets based on screen width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile: minimal horizontal and vertical offsets to avoid viewport clipping
        setResponsiveOffsets({ x: 0, y: 14 });
      } else if (width < 1024) {
        // Tablet: medium offsets
        setResponsiveOffsets({ x: cardDistance * 0.6, y: verticalDistance * 0.8 });
      } else {
        // Desktop: full offsets
        setResponsiveOffsets({ x: cardDistance, y: verticalDistance });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cardDistance, verticalDistance]);

  // Auto-rotation logic
  useEffect(() => {
    if (delay <= 0 || isPaused || isDragging || swappingIndex !== null) {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
      return;
    }

    autoPlayTimer.current = setInterval(() => {
      handleNext();
    }, delay);

    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [delay, isPaused, isDragging, swappingIndex, stack]);

  // Core swap transition logic
  const performSwap = (direction = 'right') => {
    if (swappingIndex !== null) return;

    setSwapDirection(direction);
    setSwappingIndex(stack[0]);

    // Slide out duration is 300ms
    setTimeout(() => {
      setStack((prevStack) => {
        const newStack = [...prevStack];
        const top = newStack.shift();
        newStack.push(top);
        return newStack;
      });
      setSwappingIndex(null);
      setDragX(0);
    }, 320);
  };

  const handleNext = () => {
    performSwap('right');
  };

  const handlePrev = () => {
    if (swappingIndex !== null) return;
    
    // To go backwards, we shift the last element to the front, but to make the transition
    // beautiful, we slide the bottom element out and bring it to the front
    const lastIndex = stack[childrenCount - 1];
    setSwapDirection('left');
    setSwappingIndex(lastIndex);
    
    setTimeout(() => {
      setStack((prevStack) => {
        const newStack = [...prevStack];
        const bottom = newStack.pop();
        newStack.unshift(bottom);
        return newStack;
      });
      setSwappingIndex(null);
    }, 320);
  };

  // Drag handlers (mouse & touch)
  const handleDragStart = (e) => {
    if (swappingIndex !== null) return;
    setIsDragging(true);
    const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    dragStartX.current = clientX;
  };

  const handleDragMove = (e) => {
    if (!isDragging || swappingIndex !== null) return;
    const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - dragStartX.current;
    
    // Apply a friction factor to prevent extreme dragging
    setDragX(deltaX * 0.85);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 110; // Drag threshold to trigger swap (in pixels)
    if (dragX > threshold) {
      performSwap('right');
    } else if (dragX < -threshold) {
      performSwap('left');
    } else {
      // Bounce back animation
      setDragX(0);
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  // Navigation methods exposed via reference if needed
  // But standard buttons will sit inside this component's container for responsive ease
  return (
    <div 
      className={`relative select-none flex flex-col items-center justify-center ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Stack Container */}
      <div 
        className="relative"
        style={{
          width: '100%',
          maxWidth: '480px',
          height: '420px',
        }}
      >
        {React.Children.map(children, (child, idx) => {
          const position = stack.indexOf(idx);
          if (position === -1) return null;

          const isTopCard = position === 0;
          const isSwapping = swappingIndex === idx;
          const isBottomSwappingBack = swappingIndex === idx && position === childrenCount - 1;

          // Calculate interactive stacking positions
          let xOffset = position * responsiveOffsets.x;
          let yOffset = position * responsiveOffsets.y;
          let scale = 1 - position * 0.05;
          let opacity = 1 - position * 0.15;
          let zIndex = childrenCount - position;
          let rotate = 0;
          let transition = isDragging && isTopCard ? 'none' : 'all 350ms cubic-bezier(0.25, 0.8, 0.25, 1)';

          // Apply drag transform to top card
          if (isTopCard && isDragging) {
            xOffset = dragX;
            rotate = dragX * 0.04; // Gentle rotation during drag
          }

          // Apply slide-out animation styles
          if (isSwapping) {
            const slideFactor = swapDirection === 'right' ? 1.3 : -1.3;
            xOffset = window.innerWidth < 640 ? slideFactor * 250 : slideFactor * 380;
            rotate = swapDirection === 'right' ? 18 : -18;
            opacity = 0;
            scale = 0.9;
            zIndex = childrenCount + 5; // Keep on top during slide out
          }

          // Limit depth layout visibility to first 3 cards for clean aesthetics
          if (position >= 3 && !isSwapping) {
            opacity = 0;
            scale = 1 - 3 * 0.05;
          }

          return (
            <div
              key={idx}
              className="absolute top-0 left-0 w-full h-[380px] origin-center cursor-grab active:cursor-grabbing"
              style={{
                transform: `translate3d(${xOffset}px, ${yOffset}px, 0) scale(${scale}) rotate(${rotate}deg)`,
                opacity: opacity,
                zIndex: zIndex,
                transition: transition,
              }}
              onMouseDown={isTopCard ? handleDragStart : undefined}
              onMouseMove={isDragging && isTopCard ? handleDragMove : undefined}
              onMouseUp={isDragging && isTopCard ? handleDragEnd : undefined}
              onTouchStart={isTopCard ? handleDragStart : undefined}
              onTouchMove={isDragging && isTopCard ? handleDragMove : undefined}
              onTouchEnd={isDragging && isTopCard ? handleDragEnd : undefined}
              onClick={() => {
                if (!isTopCard && swappingIndex === null) {
                  // Click a background card to bring it to the front
                  setSwapDirection('right');
                  setSwappingIndex(stack[0]);
                  setTimeout(() => {
                    setStack((prevStack) => {
                      const newStack = [...prevStack];
                      // Rotate stack until the clicked card is at index 0
                      while (newStack[0] !== idx) {
                        const top = newStack.shift();
                        newStack.push(top);
                      }
                      return newStack;
                    });
                    setSwappingIndex(null);
                  }, 320);
                }
              }}
            >
              {child}
            </div>
          );
        })}
      </div>

      {/* Navigation Indicators & Buttons */}
      <div className="flex items-center justify-between w-full max-w-[400px] mt-2 px-4 z-20">
        <button
          onClick={handlePrev}
          disabled={swappingIndex !== null}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-outline-variant/20 dark:border-slate-700/60 shadow-md text-primary dark:text-secondary-container hover:bg-primary-fixed dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
          aria-label="Anterior servicio"
        >
          <span className="material-symbols-outlined select-none text-2xl">arrow_back</span>
        </button>

        {/* Indicators */}
        <div className="flex gap-2.5">
          {Array.from({ length: childrenCount }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (activeIndex === idx || swappingIndex !== null) return;
                setSwapDirection(idx > activeIndex ? 'right' : 'left');
                setSwappingIndex(stack[0]);
                setTimeout(() => {
                  setStack((prevStack) => {
                    const newStack = [...prevStack];
                    while (newStack[0] !== idx) {
                      const top = newStack.shift();
                      newStack.push(top);
                    }
                    return newStack;
                  });
                  setSwappingIndex(null);
                }, 320);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? 'w-8 bg-primary dark:bg-blue-400'
                  : 'w-2.5 bg-outline-variant/30 dark:bg-slate-700 hover:bg-outline-variant/60'
              }`}
              aria-label={`Ir al servicio ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={swappingIndex !== null}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-outline-variant/20 dark:border-slate-700/60 shadow-md text-primary dark:text-secondary-container hover:bg-primary-fixed dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
          aria-label="Siguiente servicio"
        >
          <span className="material-symbols-outlined select-none text-2xl">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
