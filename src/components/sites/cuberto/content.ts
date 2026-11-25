export const ORIGIN = "https://cuberto.com";

/** cuberto.com paths that have a local clone; every other link goes to the live site. */
export const ROUTES = { home: "/cuberto", about: "/cuberto/about", projects: "/cuberto/projects" } as const;
const A = "/sites/cuberto";

export const services = [
  { title: "Digital Product Design", href: `${ORIGIN}/services/product-design/` },
  { title: "Web Design & Development", href: `${ORIGIN}/services/web-design-development/` },
  { title: "UX Research & UI Design", href: `${ORIGIN}/services/ux-ui-design/` },
  { title: "Brand Identity", href: `${ORIGIN}/services/brand-identity/` },
  { title: "Creative Development", href: `${ORIGIN}/services/creative-development/` },
];

export const navLinks = [
  { title: "Projects", href: ROUTES.projects },
  { title: "About", href: ROUTES.about },
  { title: "Blog", href: `${ORIGIN}/blog/` },
];

export const features = [
  {
    title: "Digital Product Design",
    text: "We design digital products from early concepts to scalable systems. Combining product strategy, UX and interface design, we help startups and established companies turn complex ideas into clear, usable experiences.",
  },
  {
    title: "Web Design & Development",
    text: "We create marketing websites that explain products clearly, strengthen brands and support business growth. From structure and content to responsive design and development, every website is built around a specific goal.",
  },
  {
    title: "UX Research & UI Design",
    text: "We uncover how people use digital products and where their experience breaks down. Through research, user flows, wireframes and prototypes, we improve usability before moving into interface design.",
  },
  {
    title: "Brand Identity",
    text: "We create visual identities that give companies a distinct and consistent presence. From typography and color to digital guidelines and campaign assets, every element is designed to work as one system.",
  },
  {
    title: "Creative Development",
    text: "We bring ambitious digital concepts to life through motion, 3D and interactive development. Using technologies such as WebGL, GSAP and modern JS frameworks, we build experiences that standard templates cannot deliver.",
  },
].map((f, i) => ({ ...f, href: services[i].href, bg: `${A}/features/${i + 1}.webp` }));

export const logos = [
  "mapbox",
  "cisco",
  "spark",
  "tradingview",
  "sca",
  "puntopago",
  "flipaclip",
  "etihad",
  "raiffeisen",
  "ikea",
  "mcdonalds",
  "housing",
].map((name) => ({
  name,
  src: `${A}/logos/${name}.svg`,
  href: ["cisco", "sca", "puntopago", "flipaclip"].includes(name) ? `${ORIGIN}/projects/${name}/` : undefined,
}));

type Project = { slug: string; caption: string; sm?: boolean; ext?: string };

const project = ({ slug, caption, sm, ext = "jpg" }: Project) => ({
  slug,
  caption,
  sm: Boolean(sm),
  img: `${A}/projects/${slug}.${ext}`,
  video: `${A}/projects/${slug}.mp4`,
  href: `${ORIGIN}/projects/${slug}/`,
});

export const workColumns = [
  [
    { slug: "puntopago", caption: "Building a connected ecosystem where discovering, learning and buying wine feels effortless" },
    { slug: "sca", caption: "Modernizing the digital presence of a nationwide industry leader" },
    { slug: "flipaclip", caption: "Bringing the creativity of millions of artists into an immersive web experience", sm: true },
    { slug: "zelt", caption: "Designing a product that brings payroll, HR and IT together in one seamless experience" },
    { slug: "cisco", caption: "Building a scalable design foundation for one of the world's technology leaders", sm: true },
  ],
  [
    { slug: "find", caption: "Building a complete real estate brand and digital platform from the ground up" },
    { slug: "daoway", caption: "Turning an ambitious idea into a complete mobile product and brand from scratch", sm: true, ext: "png" },
    { slug: "riyadh", caption: "Creating a digital experience worthy of one of the world's fastest-growing capitals", sm: true },
    { slug: "qvino", caption: "Building a connected ecosystem where discovering, learning and buying wine feels effortless" },
    { slug: "potion", caption: "Reimagining a B2B product through branding, storytelling and motion", sm: true },
  ],
].map((col) => col.map(project));

export const testimonials = [
  {
    logo: "zelt",
    text: "Cuberto completed a rebranding of our company website zelt.app. The quality of the team's work exceeded my expectations, and since completion we have won a number of awards, including the Site of Day awwward.",
  },
  {
    logo: "loanpro",
    text: "We worked with the Cuberto team over a several month project on a complete website rehaul, that included new copy, design, and code. Several things stood out in our interaction with Cuberto.",
  },
  {
    logo: "potion",
    text: "Cuberto was engaged in developing our website and additional marketing materials, including theming and various creative assignments. Their efforts were highly satisfactory, and we were impressed with the Cuberto team's collaborative approach.",
  },
  {
    logo: "livespot",
    text: "I'd like to extend a heartfelt gratitude to the Cuberto team for their exceptional support throughout the website development process. Your responsiveness to our requests has been invaluable, and we're thrilled with the end result.",
  },
  {
    logo: "sca",
    text: "We had a great experience working with Cuberto on our website redesign project. Their team brought a strong mix of creativity, technical skill and strategic thinking to the project.",
  },
].map((t) => ({ ...t, logoSrc: `${A}/testimonials/${t.logo}.svg` }));

