# JoinHandshake Web Monorepo

A repository to house joinhandshake.com and associated dependencies and tooling

## Repository Structure

```
. [1]
├── apps/ [2]
│   ├── joinhandshake-web
│   ├── storybook
│   ├── sanity
│   └── ...
├── libs/ [3]
│   ├── ui-components
│   └── ...
└── configs/ [4]
    └── ...
```

1. `.` (Project root)

    The project root contains project level dependencies, configurations, information, and commands that run scripts in multiple workspaces

1. `apps`

    This folder should contain _applications_ - as in standalone projects that are intended to be deployed or run.

1. `libs`

    This folder should contain _libraries_ - as in tools, utilities, and components that are intended to be consumed by projects in the `apps` directory.

1. `configs`

    This folder should contain configuration files that are intended to be shared between libraries and/or applications to ensure consistency.

## IDE Setup

There are recommended extensions set up for this directory, to view/install them open the VSCode extension panel and enter `@recommended` in the search box.

## Setting up the Project

### Node Version

Use the correct Node version - `v18.20.x`. 

If you use nvm, an .nvmrc is provided so you can simply run `nvm use` in the root of this project to set the correct node version.

If a compatible node version is not available on your system it will need to be installed via `nvm install`. If this command is run in a subdirectory of this repository, it will reference the correct node version from `.nvmrc`

### Install dependencies 

Run `yarn install` - This command needs to be run from the project root (`1` in the diagram above), dependencies for all sub-projects will be taken care of.


### Environment Variables

- **Sanity**
    - Within Studio
        - Project ID `SANITY_STUDIO_API_PROJECT_ID` - this is obtained from the [management console](https://manage.sanity.io)
        - If you are not already logged in, you will be prompted to do so when the studio is run for the first time.
        - More CLI info [here](https://www.sanity.io/docs/getting-started-with-sanity-cli)
    - Within Web Application _@TODO_

## Project level commands

Project level commands should be namespaced to either the sub-project they pertain to or the general intent - IE `web:watch` would be expected to run the `watch` command in the `web` application. Similarly `auth:dev` could run multiple applications to allow development of an authorization library and server.

Commands that run multiple tasks should make use of [concurrently](https://https://www.npmjs.com/package/concurrently) to produce clean output and predictable failure.

### Useful Commands

`yarn components:dev` - runs both the watch commands for the ui-component library and storybook as well as opens storybook in a browser

`yarn web:dev` - runs the next server in dev mode