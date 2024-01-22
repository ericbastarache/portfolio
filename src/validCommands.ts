type ValidCommands = {
  [key: string]: any
}

const validCommands: ValidCommands = {
  linkedin: "https://linkedin.com/in/ericbastarache",
  clear: "",
  help: "Valid commands are: \n- linkedin\n- clear\n- help\n- settheme [dark | light]\n- navigate [home | projects] \n- download [snippet-saver] \n - ls",
  settheme: "",
  navigate: "",
  download: "",
  ls: "",
  cd: "",
  history: "",
  '!': "",
};

export default validCommands;
