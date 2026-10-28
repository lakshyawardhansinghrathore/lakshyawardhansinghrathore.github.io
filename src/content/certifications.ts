/**
 * CERTIFICATIONS — cards with issuer, date and verification link.
 * TODO: replace with your real certifications and credential URLs.
 */

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  verifyUrl: string;
  icon: string; // lucide icon name rendered by the section component
}

export const certifications: Certification[] = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Mar 2024",
    verifyUrl: "https://aws.amazon.com/verification", // TODO: replace with credential link
    icon: "cloud",
  },
  {
    name: "Google Cloud Digital Leader",
    issuer: "Google Cloud",
    date: "Nov 2024",
    verifyUrl: "https://cloud.google.com/certification", // TODO: replace
    icon: "cloud",
  },
  {
    name: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta · Coursera",
    date: "Jun 2023",
    verifyUrl: "https://coursera.org/verify", // TODO: replace
    icon: "code",
  },
  {
    name: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "Feb 2023",
    verifyUrl: "https://freecodecamp.org/certification", // TODO: replace
    icon: "code",
  },
];