export const posts = [
  {
    category: "Website Redesign",
    title: "How to Structure a B2B Website",
    date: "11/23/2026",
    img: `${A}/blog/b2b-website.webp`,
    href: `${ORIGIN}/blog/how-to-structure-a-b2b-website/`,
  },
  {
    category: "Website Redesign",
    title: "How Product Design Evolves with Your Business",
    date: "10/29/2026",
    img: `${A}/blog/product-design.webp`,
    href: `${ORIGIN}/blog/how-product-design-evolves-with-your-business/`,
  },
  {
    category: "AI",
    title: "AI Website Builders vs Custom Development: What Should You Choose?",
    date: "10/15/2026",
    img: `${A}/blog/ai-builders.webp`,
    href: `${ORIGIN}/blog/ai-website-builders-vs-custom-development/`,
  },
];

export const faqs: { q: string; a: string[] }[] = [
  {
    q: "What does the typical website redesign or revamp process look like?",
    a: [
      "Every project starts with understanding your business, users and goals. Before designing anything, we analyze your current website, identify pain points and define opportunities for improvement.",
      "Our typical process includes Discovery, UX research, information architecture, wireframing, UI design, prototyping, development, QA and launch. Throughout the project, you'll have full visibility into progress, regular design reviews and direct communication with our team.",
      "Whether it's a landing page or a large enterprise platform, our goal is always the same: create a website that looks exceptional, performs flawlessly and helps your business grow.",
    ],
  },
  {
    q: "What services does Cuberto provide?",
    a: [
      "We offer end-to-end digital design and development services, allowing our clients to work with a single experienced team from strategy to launch.",
      "Depending on your needs, we can help with brand identity, UX research, product strategy, user experience design, interface design, motion design, frontend and backend development, CMS implementation, performance optimization and ongoing support.",
      "Some clients come to us for a single landing page, while others trust us to build complete digital products from the ground up. We adapt our process to every project while maintaining the same level of quality throughout.",
    ],
  },
  {
    q: "Do you build websites using Webflow or custom code?",
    a: [
      "Both. We choose the technology based on your business goals rather than forcing every project into the same stack.",
      "For marketing websites that require easy content management and fast delivery, Webflow can be a great solution. For more complex products, custom interactions, advanced animations, CMS integrations or scalable platforms, we usually build custom websites using modern technologies like Astro, Next.js, React, GSAP and headless CMS solutions such as Strapi.",
    ],
  },
  {
    q: "Can you help launch an MVP quickly?",
    a: [
      "Absolutely. We've helped startups launch MVPs within just a few months by focusing on what matters most: validating the product idea instead of building every possible feature.",
      "Our team works closely with founders to define the minimum feature set, prioritize user flows and create a polished product that is ready for investors, early adopters or market testing.",
      "As your business grows, the MVP can naturally evolve into a fully featured product without starting over.",
    ],
  },
  {
    q: "Which CMS do you recommend?",
    a: [
      "There isn't a single CMS that's right for every project. The best choice depends on your content structure, editorial workflow, scalability requirements and technical needs.",
      "For simple marketing websites, platforms like Webflow or WordPress can work well. For more complex websites and digital products, we often recommend headless CMS solutions like Strapi, which provide greater flexibility, performance and long-term scalability.",
      "We'll help you choose the solution that best fits your project rather than recommending a platform simply because it's popular.",
    ],
  },
  {
    q: "Do you work on fixed-price projects or Time & Materials?",
    a: [
      "Both pricing models are available. For projects with a clearly defined scope, timeline and deliverables, a fixed-price model provides predictable budgeting and milestones.",
      "For evolving products, startups or long-term partnerships, Time & Materials offers greater flexibility, allowing priorities to change as the project grows.",
    ],
  },
  {
    q: "Do you offer SEO services?",
    a: [
      "Yes. We build every website following technical SEO best practices, including semantic HTML, clean code, optimized performance, structured metadata, accessibility, Core Web Vitals and search engine indexing.",
      "If you need a broader SEO strategy, we can also help with technical audits, content recommendations, site architecture, keyword research and ongoing optimization together with trusted SEO specialists.",
    ],
  },
  {
    q: "My website has poor PageSpeed scores. Can you help improve them?",
    a: [
      "Absolutely. Low PageSpeed scores are usually caused by a combination of factors rather than a single issue. We begin with a technical audit to identify bottlenecks such as unoptimized images, excessive JavaScript, render-blocking resources, inefficient third-party scripts, poor caching or server configuration.",
      "Based on our findings, we optimize both the frontend and backend, improve loading strategies, implement modern image formats, reduce unnecessary code, fine-tune Core Web Vitals and configure CDN and caching where appropriate.",
      "In many cases, these improvements lead not only to better PageSpeed scores but also to faster user experiences, higher conversion rates and improved SEO performance.",
    ],
  },
];

export const footerNav = [
  { title: "Services", href: `${ORIGIN}/services/` },
  { title: "Blog", href: `${ORIGIN}/blog/` },
  { title: "Projects", href: ROUTES.projects },
  { title: "Workflow", href: "https://hello.cuberto.com/" },
  { title: "About", href: ROUTES.about },
  { title: "Contacts", href: `${ORIGIN}/contacts/` },
];

export const socials = [
  { name: "Dribbble", href: "https://dribbble.com/cuberto" },
  { name: "GitHub", href: "https://github.com/Cuberto" },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCzestFrXpwSGCfcbO2pObwQ" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/cuberto" },
] as const;
