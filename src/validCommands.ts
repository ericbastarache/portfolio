type ValidCommands = {
  [key: string]: any
}

const validCommands: ValidCommands = {
  linkedin: "https://linkedin.com/in/ericbastarache",
  clear: "",
  help: "Valid commands are: \n- linkedin\n- clear\n- help\n- settheme [dark | light]\n- navigate [home | projects]",
  settheme: "",
  navigate: "",
  cd: "",
  history: "",
  '!': "",
};

export default validCommands;
