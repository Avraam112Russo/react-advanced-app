import {MutableRefObject, useEffect, useRef} from "react";

export interface useInfiniteScrollProps{
    callBack?:() => void, // function h=that will call when trigger event
    triggerRef: MutableRefObject<HTMLElement>;
    wrapperRef: MutableRefObject<HTMLElement>;
}
export function useInfiniteScroll(props: useInfiniteScrollProps) {
    const {triggerRef, wrapperRef, callBack} = props;
    let observer: IntersectionObserver | null = null;
    useEffect(() => {
    const wrapperElement = wrapperRef.current;
    const triggerElement = triggerRef.current;
        if (callBack) {
            let options = {


                // The element that is used as the viewport for checking visibility of the target. Must be the parent of the target.
                // Defaults to the browser viewport if not specified or null
                root: wrapperElement, // element where will contains scroll

                //Margin around the root. Can have values similar to the CSS margin property,
                // e.g. "10px 20px 30px 40px" (top, right, bottom, left). The values can be percentages.
                // This set of values serves to grow or shrink each side of the root element's bounding box before computing intersections. Defaults to all zeros.
                rootMargin: "0px",

                //Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed.
                // If you only want to detect when visibility passes the 50% mark, you can use a value of 0.5.
                // If you want the callback to run every time visibility passes another 25%, you would specify the array [0, 0.25, 0.5, 0.75, 1]. The default is 0 (meaning as soon as even one pixel is visible, the callback will be run).
                // A value of 1.0 means that the threshold isn't considered passed until every pixel is visible.
                threshold: 1.0,
            };

            // enable event tracking scroll
            observer = new IntersectionObserver(([entries]) => {
                if (entries.isIntersecting){ // call back will work when scroll come in the end page
                    console.log("Intersected");


                    // in our case callback is a function which will fetch new part articles
                    callBack();
                }
            }, options)
            observer.observe(triggerElement); // call function for track target event // scroll

        }

        // disable event tracking scroll
        return () => {
        if (observer && triggerElement){
            observer.unobserve(triggerElement); //
        }
        }
    }, [wrapperRef, triggerRef, callBack ])

}