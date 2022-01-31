import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import Window from './Window';
import validCommands from "../validCommands";
import { ThemeContext } from '../context/ThemeContext';
import { TerminalContext } from '../context/TerminalContext';
import { HistoryItem } from '../hooks/useTerminal';

interface RowItem {
  id: string;
  value: string;
  showLabel: boolean;
  workingDirectory: string;
}

const TerminalEl = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: row;
  background-color: ${props => props.theme.colors.main.primary};
  ${(props: { maximized: boolean, currentTheme: string }) => props.currentTheme === 'light' && {
    borderRight: '1px solid #a9a9a9',
    borderBottom: '1px solid #a9a9a9',
    borderLeft: '1px solid #a9a9a9',
  }};
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  ${(props: { maximized: boolean, currentTheme: string}) =>
    props.maximized
      ? {
          width: "100%",
          height: "100vh",
          position: "absolute",
          zIndex: 2,
          top: 0,
          left: 0,
        }
      : {
          height: "500px",
          width: "1000px",
          position: 'relative',
      }}
`;

const DefaultMessage = styled.div`
  color: ${(props) => props.theme.colors.main.secondary};
  width: 300px;
  margin: 0px auto 20px auto;
  font-size: 14px;
`;

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  position: relative;
  width: 100%;
  height: 450px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 20px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: #626262;
    border-radius: 10px;
  }
  overflow-x: hidden;
  margin-top: 50px;
  font-size: 22px;
  font-family: "Ubuntu Mono", monospace;
`;

