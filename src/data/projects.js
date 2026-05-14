import p1Img from "../assets/images/ProjetcsImages/P1.jpg";
import p2Img from "../assets/images/ProjetcsImages/P2.jpg";
import p3Img from "../assets/images/ProjetcsImages/P3.jpg";

export const projects = [
  {
    category: "Diagnostics",
    caseLabel: "Case File",
    title: "Espresso machine leak diagnosis",
    description:
      "A structured inspection of seals, fittings, and water path behavior to isolate the likely leak source before replacing parts.",
    image: p1Img,
    imageAlt: "Espresso machine leak inspection",
  },
  {
    category: "Calibration",
    caseLabel: "Bench Note",
    title: "Grinder burr alignment review",
    description:
      "A practical burr and zero-point check focused on consistency, repeatable adjustment, and clearer espresso troubleshooting.",
    image: p2Img,
    imageAlt: "Grinder burr alignment bench",
  },
  {
    category: "Troubleshooting",
    caseLabel: "System Check",
    title: "Pressure instability workflow",
    description:
      "A step-by-step pressure review across pump behavior, flow restriction, and grouphead response under normal operation.",
    image: p3Img,
    imageAlt: "Pressure stability workflow diagram",
  },
];
