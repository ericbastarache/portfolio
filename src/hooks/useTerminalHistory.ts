import React from "react";

interface HistoryItem {
  id: string;
  value: string;
  showLabel: boolean;
}

const useTerminalHistory = () => {
  const [history, setHistory] = React.useState<Array<HistoryItem>>([]);

  const getNextHistoryItem = (idx: number) => {
    console.log(history[idx]);
    if (!history[idx]) {
      return "";
    }
    return history[idx]?.value;
  };

  const getPreviousHistoryItem = (idx: number) => {
    console.log(history[idx]);
    if (!history[idx]) {
      return "";
    }
    return history[idx]?.value;
  };

  return {
    history,
    setHistory,
    getNextHistoryItem,
    getPreviousHistoryItem
  };
};

export default useTerminalHistory;
