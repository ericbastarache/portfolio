import React from 'react';
import TerminalHistory from '../classes/TerminalHistory';

interface TerminalContextInterface {
    showTerminal: boolean;
    hideTerminalOnMinimize: any;
    showTerminalAfterMinimize: any;
    rows: Array<RowItem>;
    setDefaultMessage: any;
    defaultMessage: boolean;
    setRows: any;
    history: any;
};

interface RowItem {
  id: string;
  value: string;
  showLabel: boolean;
}

const TerminalContext = React.createContext<TerminalContextInterface>({} as TerminalContextInterface);

const TerminalContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [defaultMessage, setDefaultMessage] = React.useState<boolean>(false);
    const [showTerminal, setShowTerminal] = React.useState(false);
    const [history, setHistory] = React.useState<any>(null);
    const [rows, setRows] = React.useState<Array<RowItem>>([]);

    React.useEffect(() => {
        setShowTerminal(true);
        const history = new TerminalHistory();
        setHistory(history);
    }, []);

    const hideTerminalOnMinimize = () => setShowTerminal(false);

    const showTerminalAfterMinimize = () => setShowTerminal(true);

    return (
        <TerminalContext.Provider value={{ showTerminal, hideTerminalOnMinimize, showTerminalAfterMinimize, rows, setRows, defaultMessage, setDefaultMessage, history }}>
            {children}
        </TerminalContext.Provider>
    );
};

export {
    TerminalContextProvider,
    TerminalContext
};
