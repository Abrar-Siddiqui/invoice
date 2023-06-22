import debounce from "lodash.debounce";
import { useCallback, useRef } from "react";

const useDebouncedCallback = (callback, delay) => {
    const callbackRef = useRef();
    callbackRef.current = callback;
    return useCallback(debounce(
        (...args) => callbackRef.current(...args),
        delay,
    ), []);
};

export default useDebouncedCallback;