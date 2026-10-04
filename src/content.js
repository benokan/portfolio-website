export const profile = {
  name: "Benokan Kafkas",
  tagline: "Founding engineer and team lead at Credizen, building Zenso.",
  location: "Based in Rome, Italy",
  locationSound: "/attenzione-pickpocket.mp3",
};

export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
];

export const about =
  "I'm a software engineer with a background in AI. I studied Software Engineering at Izmir University of Economics and earned an MSc in Artificial Intelligence and Robotics at Sapienza University of Rome. These days I mostly work across the full stack, from product to backend and infrastructure, and I enjoy taking a product from an empty repository to something people rely on.";

export const experience = [
  {
    role: "Founding Engineer, now Team Lead",
    company: "Credizen SRL",
    period: "Nov 2024 - Present",
    summary:
      "Joined as the first engineer on Zenso, a loan-matching platform for the Italian market. Now leading the engineering team as the product grows.",
  },
  {
    role: "Fullstack Developer & Data Scientist",
    company: "Deep Blue",
    period: "Sep 2022 - Nov 2024",
    summary:
      "Built web and mobile applications and contributed to EU-funded data science and machine learning projects.",
  },
  {
    role: "Data Scientist & Web Developer",
    company: "The White Lion",
    period: "Jul 2020 - Sep 2022",
    summary:
      "Built the company website, a forecasting model for market trends and a real-time KPI dashboard, plus web crawling for marketing campaigns.",
  },
];

export const projects = [
  {
    name: "Zenso",
    kind: "Product",
    url: "https://zensoapp.com",
    description:
      "An independent loan-matching platform for the Italian market. It compares offers from partner banks and finds a suitable personal loan in minutes.",
  },
  {
    name: "License plate detection in the wild",
    kind: "Open source",
    url: "https://github.com/benokan/alpr-unconstrained-py3-updated-and-optimized",
    description:
      "A Python 3 port and optimization of the ECCV 2018 work by Silva and Jung on license plate detection and recognition in unconstrained scenes.",
  },
  {
    name: "GAN music generation",
    kind: "Research",
    url: "https://github.com/benokan/music-generation-with-gans",
    description:
      "A generative adversarial network that composes piano music, using temporal CNN embeddings learned from piano rolls.",
  },
];

export const links = [
  { label: "LinkedIn", url: "https://www.linkedin.com/in/benokan/" },
  { label: "GitHub", url: "https://github.com/benokan" },
];
