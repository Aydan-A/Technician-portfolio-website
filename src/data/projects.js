import p1Img from "../assets/images/projects/P1.jpg";
import p2Img from "../assets/images/projects/P2.jpg";
import p3Img from "../assets/images/projects/P3.jpg";

export const projects = [
  {
    id: "grinder-motor-stall",
    category: "Machine Diagnostics",
    caseLabel: "Case File 014",
    title: "Resolving motor stalls in variable-RPM grinders.",
    summary:
      "Diagnosing instantaneous friction spikes and stalling behavior in the DF64V without replacing hardware.",
    image: p1Img,
    imageAlt: "DF64V grinder burr chamber and declumper under bench inspection",
    challenge:
      "A customer reported their DF64V grinder was stalling and reversing direction during use, suspecting a faulty motor or defective burrs. The issue primarily occurred when grinding lighter roast profiles.",
    process: [
      "Analyzed user-provided video and identified that the motor was encountering sudden friction spikes caused by unevenly roasted, high-density beans (light or slightly green beans).",
      "Assessed the internal chute and declumper assembly, identifying that partial blockages in this area compound friction between the burrs and lead to stalls.",
      "Cross-referenced the behavior with known manufacturer diagnostics and community reports to confirm the motor behavior was a standard safety mechanism under heavy load, not a mechanical failure.",
    ],
    solution:
      "Instructed the user on a deep-cleaning protocol for the chute and declumper to remove compacted coffee. Implemented a \"hot start\" technique to maintain RPM momentum before introducing high-density, light-roast beans into the burr chamber.",
    result:
      "Restored consistent grinding performance. Successfully avoided an unnecessary international warranty return, saving the user from potential transit damage, round-trip shipping costs, and border customs delays.",
    meta: [
      { label: "Unit", value: "DF64V" },
      { label: "Duration", value: "1 day" },
      { label: "Outcome", value: "Resolved" },
    ],
  },
  {
    id: "gbw-load-cell",
    category: "Grinder Calibration",
    caseLabel: "Bench Note 022",
    title: "Calibrating load cell accuracy on Mahlkönig GbW grinders.",
    summary:
      "Troubleshooting weight offsets and environmental interference on high-precision Grind-by-Weight espresso grinders.",
    image: p2Img,
    imageAlt: "Mahlkönig Grind-by-Weight grinder load cell and portafilter cradle",
    challenge:
      "A user reported an unexpected weight offset when grinding with a Mahlkönig E65W/E80W. The precision load cell was registering variations, prompting concerns about scale accuracy and calibration failure.",
    process: [
      "Evaluated the grinder's physical environment, noting that the highly sensitive load cell (which signals the control board 6,000 times per second) can be heavily affected by unstable counters or ambient HVAC airflow.",
      "Verified that all portafilters in use had been correctly introduced and zeroed in the grinder's software recognition system.",
      "Differentiated between actual scale inaccuracy and natural ground coffee weight loss that occurs during standard puck preparation.",
    ],
    solution:
      "Established a controlled testing protocol involving multiple consecutive grinds to track weight consistency. Calculated the precise average offset value caused by the workflow rather than a hardware defect.",
    result:
      "Added the calculated average offset value into the grinder's software compensation settings. Re-established the manufacturer's expected +/- 0.1g accuracy without requiring a replacement load cell or onsite repair.",
    meta: [
      { label: "Unit", value: "Mahlkönig E65W/E80W" },
      { label: "Duration", value: "1 day" },
      { label: "Outcome", value: "Resolved" },
    ],
  },
  {
    id: "thermoblock-pid",
    category: "Machine Diagnostics",
    caseLabel: "System Check 031",
    title: "Calibrating thermoblock offsets to prevent thermal over-extraction.",
    summary:
      "Diagnosing extreme PID offset settings and improving thermal stability in a thermoblock espresso machine.",
    image: p3Img,
    imageAlt: "Ascaso Steel thermoblock machine PID display and grouphead",
    challenge:
      "A user reported temperature inconsistencies and bitter, over-extracted coffee on their Ascaso Steel machine, utilizing a 20°C temperature offset on the PID controller.",
    process: [
      "Analyzed the PID offset settings, determining that a 20°C offset forced the internal thermoblock to reach an excessive 115°C, causing the initial water contact to scorch the coffee puck.",
      "Evaluated the system's thermodynamics, noting that in thermoblock systems, water heats as it moves through the coil; if the coffee puck lacks proper density, the water flows too quickly to absorb the necessary heat.",
      "Factored in the natural heat loss that occurs as water travels from the internal sensor through the shower screen, portafilter, and open air before reaching the cup.",
    ],
    solution:
      "Reduced the PID offset to below 10°C to prevent scorching and protect the thermoblock from premature lifespan degradation. Instructed the user to refine their grind size and apply a consistent 15 kg tamp to create a natural flow restrictor, giving the water adequate time to absorb heat.",
    result:
      "Restored thermal stability and eliminated bitter extraction flavors. Educated the user on implementing a 10-minute idle warm-up with the portafilter locked in to prevent heat loss during the brewing cycle.",
    meta: [
      { label: "Unit", value: "Ascaso Steel Duo/Plus" },
      { label: "Duration", value: "1 day" },
      { label: "Outcome", value: "Resolved" },
    ],
  },
  {
    id: "opv-drainback",
    category: "Machine Diagnostics",
    caseLabel: "Case File 044",
    title: "Resolving delayed dispensing and elevated tank temperatures.",
    summary:
      "Correcting hydraulic routing and boiler temperature recovery on a Quickmill Pop-up single-boiler machine.",
    image: null,
    imageAlt: "",
    challenge:
      "A customer reported that their machine was returning hot water to the reservoir, experiencing significant delays before dispensing water from the grouphead, and struggling to drop back to a 93°C brew temperature after steaming milk.",
    process: [
      "Traced the hot water return issue to the OPV (Over Pressure Valve), diagnosing that it was left in a partially open position, allowing boiler water to constantly bleed back into the water tank.",
      "Identified that the delayed water dispensing was a direct result of the open OPV; the pump had to spend time refilling the partially emptied boiler and hydraulic lines before pressure could reach the grouphead.",
      "Reviewed the post-frothing cool-down routine, noting the boiler was holding excess steam and required a manual flush to draw in cold water.",
    ],
    solution:
      "Instructed the user to fully close the OPV valve (counter-clockwise) when idle to prevent boiler drain-back and establish immediate water delivery. Advised pressing the pump button immediately after frothing to purge excess steam and quickly lower the boiler temperature back to 93°C.",
    result:
      "Eliminated the dispensing lag and stabilized the reservoir temperature. Taught the user how to utilize the OPV correctly during extraction to lock in a consistent 9-bar pressure for back-to-back shots.",
    meta: [
      { label: "Unit", value: "Quickmill Pop-up" },
      { label: "Duration", value: "1 day" },
      { label: "Outcome", value: "Resolved" },
    ],
  },
  {
    id: "workflow-overhaul",
    category: "Workflow Improvement",
    caseLabel: "Bar Study 003",
    title: "Re-sequencing a busy café bar around the grinder.",
    summary:
      "A workflow review focused on motion economy, grinder access, and reducing the number of small recoveries baristas make per shift.",
    image: null,
    imageAlt: "",
    challenge:
      "A specialty café was hitting service ceilings around twenty minutes into peak. Baristas crossed paths repeatedly at the grinder and the milk station. Dose accuracy slipped as the queue grew.",
    process: [
      "Shadowed two full peak services and logged every step taken at the bar.",
      "Mapped motion paths and counted handoffs between roles.",
      "Drew three candidate layouts and walked them with the bar team.",
    ],
    solution:
      "Moved the grinder twenty centimeters and rotated the knock box. Introduced a two-person sequence with a fixed handoff point. Switched to a single-dose timer with a visible LED.",
    result:
      "Average ticket time at peak dropped from 4:10 to 3:05. Dose variance halved. Staff reported less fatigue at the end of long shifts.",
    meta: [
      { label: "Duration", value: "1 week" },
      { label: "Outcome", value: "Throughput +28%" },
    ],
  },
  {
    id: "grinder-teardown",
    category: "Product Teardown",
    caseLabel: "Teardown 012",
    title: "Inside a popular prosumer grinder — what holds up and what doesn't.",
    summary:
      "A full disassembly and technical read of a widely sold home grinder, with notes on parts that age well and parts that don't.",
    image: null,
    imageAlt: "",
    challenge:
      "Owners kept asking whether the grinder was worth servicing past the three-year mark or whether replacement made more sense. There was no clear technical answer in circulation.",
    process: [
      "Stripped three units of different ages down to the casting.",
      "Measured burr wear, bearing play, and motor draw against factory baseline.",
      "Cross-referenced parts availability and pricing through the official channel.",
    ],
    solution:
      "Documented the four parts that account for nearly all real-world failures and the two that are not worth servicing. Built a simple decision rule based on age, hours, and burr wear.",
    result:
      "A written guide owners and technicians can use to decide between service and replacement in under five minutes, with photographs of each failure mode.",
    meta: [
      { label: "Duration", value: "2 weeks" },
      { label: "Outcome", value: "Reference guide" },
    ],
  },
];
