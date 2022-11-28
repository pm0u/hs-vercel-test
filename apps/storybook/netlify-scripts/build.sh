#! /bin/bash

GREEN="\033[1;32m"
RESET="\033[0m"

cd ../..
echo -e "${GREEN}>> Building UI Components stylesheet...${RESET}\n"
yarn ui-components:build
echo -e "${GREEN}>> Returning to storybook and building...${RESET}\n"
cd apps/storybook
yarn build-storybook
echo -e "${GREEN}>> Complete!${RESET}\n"
