#! /bin/bash

red="\033[0;91m"
blue="\033[0;94m"
green="\033[0;92m"
bold="\033[1m"
reset="\033[0m"

ERR=0

echo -e "${blue}${bold}Linting styles...${reset}"
echo -e "${green}${bold}Linting web styles...${reset}"
yarn --silent workspace @joinhandshake/joinhandshake-web styles || ERR=1

exit $ERR