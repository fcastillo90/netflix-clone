import React, { useEffect, useRef, useState } from 'react';
import placeholder from '@/assets/placeholder.png';


const LazyImg = (props: any) => {
  const [inView, setInView] = useState(false);
  const placeholderRef = useRef<HTMLImageElement>();
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      }
    }, {});
    if (placeholderRef.current) observer.observe(placeholderRef.current);
    return () => {
      observer.disconnect();
    }
  }, []);
  return (
    inView ?
      <img {...props} alt={props.alt || ""} />
      :
      <img {...props} ref={placeholderRef} src={placeholder} alt={props.alt || ""} />
  )
};
export default LazyImg;