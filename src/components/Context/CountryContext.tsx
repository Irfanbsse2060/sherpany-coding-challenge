import React from 'react'

type Action = {type: 'update', payload: string[]}
type Dispatch = (action: Action) => void
type State = {countries: string[]}
type CountryProviderProps = {children: React.ReactNode}


const CountryStateContext = React.createContext<State | undefined>(undefined)
const CountryDispatchContext = React.createContext<Dispatch | undefined>(
    undefined,
)

function countryReducer(state: State, action: Action) {
    switch (action.type) {
        case 'update': {
            return {countries: action.payload}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}



function CountryProvider({children}: CountryProviderProps) {
    const [state, dispatch] = React.useReducer(countryReducer, {countries: []})
    return (
        <CountryStateContext.Provider value={state}>
        <CountryDispatchContext.Provider value={dispatch}>
            {children}
            </CountryDispatchContext.Provider>
            </CountryStateContext.Provider>
    )
}


function useCountryState() {
    const context = React.useContext(CountryStateContext)
    if (context === undefined) {
        throw new Error('useCountState must be used within a CountProvider')
    }
    return context
}
function useCountryDispatch() {
    const context = React.useContext(CountryDispatchContext)
    if (context === undefined) {
        throw new Error('useCountDispatch must be used within a CountProvider')
    }
    return context
}


export {CountryProvider, useCountryState, useCountryDispatch}
