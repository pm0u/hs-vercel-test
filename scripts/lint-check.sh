#! /bin/bash

red="\033[0;91m"
blue="\033[0;94m"
green="\033[0;92m"
bold="\033[1m"
reset="\033[0m"

ERR=0

echo -e "${blue}${bold}Linting...${reset}"
echo -e "${green}${bold}Linting web...${reset}"
yarn --silent workspace @joinhandshake/joinhandshake-web lint || ERR=1
echo -e "${green}${bold}Linting ui components...${reset}"
yarn --silent workspace @joinhandshake/ui-components lint || ERR=1
echo -e "${green}${bold}Linting sanity studio...${reset}"
yarn --silent workspace @joinhandshake/sanity-studio lint || ERR=1

exit $ERR