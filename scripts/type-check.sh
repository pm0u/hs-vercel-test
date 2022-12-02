#! /bin/bash

red="\033[0;91m"
blue="\033[0;94m"
green="\033[0;92m"
bold="\033[1m"
reset="\033[0m"

echo -e "${blue}${bold}Checking types...${reset}"
echo -e "${green}${bold}Checking web...${reset}"
yarn --silent workspace @joinhandshake/joinhandshake-web types
echo -e "${green}${bold}Checking ui components...${reset}"
yarn --silent workspace @joinhandshake/ui-components types