const TerminalInput = styled.input`
  width: 100%;
  background-color: transparent;
  outline: none;
  border: none;
  color: ${props => props.theme.colors.main.secondary};
  font-size: 22px;
  font-family: "Ubuntu Mono", monospace;
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  content: "";
  width: 100%;
  height: 30px;
  background-color: #626266;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const Title = styled.div`
  position: relative;
  color: ${props => props.theme.colors.main.secondary};
  display: flex;
  flex-direction: column;
  text-align: left;
  flex: 1 0 25%;
  order: 2;
  font-family: "Roboto", sans-serif;
  font-weight: 800;

  &:before {
    position: absolute;
    content: "";
    width: 8px;
    height: 8px;
    background-color: ${props => props.theme.colors.main.secondary};
    top: 6px;
    border-radius: 50%;
    left: -15px;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1 0 auto;
  order: 1;
`;

const Button = styled.button`
  &:nth-of-type(1) {
    margin-left: 14px;
  }
  cursor: pointer;
  margin-right: 20px;
  border-radius: 50%;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  width: 25px;
  height: 25px;
  background-color: ${(props: { variant: string, theme: any }) => {
    switch (props.variant) {
      case 'danger':
        return props.theme.colors.danger;
      case 'success':
        return props.theme.colors.success;
      case 'warning':
        return props.theme.colors.warning;
      default:
        return;
    }
  }};
  outline: none;
  border: none;
`;

const Label = styled.span`
  display: flex;
  flex-direction: row;
  color: ${props => props.theme.colors.main.secondary};
  margin-right: 4px;
  margin-left: 4px;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  color: ${props => props.theme.colors.main.secondary};
`;

const RowValue = styled.div`
  ${(props: { isLink: boolean }) =>
    props.isLink && {
      cursor: "pointer",
      textDecoration: "underline"
    }}
  white-space: pre-line;
`;

export default function Terminal() {
  const { theme, switchTheme } = React.useContext(ThemeContext);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const screenRef = React.useRef<HTMLDivElement | null>(null);
  const [value, setValue] = React.useState("");
  const [screen, setScreen] = React.useState({
    history: false,
  });
  const [maximized, setMaximized] = React.useState(false);
  const [workingDirectory, setWorkingDirectory] = React.useState("$");
  const navigate = useNavigate();
  const { hideTerminalOnMinimize, setRows, rows, defaultMessage, setDefaultMessage, history } = React.useContext(TerminalContext);

  React.useEffect(() => {
    handleFocus();
    return () => {
      setDefaultMessage(false);
    };
  }, [setDefaultMessage]);

  React.useEffect(() => {
    if (screenRef?.current) {
      screenRef.current.scrollTop = screenRef.current.scrollHeight;
    }
  }, [rows]);

  const handleInput = React.useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const handleFocus = () => {
    if (inputRef?.current) {
      inputRef?.current.focus();
    }
  };

  const truncate = (str: string, limit: number) => {
    if (str.length < limit) return str;
    return `${str.split(" ").slice(0, limit).join(" ")}...`;
  };

  const checkCommand = (command: string) => {
    const parts = command.toLowerCase().split(' ');
    if (parts.length > 2) {
      setRows((prev: any) => [
        ...prev,
        { id: uuidv4(), value: `Command accepts 1 argument ${parts.length} given`, showLabel: false,  workingDirectory }
      ]);
    }
    const [commandName, commandValue] = parts;
    /**
     * TODO: Figure out a better way to handle history expansion
     *
     */
    if (commandName.startsWith('!')) {
      history?.getHistory()?.forEach((item: HistoryItem) => {
        if (item.id.includes(commandName.substring(1))) {
          setValue(item.value);
        }
      });
      setScreen({ history: false });
      return;
    } else {
      setValue('');
    }
    //TODO: Possibly involve helper library / function to handle this
    if (Object.keys(validCommands).includes(commandName)) {
      switch (commandName) {
        case "linkedin":
          setRows((prev: Array<RowItem>) => [
            ...prev,
            { id: uuidv4(), value: validCommands[commandName], showLabel: false,  workingDirectory }
          ]);
          break;
        case "clear":
          setRows([]);
          setDefaultMessage(false);
          break;
        case "navigate":
          if (commandValue) {
            setRows((prev: Array<RowItem>) => [
              ...prev,
              { id: uuidv4(), value: validCommands[commandName], showLabel: false,  workingDirectory }
            ]);
            if (commandValue === 'home') {
              navigate('/');
            } else {
              navigate(`/${commandValue}`);
            }
          }
          break;
        case "settheme":
          if (commandValue) {
            switchTheme(commandValue);
            setRows((prev: Array<RowItem>) => [
              ...prev,
              { id: uuidv4(), value: validCommands[commandName], showLabel: false,  workingDirectory }
            ]);
          }
          break;
        case "help":
          setRows((prev: Array<RowItem>) => [
            ...prev,
            { id: uuidv4(), value: validCommands[commandName], showLabel: false,  workingDirectory }
          ]);
          break;
        case "cd":
          if (commandValue) {
            setWorkingDirectory(commandValue);
            setRows((prev: Array<RowItem>) => [
              ...prev,
              { id: uuidv4(), value: validCommands[commandName], showLabel: false,  workingDirectory }
            ]);
          } else if (!commandValue) {
            setWorkingDirectory('$');
            setRows((prev: Array<RowItem>) => [
              ...prev,
              { id: uuidv4(), value: validCommands[commandName], showLabel: false,  workingDirectory }
            ]);
          }
          break;
        case "history":
          setScreen({ history : true });
          break;
        default:
          break;
      }
    } else {
      setRows((prev: Array<RowItem>) => [
        ...prev,
        {
          id: uuidv4(),
          value: `command not found: ${command}\n`,
          showLabel: false,
           workingDirectory
        }
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setRows((prev: any) => [...prev, { id: uuidv4(), value, showLabel: true,  workingDirectory }]);
      history?.add(
        { id: uuidv4(), value, showLabel: true }
      );
      setValue("");
    }

    if (e.key === "Enter" && value !== "") {
      checkCommand(value);
      // setValue("");
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const val = history.previous()?.value;
      if (val) {
        setValue(val);
      } else {
        setValue('');
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const val = history.next()?.value;
      if (val) {
        setValue(val);
      } else {
        setValue('');
      }
    }
  };

  const handleLinkClick = (val: string) => (e: React.MouseEvent<HTMLDivElement>) => {
    if (val.includes("https")) {
      window.open(val, "_blank");
    }
  };

  const setMaxWindow = () => {
    setMaximized((prev) => !prev);
  };

  return (
    <div>
      <TerminalEl currentTheme={theme} maximized={maximized}>
        <TopBar>
          <Title>Terminal - {truncate(workingDirectory, 20)}</Title>
          <ActionButtons>
            <Button variant='danger'>X</Button>
            <Button onClick={hideTerminalOnMinimize} variant='warning'>-</Button>
            <Button onClick={setMaxWindow} variant='success'>
              +
            </Button>
          </ActionButtons>
        </TopBar>
        <Screen ref={screenRef} onClick={handleFocus}>
          {defaultMessage && (
            <DefaultMessage>
              Welcome to my portfolio! <br />Some useful commands you can run: <br /><br />
              <ul style={{ width: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'left' }}>
                <li><strong>help</strong>: Get a complete list of commands</li>
                <li><strong>linkedin</strong>: Get a clickable link that will direct you to my LinkedIn profile</li>
                <li><strong>clear</strong>: Clear all messages on the screen (including this one)</li>
              </ul>
            </DefaultMessage>
          )}
          {screen.history && (
              <Window>
                {history?.getHistory()?.map((item: HistoryItem) => (
                    <div key={item.id}>
                      <span>{item.id}</span>
                      <span>{item.value}</span>
                    </div>
                ))}
              </Window>
          )}
          {rows.map((row: any) => (
            <RowContainer key={row.id}>
              <Label>{row.showLabel ? row.workingDirectory : ""}</Label>
              <RowValue
                onClick={handleLinkClick(row.value)}
                isLink={row.value.includes("https")}
              >
                {row.value}
              </RowValue>
            </RowContainer>
          ))}
          <RowContainer>
            <Label>{workingDirectory} </Label>
            <TerminalInput
              value={value}
              ref={inputRef}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
            />
          </RowContainer>
        </Screen>
      </TerminalEl>
    </div>
  );
}
