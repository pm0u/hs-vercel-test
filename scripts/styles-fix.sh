#! /bin/bash

red="\033[0;91m"
blue="\033[0;94m"
green="\033[0;92m"
bold="\033[1m"
reset="\033[0m"

PROCEED="y"

CHANGED=$(git status --porcelain)

if [[ "$CHANGED" ]]; then
  PROCEED="n"
  echo -e "${red}${bold}WARNING: ${reset}${red}This command will modify files without warning.${reset}"
  echo -e "${red}It looks like you have uncommitted changes. It is recommended you commit changes before proceeding to avoid losing work."
  read -p $'Do you wish to proceed?(y/N)\n' PROCEED
  echo -e "${reset}"
fi

if [[ "$PROCEED" = "y" || $PROCEED = "Y" ]]; then
  echo -e "${blue}${bold}Linting styles...${reset}"
  echo -e "${green}${bold}Linting web styles...${reset}"
  yarn --silent workspace @joinhandshake/joinhandshake-web styles:fix
  echo -e "${green}${bold}Linting ui components styles...${reset}"
  yarn --silent workspace @joinhandshake/ui-components styles:fix
  exit
fi

echo -e "${red}Linting styles aborted${reset}"
