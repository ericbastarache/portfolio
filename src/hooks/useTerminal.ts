import React from "react";
// import TerminalHistory from '../classes/TerminalHistory.ts';

export interface HistoryItem {
  id: string;
  value: string;
  showLabel: boolean;
}

const useTerminalHistory = () => {
  const [showTerminal, setShowTerminal] = React.useState<boolean>(true);

  return {
    setShowTerminal,
    showTerminal,
  };
};

export default useTerminalHistory;
