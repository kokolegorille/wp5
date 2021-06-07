import React, { createContext, useContext, useReducer } from "react";
import { Socket, Presence } from 'phoenix';

const SocketContext = createContext();

const ChannelContext = createContext();

const PhxProvider = ({ children }) => {
    <SocketContext.Provider>
        <ChannelContext.Provider>
            {children}
        </ChannelContext.Provider>
    </SocketContext.Provider>
}

export default PhxProvider;

export const useSocket = () => {

}

export const useChannel = () => {
    
}