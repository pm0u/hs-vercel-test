#! /bin/bash

red="\033[0;91m"
blue="\033[0;94m"
green="\033[0;92m"
bold="\033[1m"
reset="\033[0m"

echo -e "${blue}${bold}Linting...${reset}"
echo -e "${green}${bold}Linting web...${reset}"
yarn --silent workspace @joinhandshake/joinhandshake-web lint
echo -e "${green}${bold}Linting ui components...${reset}"
yarn --silent workspace @joinhandshake/ui-components lint
