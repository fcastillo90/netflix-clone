import { useRef, useState, useEffect } from "react"

const useIntersection = <T extends HTMLElement>(options: IntersectionObserverInit): [React.RefObject<T>, boolean, boolean] => {
  const containerRef = useRef<T>(null)
  const [ isVisible, setIsVisible ] = useState(false)
  const [ isTabFocus, setIsTabFocus ] = useState(true)

  const callbackFunction: IntersectionObserverCallback = (entries) => {
    const [ entry ] = entries
    setIsVisible(entry.isIntersecting)
  }

  const onFocus = () => setIsTabFocus(true)
  const onBlur = () => setIsTabFocus(false)

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options)
    if (containerRef.current) observer.observe(containerRef.current)
    
    return () => {
      if(containerRef.current) observer.unobserve(containerRef.current)
    }
  }, [containerRef, options])

  useEffect(() => {
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    return () => {
        window.removeEventListener("focus", onFocus);
        window.removeEventListener("blur", onBlur);
    };
}, []);
  return [containerRef, isVisible, isTabFocus]
}

export default useIntersection