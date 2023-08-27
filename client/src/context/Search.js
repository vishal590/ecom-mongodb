import { useState, createContext, useContext } from "react";


const SearchContext = createContext();

const SearchProvider = ({children}) => {
    const [auth, setAuth] = useState({
        keyword: '',
        results: [],
    })
    return <SearchContext.Provider value={[auth, setAuth]}>{children}</SearchContext.Provider>
}

const useSearch = () => {
    return useContext(SearchContext);
}

export {SearchContext, SearchProvider, useSearch};