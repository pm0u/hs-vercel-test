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

There are many ways for you to install and set up Node.js. This guide explore some of the most common ways to install Node.js on your Mac.
[Best practice for installing Node.js](https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js/)

Use the correct Node version - `v18.12.x`.

If you use nvm, an .nvmrc is provided so you can simply run `nvm use` in the root of this project to set the correct node version.

If a compatible node version is not available on your system it will need to be installed via `nvm install`. If this command is run in a subdirectory of this repository, it will reference the correct node version from `.nvmrc`

#### Issue: NVM command not found

That happen when you most likely had a problem during Node Version Manager installation.
To fix that, You can run this command on the bash:
`source ~/.nvm/nvm.sh`
OR you can put it in the file `/.bashrc` or `~/.profile` or `~/.zshrc` to automatically load it.

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

#### Formatting, Linting, and checks

This repo utilizes Github workflows to check formatting and errors. These checks can be run locally as well either per package or at the root to check all applicable packages:

`yarn lint` and `yarn lint:fix` - check or fix ESLint errors

`yarn styles` and `yarn styles:fix` - check or fix Stylelint errors

`yarn format` and `yarn format:fix` - check or fix Prettier formatting errors

`yarn types` - check for TS errors

## Further Reading

### FAQ

#### Benefits of a monorepo

- [The Case for Monorepos: Scaling Web projects without the Chaos (Part 1)](https://medium.com/@jankohofmann/the-case-for-monorepos-scaling-web-projects-without-the-chaos-part-1-3467cb917617)
- [The Case for Monorepos: A sane Workspace Setup (Part 2) (Part 2)](https://medium.com/@jankohofmann/the-case-for-monorepos-a-sane-workspace-setup-part-2-34dcf3fde651)

### Creating a .bash_profile on your Mac

[Bash Profile Mac: What Is it and How it Differs from Bashrc?](https://iboysoft.com/wiki/bash-profile-mac.html)

### Documentation and Tutorials

- [React Docs](https://beta.reactjs.org/)
- [Next.js Docs](https://nextjs.org/docs)
- [The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Beginner's TypeScript](https://www.totaltypescript.com/tutorials/beginners-typescript)
- [Tailwindcss Docs](https://tailwindcss.com/docs/installation)
- [Netlify Docs](https://docs.netlify.com/?_ga=2.110316357.1125744747.1670650699-840960282.1670650699)
- [Storybook for React tutorial](https://storybook.js.org/tutorials/intro-to-storybook/react/en/get-started/)
- [Sanity Docs](https://www.sanity.io/docs)
- [Yarn Docs](https://classic.yarnpkg.com/lang/en/docs/)
