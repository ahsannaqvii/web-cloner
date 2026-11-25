const A = "/sites/cuberto/about";

export const media = {
  hero: `${A}/screenshot-1.jpg`,
  office: `${A}/screenshot-2.jpg`,
  video: `${A}/screenshot-3.mp4`,
};

/** Two-column staggered photo pairs (SplitshowSection). `sm` = square crop, otherwise 1:1.248 portrait. */
export const splitshows = [
  [
    { src: `${A}/split-3.jpg`, src2x: `${A}/split-3@2x.jpg`, sm: true },
    { src: `${A}/split-2.jpg`, src2x: `${A}/split-2@2x.jpg`, sm: false },
  ],
  [
    { src: `${A}/split-5.jpg`, src2x: `${A}/split-5@2x.jpg`, sm: true },
    { src: `${A}/split-6.jpg`, src2x: `${A}/split-6@2x.jpg`, sm: true },
  ],
] as const;

export const counters = [
  { value: "40", unit: "+", title: "members" },
  { value: "300", unit: "+", title: "completed projects" },
  { value: "15", unit: " years", title: "of experience" },
];

export const partners = [
  { file: "raiffeisen", name: "Raiffeisen Bank" },
  { file: "mapbox", name: "Mapbox" },
  { file: "cisco", name: "Cisco" },
  { file: "spark", name: "Spark" },
  { file: "tradingview", name: "TradingView" },
  { file: "tinkoff", name: "Tinkoff Back" },
  { file: "yandex", name: "Yandex" },
  { file: "etihad", name: "Bank al Etihad" },
  { file: "euroauto", name: "EuroAuto", desktopOnly: true },
].map((p) => ({ ...p, src: `${A}/partners/${p.file}.svg` }));

export type Feedback = { name: string; company: string; text: string; review?: string };

export const feedback: Feedback[] = [
  {
    name: "Marketing team",
    company: "SCA",
    text: "As part of SCA’s digital transformation efforts, we partnered with Cuberto to completely reimagine our online presence. Their team took the time to understand the scale and complexity of our business, then translated that into a website that better reflects who we are today. From UX and visual design to development and project management, Cuberto demonstrated a high level of professionalism and attention to detail throughout the engagement.",
  },
  {
    name: "Kanad Bahalkar",
    company: "Potion",
    text: "Cuberto was engaged in developing our website and additional marketing materials, including theming and various creative assignments. Their efforts were highly satisfactory, and we were impressed with the Cuberto team's collaborative approach. Their team were amiable and accommodating to all of our requests, and also provided invaluable creative direction to the project.",
    review: "https://goo.gl/maps/GFZ4eynSCtzShuye7",
  },
  {
    name: "Duane Barlow",
    company: "Cisco Systems, Inc.",
    text: "On behalf of the Cisco - Tetration team, I would like to thank Cuberto for the very successful collaboration and design contribution to our product. Our teams worked in sync, and we did not experience any discomfort in communication.",
  },
  {
    name: "Polina Vorms",
    company: "Zelt Technology Ltd.",
    text: "We have worked with Cuberto on our new image Zelt website. The team performed great in terms of creating a unique design style and developing complex 3D animations.",
    review: "https://goo.gl/maps/vXw8q3wwSr1EbgoX8",
  },
  {
    name: "Andrey Gorsky",
    company: "Punto Pago",
    text: "It was pleasure to work with Cuberto, we developed App together that has 4.8 rating in store and more than 100 000 installs. My recommendations!",
    review: "https://goo.gl/maps/8GwhtiBsHrfTmiNA7",
  },
  {
    name: "Yuri Podnebesov",
    company: "Ferrumpipe, LLC",
    text: "It was a great pleasure working with Cuberto team. Previously we had only out-dated website created in mid 2000th, we were excited to create new one but had no idea how to do it, no thoughts regards the visuals and ways how to present our company and production.",
  },
  {
    name: "Plisov I.V.",
    company: "Euro Auto LLC",
    text: "We've been working with Cuberto for more than a year now. Our previous experience with outsource teams was not always positive. In the case of Cuberto, everything is perfect: adequate estimation and work on time, the desire to dive into the details, the desire to make a good product, a complete understanding of what they are doing and why they are doing that.",
  },
  {
    name: "Marcos Meson",
    company: "Visual Blasters LLC",
    text: "On behalf of the FlipaClip App team, I would like to thank Cuberto for the successful collaboration and development of FlipaClip.com. Cuberto proved to be a reliable and responsible partner that we were comfortable collaborating with.",
  },
  {
    name: "Emre Palandöken",
    company: "Magma",
    text: "Thanks to the Cuberto team for their professionalism and collaboration. We contacted Cuberto for a website creation and we are pleased of the work that has been done. Strongly recommended!",
    review: "https://goo.gl/maps/9nLhQc6WnPVarrYQ9",
  },
  {
    name: "Nicholas Tsoukas",
    company: "Kelvin Zero",
    text: "Thanks to Cuberto, we now boast a compelling brand identity and a user experience that truly resonates with our audience. The project presented numerous challenges, and our specific requirements were certainly demanding. We’re genuinely impressed with the creativity and rigor Cuberto brought to the table.",
  },
  {
    name: "Marketing department of DaoWay",
    company: "DaoWay",
    text: "We've had an amazing experience working with Cuberto designers. They brought class, skill and creativity to the project. Looking forward to work with the team again soon!",
    review: "https://maps.app.goo.gl/AXWL7J7S5sQjR2iv6",
  },
  {
    name: "Dmitri Nazarov",
    company: "Genesis Vision",
    text: "Genesis Vision Team would like to express our sincere gratitude to the Cuberto team for cooperation, excellent work and high-level professionalism. We ordered branding, web design and mobile app design. Cuberto designers are extraordinary productive specialists and are creative in solving all assigned tasks.",
  },
  {
    name: "Andrea Johnson",
    company: "Rally Reader",
    text: "We chose Cuberto to build our mobile app and website. They were fabulous, highly professional partners. Their work was wonderfully original, the account team was always responsive to feedback, and they delivered every aspect of the project on time and on budget. We look forward to working with them on the next phase of our product.",
  },
  {
    name: "Michael Harris",
    company: "Nurse CE Club",
    text: "We have worked with Cuberto for several projects now including both mobile and web UX/UI designs. Stephan and his team has been great to work with and we are really happy with the process and the end results/deliverables. We will continue to work with them on new projects!",
    review: "https://maps.app.goo.gl/YGvPCzuMAjLyWXg7A",
  },
];

export const benefits = [
  {
    icon: "polygon",
    motion: "spin",
    title: "Time zones ain’t no thing",
    text: "Wherever you are in the world, you’ll feel like we’re right around the corner. With 12 years of experience, our business processes are seamless and time differences don’t matter.",
  },
  {
    icon: "burst",
    motion: "spinReverse",
    title: "Impossible? We’re on it",
    text: "“Impossible” simply does not exist in our vocabulary. We develop products exactly as they were at the design stage, no simplifications, no shortcuts, no BS.",
  },
  {
    icon: "cross",
    motion: "stroke",
    title: "Flexible work terms",
    text: "Just like we stick to a fixed budget, we stay within a set Time and Materials framework. Whatever terms we agree to will depend on your project needs.",
  },
  {
    icon: "rings",
    motion: "spinReverse",
    title: "Full spectrum of services",
    text: "Any solution your business needs, we’re on it: creating logos, development, interface design prior to development, technical support, and marketing.",
  },
] as const;
