/*
   En lugar de usar useMediaQuery de una biblioteca como usehooks-ts
   he considerado instructivo la creación de un hook propio.

   Tomado de https://www.youtube.com/watch?v=gjISBiOQf8Y
*/
'use client'

import { useEffect, useLayoutEffect, useState } from "react";


const canUseDOM = () =>
    !!(
        typeof window !== "undefined" &&
        window.document &&
        window.document.createElement
    );

const useSafeLayoutEffect = canUseDOM()
    ? useLayoutEffect
    : useEffect;


export const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);
    const mql = window.matchMedia(query);

    const handler = (e) => {
        console.log("media", e.media, query, e.media === query);

        if (e.media === query) {
            setMatches(mql.matches);
        }
    };

    useSafeLayoutEffect(() => {
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
    }, []);

    return matches;
};

// EJEMPLO DE USO
// el espacio despues de los 2 puntos es MUY IMPORTANTE;
// Sin el espacio entre los dos puntos y los pixeles este if no funcionaría
// const isLargerThan420 = useMediaQuery("(min-width: 820px)");
//
//   {!isLargerThan420 
//      ? <div> Pantalla mayor de 420px </div>  
//      : <div> Pantalla menor de 420px  </div>
//   }


