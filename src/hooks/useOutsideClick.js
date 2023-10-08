import { useEffect } from "react";

const useOutsideClick = (ref, exceptionId, cb) => {
   useEffect(() => {
      const handleOutsideClick = (e) => {
         if (
            ref.current &&
            !ref.current.contains(e.target) &&
            e.target.id !== exceptionId
         ) {
            cb();
         }
      };

      document.addEventListener("mousedown", handleOutsideClick);

      return () => {
         document.removeEventListener("mousedown", handleOutsideClick);
      };
   }, [ref, cb]);
};

export default useOutsideClick;
