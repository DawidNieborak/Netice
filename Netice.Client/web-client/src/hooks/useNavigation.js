import { useState, useCallback } from "react";

const useNavigation = () => {
    // Here Home could be insted
    const [route, setRoute] = useState("");

    const selectAction = useCallback(
        (option) => {
            if (route === option) return;
            setRoute(option);
        },
        [route]
    );

    return { currentRoute: route, setCurrentRoute: selectAction };
};

export default useNavigation;