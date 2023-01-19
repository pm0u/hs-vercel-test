#! /bin/bash

red="\033[0;91m"
blue="\033[0;94m"
green="\033[0;92m"
bold="\033[1m"
reset="\033[0m"
yellow="\033[0;33m"

TIMESTAMP=$(date "+%Y.%m.%d-%H.%M.%S")
FILENAME="import-${TIMESTAMP}"
OUTPUT_DATASET="production"
INPUT_DATASET="staging"
EXPORT_ONLY=false
DOCUMENTS_ONLY=false
DRY_RUN=false
SAVE_FILE=false
HELP=false
DOCUMENT_ACTION="--missing"
RAW=""
ASSET_CONCURRENCY=24

HELP_TEXT="${bold}Usage:\n${reset}${green}migrate [options]\n\
  ${bold}Options:${reset}\n\
  ${blue}-t|--types [type1,type2]\t${reset}specify types to export\n\
  ${blue}-f|--filename [filename]\t${reset}specify filename\n\
  ${blue}-o|--output-dataset [dataset]\t${reset}specify dataset to import to (default: production)\n\
  ${blue}-i|--input-dataset [dataset]\t${reset}specify dataset to export from (default: staging)\n\
  ${blue}-X|--dry-run\t\t\t${reset}take no action but explain steps that would be taken\n\
  ${blue}-s|--save-file\t\t${reset}keep the export file (if export only is specified, this is assumed)\n\
  ${blue}-e|--export-only\t\t${reset}skip the import step\n\
  ${blue}-d|--documents-only\t\t${reset}skip assets\n\
  ${blue}-R|--replace\t\t\t${reset}replace documents with those from import, rather than only missing\n\
  ${blue}-r|--raw\t\t\t${reset}specifies raw flag on export, changes reference handling(see sanity docs)\n\
  ${blue}-a|--a [number]\t\t\t${reset}set asset concurrency, defaults to 24 (max)\n\
  \n\
  ${yellow}if types (-t|--types) are not provided, all types are exported${reset}\n\
  ${green}example:\n\
  migrate --types type1,type2 -i production -o staging -R\n${reset}"

while [[ $# -gt 0 ]]; do
  case $1 in
    -h|--help)
      HELP=true
      shift
      ;;
    -t|--types)
      TYPES="--types $2"
      shift
      shift
      ;;
    -f|--f)
      FILENAME="$2"
      shift
      shift
      ;;
    -o|--output-dataset)
      OUTPUT_DATASET="$2"
      shift
      shift
      ;;
    -i|--input-dataset)
      INPUT_DATASET="$2"
      shift
      shift
      ;;
    -e|--export-only)
      EXPORT_ONLY=true
      shift
      ;;
    -d|--documents-only)
      DOCUMENTS_ONLY="--no-assets"
      shift
      ;;
    -X|--dry-run)
      DRY_RUN=true
      shift
      ;;
    -s|--save-file)
      SAVE_FILE=true
      shift
      ;;
    -R|--replace)
      DOCUMENT_ACTION="--replace"
      shift
      ;;
    -r|--raw)
      RAW="--raw"
      shift
      ;;
    -a|--asset-concurrency)
      ASSET_CONCURRENCY="$2"
      shift
      shift
      ;;
  esac
done

if [ "${HELP}" = true ]; then echo -e "${HELP_TEXT}"; exit 0; fi

if [ "${DRY_RUN}" = true ]; then
  echo -e "${yellow}Dry run, exiting...${reset}"
  echo -e "${yellow}Export would be saved to: ${PWD}/${FILENAME}.tar.gz${reset}"

  if [ "${SAVE_FILE}" = true ] || [ "${EXPORT_ONLY}" = true ]; then
    echo -e "${yellow}File would be saved${reset}"
  else
    echo -e "${yellow}File would be removed after import${reset}"
  fi

  if [ "${EXPORT_ONLY}" = true ]; then
    echo -e "${yellow}Exporting only, import skipped"
  fi

  if [ "${TYPES}" = "" ]; then
    echo -e "${yellow}All types exported"
  else
    TYPES_SPLIT=($TYPES)
    echo -e "${yellow}Types exported: ${TYPES_SPLIT[1]}${reset}"
  fi

  if [ "${DOCUMENTS_ONLY}" == "--no-assets" ]; then
    echo -e "${yellow}Exporting only documents${reset}"
  else
    echo -e "${yellow}Exporting documents and assets${reset}"
  fi

  echo -e "${yellow}From ${INPUT_DATASET} to ${OUTPUT_DATASET}${reset}"

  if [ "${RAW}" == "--raw" ]; then
    echo -e "${yellow}Raw export${reset}"
  fi

  if [ "${DOCUMENT_ACTION}" == "--replace" ]; then
    echo -e "${red}Replacing documents${reset}"
  else
    echo -e "${yellow}Only missing documents${reset}"
  fi

  exit 0
fi

echo -e "${green}Migrating types '${TYPES}' from '${INPUT_DATASET}' to '${OUTPUT_DATASET}'...${reset}"

if [ "$DOCUMENTS_ONLY" = "--no-assets" ]; then
  echo -e "${yellow}Exporting only documents...${reset}"
else
 echo -e "${yellow}Exporting documents and assets...${reset}"
fi

echo -e "${blue}Exporting...${reset}"
sanity dataset export $INPUT_DATASET $FILENAME.tar.gz --types $TYPES $DOCUMENTS_ONLY $RAW --asset-concurrency 24

if [ "$EXPORT_ONLY" = true ]; then
  echo -e "${blue}Export done, exiting..${reset}"
  exit 0
fi

echo -e "${blue}Importing...${reset}"
sanity dataset import $FILENAME.tar.gz $OUTPUT_DATASET $DOCUMENT_ACTION
echo -e "${blue}Cleaning up...${reset}"
rm $FILENAME.tar.gz
echo -e "${green}Done!"