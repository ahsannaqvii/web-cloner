export const SITE = "https://www.infeniti.io";
export const CALENDLY = "https://calendly.com/infeniti-io/discovery-call";

export const services = [
  { title: "Web and Application Development", href: `${SITE}/service/web-application-development` },
  { title: "Custom SaaS Development", href: `${SITE}/service/saas-development` },
  { title: "AI Solutions & Automations", href: `${SITE}/service/ai-solutions-and-automations` },
  { title: "MVP Development", href: `${SITE}/service/saas-product-development` },
  { title: "Custom AI Solutions", href: `${SITE}/service/ai-solutions-and-automations` },
];

export const navLinks = [
  { title: "Works", href: `${SITE}/work` },
  { title: "Company", href: `${SITE}/about` },
  { title: "Careers", href: `${SITE}/career` },
];

export const features = [
  {
    title: "Custom Business Software",
    text: "Purpose-built software designed around your workflows, teams, and operational requirements.",
  },
  {
    title: "Custom SaaS Replacement",
    text: "Replace restrictive SaaS with software you own, control, and evolve as you grow.",
  },
  {
    title: "Business Process Automation",
    text: "Turn repetitive processes into automated workflows that reduce operational friction.",
  },
  {
    title: "AI & Executive Intelligence",
    text: "Transform business data into intelligent dashboards, insights, and decision-making tools.",
  },
];

export const clients = Array.from({ length: 9 }, (_, i) => ({
  src: `/sites/infeniti/clients/client-${i + 1}.png`,
  alt: `Infeniti client logo ${i + 1}`,
}));

export const works = [
  { title: "Padel Bazaar", date: "September - 2025", img: "padel-bazaar", slug: "padel-bazaar" },
  { title: "Artic Audit", date: "July - 2026", img: "artic-audit", slug: "artic-audit" },
  { title: "FindHer", date: "September - 2023", img: "findher", slug: "find-her" },
  { title: "Zehenify", date: "May - 2025", img: "zehenify", slug: "zehenify" },
  { title: "Routify", date: "October - 2024", img: "routify", slug: "routify" },
].map((w) => ({
  ...w,
  src: `/sites/infeniti/work/${w.img}.webp`,
  href: `${SITE}/work/${w.slug}`,
}));

export const testimonials = [
  {
    text: "An excellent experience from start to finish. The project was delivered ahead of schedule, with a smooth and well-managed execution. We are very satisfied with the outcome and look forward to building a long-term technology partnership.",
    name: "Ariz Razi",
    role: "Director Quality, Artistic Milliners",
    avatar: "/sites/infeniti/testimonials/ariz-razi.jpg",
  },
  {
    text: "I recently hired Infeniti to design a logo for my company, and I am thoroughly impressed with the results. The team at Infeniti understood my vision and translated it into a logo that perfectly represents my brand. Their professionalism, creativity, and attention to detail exceeded my expectations. I highly recommend Infeniti to anyone looking for top-notch design services.",
    name: "Meeran Rizwan",
    role: "Co-Founder, Dragon Fruit Farms",
    avatar: "/sites/infeniti/testimonials/meeran-rizwan.jpg",
  },
  {
    text: "The project was delivered to an exceptional standard, with clear and consistent communication throughout the entire process. Everything remained well organized from start to finish, resulting in a smooth engagement and an excellent final outcome. We look forward to working together again.",
    name: "Waqar Ali",
    role: "Founder, Zehenify",
    avatar: "/sites/infeniti/testimonials/waqar-ali.png",
  },
  {
    text: "The team went above and beyond throughout the engagement, delivering ahead of schedule and giving us valuable additional time. Their support continued well beyond delivery, making the overall experience exceptional.",
    name: "Muzzammil Akram",
    role: "Chief Operating Officer (CEO), SEO Masterz",
    avatar: "/sites/infeniti/testimonials/muzzammil-akram.jpg",
  },
  {
    text: "Our project with Infeniti ran over several months, and they remained consistent and reliable throughout. They met deadlines, welcomed feedback, understood our requirements well, and were always willing to offer their own perspective when needed. We especially appreciated their support with last-minute changes and would happily recommend them.",
    name: "Khadeeja",
    role: "Founder, Routify",
    avatar: "/sites/infeniti/testimonials/default.png",
  },
];

export const footerNav = [
  { title: "Home", href: "/" },
  { title: "Company", href: `${SITE}/about` },
  { title: "Our Work", href: `${SITE}/work` },
  { title: "Services", href: `${SITE}/service` },
  { title: "Careers", href: `${SITE}/career` },
  { title: "Contact", href: `${SITE}/contact` },
];

export const socials = [
  { name: "Facebook", href: "https://www.facebook.com/infenitiofficial/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/infeniti" },
  { name: "Instagram", href: "https://www.instagram.com/infeniti.io/" },
] as const;
