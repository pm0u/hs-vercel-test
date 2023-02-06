import { DocumentDefinition } from "sanity"

export const nextIsNow: DocumentDefinition = {
  name: "nextIsNow",
  type: "document",
  title: "Next is Now",
  preview: {
    prepare: () => ({
      title: "Next is Now",
    }),
  },
  groups: [
    {
      name: "pageData",
      title: "Page Data",
      default: true,
    },
    {
      name: "resourcesWindow",
      title: "Resources Window",
    },
    {
      name: "desktopIcons",
      title: "Desktop icons",
    },
    {
      name: "miscIcons",
      title: "Misc Icons",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    { type: "seo", group: "seo", name: "seo" },
    {
      group: "pageData",
      title: "# Students stat",
      name: "numStudents",
      type: "number",
    },
    {
      group: "pageData",
      title: "# universities stat",
      name: "numUniversities",
      type: "number",
    },
    {
      type: "image",
      name: "oldWordmark",
      group: "miscIcons",
      title: "Old Wordmark (in titlebar)",
    },
    {
      type: "image",
      name: "newWordmark",
      group: "miscIcons",
      title: "New Wordmark (in titlebar)",
    },
    {
      type: "image",
      name: "todoListEmoji",
      group: "miscIcons",
      title: "Todo list emoji",
    },
    {
      type: "image",
      name: "spaceInvaderEmoji",
      group: "miscIcons",
      title: "Space Invader Emoji",
    },
    {
      type: "array",
      name: "webinars",
      title: "Webinar Videos",
      of: [{ type: "youtubeVideo" }],
      group: "pageData",
    },
    {
      type: "image",
      name: "linkedInIcon",
      title: "LinkedIn Desktop Icon (old)",
      group: "desktopIcons",
    },
    {
      type: "image",
      name: "handshakeIcon",
      title: "Handshake Desktop Icon (old)",
      group: "desktopIcons",
    },
    {
      type: "image",
      name: "demoIcon",
      title: "Demo Icon (old)",
      group: "desktopIcons",
    },
    {
      type: "image",
      name: "linkedInIconTransformed",
      title: "LinkedIn Desktop Icon (new)",
      group: "desktopIcons",
    },
    {
      type: "image",
      name: "handshakeIconTransformed",
      title: "Handshake Desktop Icon (new)",
      group: "desktopIcons",
    },
    {
      type: "image",
      name: "demoIconTransformed",
      title: "Demo Icon (new)",
      group: "desktopIcons",
    },
    {
      type: "image",
      name: "recruitingIcon",
      title: "Recruiting Icon (old)",
      group: "resourcesWindow",
    },
    {
      type: "image",
      name: "recruitingIconTransformed",
      title: "Recruiting Icon (new)",
      group: "resourcesWindow",
    },
    {
      type: "image",
      name: "etaIcon",
      title: "ETA Icon (old)",
      group: "resourcesWindow",
    },
    {
      type: "image",
      name: "etaIconTransformed",
      title: "ETA Icon (new)",
      group: "resourcesWindow",
    },
    {
      type: "image",
      name: "hntIcon",
      title: "HNT Icon (old)",
      group: "resourcesWindow",
    },
    {
      type: "image",
      name: "hntIconTransformed",
      title: "HNT Icon (new)",
      group: "resourcesWindow",
    },
    {
      type: "image",
      name: "howToRecruitIcon",
      title: "Gen Z Recruiting Icon (old)",
      group: "resourcesWindow",
    },
    {
      type: "image",
      name: "howToRecruitIconTransformed",
      title: "Gen Z Recruiting Icon (new)",
      group: "resourcesWindow",
    },
    {
      type: "image",
      name: "careerFairIcon",
      title: "Career Fair Icon (old)",
      group: "resourcesWindow",
    },
    {
      type: "image",
      name: "careerFairIconTransformed",
      title: "Career Fair Icon (new)",
      group: "resourcesWindow",
    },
  ],
}
