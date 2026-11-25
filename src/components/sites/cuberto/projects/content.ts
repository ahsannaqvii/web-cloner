import { ORIGIN } from "../content";

const A = "/sites/cuberto/projects/covers";

export type Category = "web" | "app" | "branding";

/** Filter tabs, in source order. */
export const filters: { id: "all" | Category; title: string }[] = [
  { id: "all", title: "All Projects" },
  { id: "web", title: "Websites" },
  { id: "app", title: "Applications" },
  { id: "branding", title: "Branding" },
];

/** cuberto.com/projects cards, in source order. Cover formats follow the files the site actually serves. */
export const projects = [
  {
    slug: "puntopago",
    name: "Punto Pago",
    caption:
      "Building a connected ecosystem where discovering, learning and buying wine feels effortless",
    categories: ["app", "branding"],
    img: "puntopago.jpg",
    img2x: "puntopago@2x.jpg",
  },
  {
    slug: "find",
    name: "FIND real estate",
    caption:
      "Building a complete real estate brand and digital platform from the ground up",
    categories: ["web"],
    img: "find.jpg",
    img2x: "find@2x.jpg",
  },
  {
    slug: "sca",
    name: "Sweeping Corp of America",
    caption: "Modernizing the digital presence of a nationwide industry leader",
    categories: ["web"],
    img: "sca.jpg",
    img2x: "sca@2x.jpg",
  },
  {
    slug: "daoway",
    name: "DaoWay",
    caption:
      "Turning an ambitious idea into a complete mobile product and brand from scratch",
    categories: ["app"],
    img: "daoway.png",
    img2x: "daoway@2x.jpg",
  },
  {
    slug: "zelt",
    name: "Zelt",
    caption:
      "Designing a product that brings payroll, HR and IT together in one seamless experience",
    categories: ["web", "branding"],
    img: "zelt.jpg",
    img2x: "zelt@2x.jpg",
  },
  {
    slug: "flipaclip",
    name: "FlipaClip",
    caption:
      "Bringing the creativity of millions of artists into an immersive web experience",
    categories: ["web"],
    img: "flipaclip.jpg",
    img2x: "flipaclip@2x.jpg",
  },
  {
    slug: "riyadh",
    name: "Riyadh",
    caption:
      "Creating a digital experience worthy of one of the world's fastest-growing capitals",
    categories: ["web", "app"],
    img: "riyadh.jpg",
    img2x: "riyadh@2x.jpg",
  },
  {
    slug: "qvino",
    name: "Qvino",
    caption:
      "Building a connected ecosystem where discovering, learning and buying wine feels effortless",
    categories: ["app"],
    img: "qvino.jpg",
    img2x: "qvino@2x.jpg",
  },
  {
    slug: "potion",
    name: "Potion",
    caption:
      "Reimagining a B2B product through branding, storytelling and motion",
    categories: ["web"],
    img: "potion.jpg",
    img2x: "potion@2x.jpg",
  },
  {
    slug: "cisco",
    name: "Cisco",
    caption:
      "Building a scalable design foundation for one of the world's technology leaders",
    categories: ["branding"],
    img: "cisco.jpg",
    img2x: "cisco@2x.jpg",
  },
  {
    slug: "kzero",
    name: "Kelvin Zero",
    caption: "A digital product for passwordless authentication",
    categories: ["web"],
    img: "kzero.jpg",
    img2x: "kzero@2x.jpg",
    objectPosition: "top center",
  },
  {
    slug: "magma",
    name: "Magma",
    caption: "The ultimate tool for building in the Web3 era",
    categories: ["web"],
    img: "magma.jpg",
    img2x: "magma@2x.jpg",
  },
  {
    slug: "ferrumpipe",
    name: "Ferrumpipe",
    caption: "Galvanized steel metal frame manufacturer",
    categories: ["web"],
    img: "ferrumpipe.jpg",
    img2x: "ferrumpipe@2x.jpg",
  },
  {
    slug: "nurseclub",
    name: "Nurse CE Club",
    caption: "Website revamp with 3D graphics",
    categories: ["web", "branding"],
    img: "nurseclub.png",
    img2x: "nurseclub@2x.png",
  },
  {
    slug: "ulesson",
    name: "uLesson",
    caption: "Online platform for distance learning",
    categories: ["web", "app"],
    img: "ulesson.png",
    img2x: "ulesson@2x.png",
  },
  {
    slug: "sleepiest",
    name: "Sleepiest",
    caption: "Sleep app helps millions fall asleep every night",
    categories: ["app"],
    img: "sleepiest.png",
    img2x: "sleepiest@2x.png",
  },
  {
    slug: "genesis",
    name: "Genesis Vision",
    caption: "Private trust management and trading platform",
    categories: ["app"],
    img: "genesis.png",
    img2x: "genesis@2x.png",
  },
  {
    slug: "wickret",
    name: "Wickret",
    caption: "A new way to think about money",
    categories: ["web"],
    img: "wickret.png",
    img2x: "wickret@2x.png",
  },
  {
    slug: "rallyreader",
    name: "Rally Reader",
    caption: "Private reading coach that hears you read",
    categories: ["web", "app"],
    img: "rallyreader.jpg",
    img2x: "rallyreader@2x.jpg",
  },
  {
    slug: "consumervoice",
    name: "ConsumerVoice",
    caption: "A service that helps find verified products",
    categories: ["branding"],
    img: "consumervoice.png",
    img2x: "consumervoice@2x.png",
  },
  {
    slug: "monmarche",
    name: "Mon Marché",
    caption: "Home delivery of fresh fruit and vegetables",
    categories: ["app"],
    img: "monmarche.png",
    img2x: "monmarche@2x.png",
  },
  {
    slug: "datalight",
    name: "DataLight",
    caption: "Instrument for detailed cryptocurrency market analysis",
    categories: ["branding"],
    img: "datalight.png",
    img2x: "datalight@2x.png",
  },
].map((p) => ({
  ...p,
  categories: p.categories as Category[],
  img: `${A}/${p.img}`,
  img2x: `${A}/${p.img2x}`,
  href: `${ORIGIN}/projects/${p.slug}/`,
}));
