import {
  mobile,
  backend,
  web,
  javascript,
  typescript,
  reactjs,
  pokemon,
  nodejs,
  python,
  opencv,
  mongodb,
  processing,
  generative_music,
  pytorch,
  git,
  tensorflow,
  docker,
  whitelion,
  deepblue,
  alpr,
  tripguide,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Data Scientist",
    icon: web,
  },
  {
    title: "Full Stack Web Developer",
    icon: mobile,
  },
  {
    title: "Mobile Developer",
    icon: backend,
  },

];

const technologies = [
  {
    name: "PyTorch",
    icon: pytorch,
  },
  {
    name: "Tensorflow",
    icon: tensorflow,
  },
  {
    name: "OpenCV",
    icon: opencv,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },

  {
    name: "Processing",
    icon: processing,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },

  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Web Developer",
    company_name: "The White Lion",
    icon: whitelion,
    iconBg: "#383E56",
    date: "July 2020 - July 2021",
    points: [
      "Developed the website of the White Lion",
      "SEO & Web Crawling for Marketing Campaigns with Python, Selenium, and BeautifulSoup",
    ],
  },
  {
    title: "Web & Mobile Developer, Data Scientist",
    company_name: "Deep Blue",
    icon: deepblue,
    iconBg: "#E6DEDD",
    date: "Sep 2022 - Present",
    points: [
      "Developing and maintaining web and mobile applications using Next.js, Python, MongoDB, Docker, and other technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
];


const projects = [
  {
    name: "Licence Plate Detection in the Wild",
    description:
      "Updated the optimized the solution of Sergio Montazzolli Silva and Claudio Rosito Jung, License Plate Detection and Recognition in Unconstrained Scenarios, In Proceedings of the European Conference on Computer Vision (ECCV), pp. 580-596. 2018",
    tags: [
      {
        name: "darknet",
        color: "blue-text-gradient",
      },
      {
        name: "yolo",
        color: "green-text-gradient",
      },
      {
        name: "image-detection",
        color: "pink-text-gradient",
      },
    ],
    image: alpr,
    source_code_link: "https://github.com/benokan/alpr-unconstrained-py3-updated-and-optimized",
  },
  {
    name: "Kaggle Pokemon Classification",
    description:
      "Kaggle Pokemon Classification Project with imbalanced dataset and 149 classes, Kaggle High Score 0.8147 Validation Accuracy",
    tags: [
      {
        name: "image-classification",
        color: "pink-text-gradient",
      },
      {
        name: "tensorflow",
        color: "green-text-gradient",
      },
    ],
    image: pokemon,
    source_code_link: "https://github.com/benokan/PokemonClassification",
  },
  {
    name: "GAN Music Generator",
    description:
      "Music Generator using Generative Adversarial Network with temporal CNN embeddings generated from piano rolls",
    tags: [
      {
        name: "generative-models",
        color: "pink-text-gradient",
      },
      {
        name: "tensorflow",
        color: "green-text-gradient",
      },
    ],
    image: generative_music,
    source_code_link: "https://github.com/benokan/music-generation-with-gans",
  },
];

export { services, technologies, experiences, projects };
