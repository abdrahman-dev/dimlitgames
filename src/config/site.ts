import type { NavItem, SocialLink } from "../types";

export const site = {
  name: "Dimlit Games",
  tagline: "Creating strange worlds that stay with you.",
  description:
    "We craft strange, atmospheric worlds shaped by mystery and emotion. Every game is an invitation to explore something that lingers long after the screen goes dark.",
  copyright: `© ${new Date().getFullYear()} Dimlit Games. All rights reserved.`,
  location: "Built in Alexandria, Egypt.",
  email: "contact@dimlitgames6.com",
  nav: [
    { label: "Home", href: "#hero" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Find Us", href: "#find-us" },
  ] satisfies NavItem[],
  socials: [
    {
      label: "GitHub",
      url: "https://github.com/dimlitgames",
      icon: "FaGithub",
    },
    {
      label: "itch.io",
      url: "https://dimlitgames.itch.io",
      icon: "SiItchdotio",
    },
    {
      label: "TikTok",
      url: "https://tiktok.com/@dimlitgames",
      icon: "FaTiktok",
    },
  ] satisfies SocialLink[],
  itchUrl: "https://dimlitgames.itch.io",
  githubUrl: "https://github.com/dimlitgames",
} as const;
