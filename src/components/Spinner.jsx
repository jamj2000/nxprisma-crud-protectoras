function Spinner() {
    return (
        <div className="grid place-content-center h-[500px]">
            {/* <div className="text-2xl text-blue-200 font-bold animate-pulse">
            Obteniendo datos ...
            </div> 
        */}
            <div className="animate-spin rounded-full size-32 border-t-4 border-b-4 border-blue-500  outline-1 outline-dotted outline-blue-700">
            </div>
        </div>
    );
}

export default Spinner;