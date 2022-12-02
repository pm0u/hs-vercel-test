#! /bin/bash

red="\033[0;91m"
blue="\033[0;94m"
green="\033[0;92m"
bold="\033[1m"
reset="\033[0m"

function same_commit() {
  echo -e "${green}${bold}>>> Checking commits...${reset}"
  echo -e "${blue}>>> Current commit: ${COMMIT_REF}${reset}"
  echo -e "${green}>>> Cached commit: ${CACHED_COMMIT_REF}${reset}"
  if [ "$CACHED_COMMIT_REF" == "$COMMIT_REF" ]; then
    echo -e "${blue}${bold}>>> We've already deployed this commit...${reset}"
    return 0
  fi
  echo -e "${green}${bold}>>> Haven't seen this commit before...${reset}"
  return 1
}

if same_commit; then
  echo -e "${green}${bold}>>> Skipping build...${reset}"
  exit 0
fi

echo -e "${green}${bold}>>> New commit, checking for changes in current deployment, UI library, and configs...${reset}"

# Checks for changes in this directory as well as the UI component directory & 
# configs to determine whether or not to proceed with build.
git diff --quiet $CACHED_COMMIT_REF $COMMIT_REF . ../../libs/ui-components ../../configs

