import React from "react";
import { useMockTableProvider } from "../../hooks/useMockTable";

const MockTableContext = React.createContext({});

export const MockTableProvider = ({ children }) => {
    const mockTableProvider = useMockTableProvider();

    return (
        <MockTableContext.Provider value={mockTableProvider}>
            {children}
        </MockTableContext.Provider>
    );
}

export default MockTableContext;