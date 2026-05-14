import p1Img from "../assets/images/ProjetcsImages/P1.jpg";
import p2Img from "../assets/images/ProjetcsImages/P2.jpg";
import p3Img from "../assets/images/ProjetcsImages/P3.jpg";

export const projects = [
  {
    id: "leak-diagnostics",
    category: "Machine Diagnostics",
    caseLabel: "Case File 014",
    title: "Tracing a slow-developing espresso machine leak.",
    summary:
      "A structured inspection of seals, fittings, and water-path behavior to isolate the true source before any part was replaced.",
    image: p1Img,
    imageAlt: "Espresso machine leak inspection under bench lighting",
    challenge:
      "A two-group machine arrived with intermittent puddling under the drip tray. Previous technicians had replaced two gaskets without success. The leak only appeared after roughly forty minutes of operation and never under cold pressure tests.",
    process: [
      "Cold pressure hold for thirty minutes — no drop, ruling out the boiler shell.",
      "Thermal-cycled the machine and tracked water path with dye traces.",
      "Reviewed expansion behavior at the heat-exchanger inlet under load.",
    ],
    solution:
      "Replaced the heat-exchanger union fitting whose taper had deformed slightly with thermal cycling. Verified torque against manufacturer spec and re-seated the OPV at the same time.",
    result:
      "Eight hours of continuous service test, zero leak. Machine has been back on the bar for four months with no follow-up call.",
    meta: [
      { label: "Discipline", value: "Diagnostics" },
      { label: "Duration", value: "2 days" },
      { label: "Outcome", value: "Resolved" },
    ],
  },
  {
    id: "burr-alignment",
    category: "Grinder Calibration",
    caseLabel: "Bench Note 022",
    title: "Burr alignment review on a high-volume conical grinder.",
    summary:
      "A practical alignment and zero-point check focused on consistency, repeatable adjustment, and clearer espresso troubleshooting at the bar.",
    image: p2Img,
    imageAlt: "Grinder burrs and alignment shims on the bench",
    challenge:
      "A café reported that two baristas dialing the same grinder were arriving at noticeably different recipes day to day. Sweetness dropped after roughly an hour of service and the dose weight crept up.",
    process: [
      "Indicator-checked burr carrier runout against the shaft.",
      "Marker test across the burr face to read contact distribution.",
      "Logged motor draw and burr temperature across a service rush.",
    ],
    solution:
      "Re-shimmed the lower carrier by 0.05 mm, replaced a worn thrust washer, and rebuilt the zero point with a documented marker trace as the new reference.",
    result:
      "Recipe drift across the day fell inside a 0.3 g band. Two baristas now dial within two clicks of each other on the same beans.",
    meta: [
      { label: "Discipline", value: "Calibration" },
      { label: "Duration", value: "Half day" },
      { label: "Outcome", value: "Stabilized" },
    ],
  },
  {
    id: "pressure-stability",
    category: "Troubleshooting",
    caseLabel: "System Check 031",
    title: "Pressure instability across a rotary-pump espresso system.",
    summary:
      "A step-by-step pressure review across pump behavior, flow restriction, and grouphead response under normal operation.",
    image: p3Img,
    imageAlt: "Pressure gauge trace and grouphead under live diagnostics",
    challenge:
      "Brew pressure on the lead group oscillated between 8.4 and 9.6 bar during a single shot. The owner had already replaced the gicleur and the expansion valve.",
    process: [
      "Installed an inline pressure transducer and logged shots against time.",
      "Isolated the rotary pump on a test rig — output was clean.",
      "Mapped flow restriction from inlet through the grouphead.",
    ],
    solution:
      "Found a partially blocked mesh screen at the brew solenoid inlet. Cleaned the screen, descaled the solenoid body, and replaced the OPV spring with a fresh part within spec.",
    result:
      "Pressure trace flattened to ±0.1 bar across the shot window. Café reported visibly more consistent extractions the next morning.",
    meta: [
      { label: "Discipline", value: "Troubleshooting" },
      { label: "Duration", value: "1 day" },
      { label: "Outcome", value: "Resolved" },
    ],
  },
  {
    id: "preinfusion-mod",
    category: "Technical Modification",
    caseLabel: "Mod Log 008",
    title: "Adding a mechanical pre-infusion line to a single-boiler machine.",
    summary:
      "A reversible modification to introduce a soft, line-pressure pre-infusion phase without altering the boiler or original wiring.",
    image: null,
    imageAlt: "",
    challenge:
      "A home owner wanted the pre-infusion feel of a lever machine on their existing single-boiler setup, but without voiding warranty on the boiler itself or running new electronics.",
    process: [
      "Mapped the existing brew circuit and identified a tap point downstream of the inlet solenoid.",
      "Designed a parallel line with a needle valve and check valve, sized against measured flow rates.",
      "Documented a full reverse-out procedure so the original plumbing can be restored in under an hour.",
    ],
    solution:
      "Installed a tunable bypass with a recessed needle valve under the drip tray. The valve gives a one-to-six-second soft phase at line pressure before the pump engages.",
    result:
      "Channeling on light roasts dropped noticeably. The owner can return the machine to factory plumbing for service without leaving traces of the modification.",
    meta: [
      { label: "Discipline", value: "Modification" },
      { label: "Duration", value: "1 day" },
      { label: "Outcome", value: "Reversible build" },
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
      { label: "Discipline", value: "Workflow" },
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
      { label: "Discipline", value: "Teardown" },
      { label: "Duration", value: "2 weeks" },
      { label: "Outcome", value: "Reference guide" },
    ],
  },
];
