/** Static, locale-independent site configuration. */
export const siteConfig = {
  name: "Tung Pham",
  email: "joseph.pham280996@gmail.com",
  phone: "+1 857-333-8190",
  social: {
    github: "https://github.com/joseph280996",
    linkedin: "https://www.linkedin.com/in/tung-pham-joseph",
    facebook: "https://www.facebook.com/j.t.x.pham",
  },
} as const;

export type SocialPlatform = keyof typeof siteConfig.social;
