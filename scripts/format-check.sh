#! /bin/bash

red="\033[0;91m"
blue="\033[0;94m"
green="\033[0;92m"
bold="\033[1m"
reset="\033[0m"

ERR=0

echo -e "${blue}${bold}Formatting...${reset}"
echo -e "${green}${bold}Formatting web...${reset}"
yarn --silent workspace @joinhandshake/joinhandshake-web format || ERR=1
echo -e "${green}${bold}Formatting sanity studio...${reset}"
yarn --silent workspace @joinhandshake/sanity-studio format || ERR=1


exit $ERR