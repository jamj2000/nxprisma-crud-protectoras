function Spinner() {
    // return (
    //     <div className="grid place-content-center h-[500px]">
    //         {/* <div className="text-2xl text-blue-200 font-bold animate-pulse">
    //         Obteniendo datos ...
    //         </div> 
    //     */}
    //         <div className="animate-spin rounded-full size-32 border-t-4 border-b-4 border-blue-500  outline-1 outline-dotted outline-blue-700">
    //         </div>
    //     </div>
    // );


    // Icono SVG obtenido de https://loading.io/spinner/spin/-spinner-ball-circle-rotate-rosary-loader-ajax
    // Convertido a JSX por https://svg2jsx.com/
    return (
        <div className="grid place-content-center h-[500px]">

            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                display="block"
                preserveAspectRatio="xMidYMid"
                style={{ background: "#fff" }}
                viewBox="0 0 100 100"
            >
                <g transform="translate(80 50)">
                    <circle r="6" fill="#0516a4">
                        <animateTransform
                            attributeName="transform"
                            begin="-0.875s"
                            dur="1s"
                            keyTimes="0;1"
                            repeatCount="indefinite"
                            type="scale"
                            values="1.5 1.5;1 1"
                        ></animateTransform>
                        <animate
                            attributeName="fill-opacity"
                            begin="-0.875s"
                            dur="1s"
                            keyTimes="0;1"
                            repeatCount="indefinite"
                            values="1;0"
                        ></animate>
                    </circle>
                </g>
                <g transform="rotate(45 -50.355 121.569)">
                    <circle r="6" fill="#0516a4" fillOpacity="0.875">
                        <animateTransform
                            attributeName="transform"
                            begin="-0.75s"
                            dur="1s"
                            keyTimes="0;1"
                            repeatCount="indefinite"
                            type="scale"
                            values="1.5 1.5;1 1"
                        ></animateTransform>
                        <animate
                            attributeName="fill-opacity"
                            begin="-0.75s"
                            dur="1s"
                            keyTimes="0;1"
                            repeatCount="indefinite"
                            values="1;0"
                        ></animate>
                    </circle>
                </g>
                <g transform="rotate(90 -15 65)">
                    <circle r="6" fill="#0516a4" fillOpacity="0.75">
                        <animateTransform
                            attributeName="transform"
                            begin="-0.625s"
                            dur="1s"
                            keyTimes="0;1"
                            repeatCount="indefinite"
                            type="scale"
                            values="1.5 1.5;1 1"
                        ></animateTransform>
                        <animate
                            attributeName="fill-opacity"
                            begin="-0.625s"
                            dur="1s"
                            keyTimes="0;1"
                            repeatCount="indefinite"
                            values="1;0"
                        ></animate>
                    </circle>
                </g>
                <g transform="rotate(135 -.355 41.569)">
                    <circle r="6" fill="#0516a4" fillOpacity="0.625">
                        <animateTransform
                            attributeName="transform"
                            begin="-0.5s"
                            dur="1s"
                            keyTimes="0;1"
                            repeatCount="indefinite"
                            type="scale"
                            values="1.5 1.5;1 1"
                        ></animateTransform>
                        <animate
                            attributeName="fill-opacity"
                            begin="-0.5s"
                            dur="1s"
                            keyTimes="0;1"
                            repeatCount="indefinite"
                            values="1;0"
                        ></animate>
                    </circle>
                </g>
                <g transform="rotate(180 10 25)">
                    <circle r="6" fill="#0516a4" fillOpacity="0.5">
                        <animateTransform
                            attributeName="transform"
                            begin="-0.375s"
                            dur="1s"
                            keyTimes="0;1"
                            repeatCount="indefinite"
                            type="scale"
                            values="1.5 1.5;1 1"
                        ></animateTransform>
                        <animate
                            attributeName="fill-opacity"
                            begin="-0.375s"
                            dur="1s"
                            keyTimes="0;1"
                            repeatCount="indefinite"
                            values="1;0"
                        ></animate>
                    </circle>
                </g>
                <g transform="rotate(-135 20.355 8.431)">
                    <circle r="6" fill="#0516a4" fillOpacity="0.375">
                        <animateTransform
                            attributeName="transform"
                            begin="-0.25s"
                            dur="1s"
                            keyTimes="0;1"
                            repeatCount="indefinite"
                            type="scale"
                            values="1.5 1.5;1 1"
                        ></animateTransform>
                        <animate
                            attributeName="fill-opacity"
                            begin="-0.25s"
                            dur="1s"
                            keyTimes="0;1"
                            repeatCount="indefinite"
                            values="1;0"
                        ></animate>
                    </circle>
                </g>
                <g transform="rotate(-90 35 -15)">
                    <circle r="6" fill="#0516a4" fillOpacity="0.25">
                        <animateTransform
                            attributeName="transform"
                            begin="-0.125s"
                            dur="1s"
                            keyTimes="0;1"
                            repeatCount="indefinite"
                            type="scale"
                            values="1.5 1.5;1 1"
                        ></animateTransform>
                        <animate
                            attributeName="fill-opacity"
                            begin="-0.125s"
                            dur="1s"
                            keyTimes="0;1"
                            repeatCount="indefinite"
                            values="1;0"
                        ></animate>
                    </circle>
                </g>
                <g transform="rotate(-45 70.355 -71.569)">
                    <circle r="6" fill="#0516a4" fillOpacity="0.125">
                        <animateTransform
                            attributeName="transform"
                            begin="0s"
                            dur="1s"
                            keyTimes="0;1"
                            repeatCount="indefinite"
                            type="scale"
                            values="1.5 1.5;1 1"
                        ></animateTransform>
                        <animate
                            attributeName="fill-opacity"
                            begin="0s"
                            dur="1s"
                            keyTimes="0;1"
                            repeatCount="indefinite"
                            values="1;0"
                        ></animate>
                    </circle>
                </g>
            </svg>

        </div>

    )
}

export default Spinner;