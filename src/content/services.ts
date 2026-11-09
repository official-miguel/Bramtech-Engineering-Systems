export type Service = {
  slug: string;
  title: string;
  icon: "sun" | "bolt" | "camera" | "fence" | "speaker" | "gear";
  short: string;
  image: string;
  imageAlt: string;
  position?: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  includes: string[];
  gallery: string[]; // project ids
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "solar",
    title: "Solar and water heating",
    icon: "sun",
    short: "Solar panels, hybrid and battery systems, and solar water heaters.",
    image: "/images/solar/roof-array-technician.jpg",
    imageAlt: "Technician working on a rooftop solar panel array",
    position: "50% 40%",
    metaTitle: "Solar installation in Kenya",
    metaDescription:
      "Solar panel, hybrid inverter, battery and solar water heater installation in Kenya by our own installation team. Free site survey and written quote.",
    intro: [
      "We design and install solar systems for homes, shops, schools and businesses. That includes solar panels, hybrid inverters, battery storage and solar water heaters.",
      "We start with a free site survey. We look at your roof, your power use and your budget. Then we send a written quote that lists every part of the system.",
      "Our own team does the installation. We mount the panels, run the cabling, fit the inverter and batteries, and test the system before handover.",
      "After handover we explain how the system works and what to check. If something is not right, call us.",
    ],
    includes: [
      "Solar panels on roofs and frames",
      "Hybrid and grid-tied inverters",
      "Battery storage",
      "Solar water heaters",
      "Earthing, protection and labelling",
      "Testing and handover",
    ],
    gallery: ["solar-roof-array", "solar-rooftop-panels", "solar-water-heater", "solar-hybrid-inverter", "solar-battery-inverter"],
    faqs: [
      { q: "Do you offer a free site survey?", a: "Yes. We visit, measure, check your power use and give you a written quote." },
      { q: "Can solar work with my current power supply?", a: "Yes. A hybrid system can work with the grid, batteries and panels together. We confirm the design on the survey." },
      { q: "How long does an installation take?", a: "It depends on the size of the system. We give you a schedule in the written quote." },
      { q: "Do you install solar water heaters?", a: "Yes. We fit solar water heaters on roofs, including the pipework to your existing system." },
    ],
  },
  {
    slug: "electrical",
    title: "Electrical and power",
    icon: "bolt",
    short: "Wiring, distribution boards, meter boxes and power upgrades.",
    image: "/images/electrical/distribution-board-team.jpg",
    imageAlt: "Bramtech team fitting a distribution board",
    position: "50% 30%",
    metaTitle: "Electrical and power installation",
    metaDescription:
      "Electrical wiring, distribution boards, meter boxes and power installation for homes and businesses in Kenya. Free site survey.",
    intro: [
      "We install and upgrade electrical systems for homes, offices, shops and sites. We do wiring, distribution boards, meter boxes, cabling and backup power connections.",
      "Good electrical work is neat, labelled and safe. Our team fits proper enclosures, runs cable in trunking and conduit, and tests every circuit.",
      "We can work on a new build or fix an existing system. Tell us what you have and what you need.",
      "Every job starts with a site visit and a written quote.",
    ],
    includes: [
      "Wiring for new buildings and extensions",
      "Distribution boards and enclosures",
      "Meter boxes and outdoor connections",
      "Cable routing and trunking",
      "Power upgrades and backup connections",
      "Testing and labelling",
    ],
    gallery: ["electrical-ladders", "electrical-metal-enclosure", "electrical-meter-box", "electrical-db-team"],
    faqs: [
      { q: "Do you work on both homes and businesses?", a: "Yes. We install for homes, offices, shops, schools and industrial sites." },
      { q: "Can you fix an old electrical system?", a: "Yes. We inspect it, tell you what needs to change and quote the work." },
      { q: "Do you label the distribution board?", a: "Yes. We label circuits so the system is easy to use and service." },
      { q: "Will I get a written quote?", a: "Yes. Every job has a written quote before work starts." },
    ],
  },
  {
    slug: "cctv",
    title: "CCTV and alarms",
    icon: "camera",
    short: "CCTV cameras and security alarms for homes and businesses.",
    image: "/images/cctv-fence/cctv-camera-on-pole.jpg",
    imageAlt: "CCTV camera mounted on a pole",
    position: "50% 35%",
    metaTitle: "CCTV installation and security alarms",
    metaDescription:
      "CCTV camera and security alarm installation for homes, shops and businesses in Kenya. Free site survey and written quote.",
    intro: [
      "We install CCTV cameras and security alarms for homes, shops, schools and offices. The aim is simple: see what happens on your property and be alerted when something is wrong.",
      "On the survey we walk your site and mark the best camera positions. We cover entrances, parking, perimeters and blind spots.",
      "We run the cabling, mount the cameras, set up the recorder and show you how to view footage on your phone.",
      "We can add an alarm system and link it with your electric fence for one security setup.",
    ],
    includes: [
      "CCTV cameras, indoor and outdoor",
      "Recorders and storage",
      "Phone viewing setup",
      "Security alarms and sensors",
      "Cabling and mounting",
      "Testing and a short handover lesson",
    ],
    gallery: ["cctv-camera-pole", "fence-pole-technician"],
    faqs: [
      { q: "Can I watch the cameras on my phone?", a: "Yes. We set up remote viewing and show you how to use it." },
      { q: "How many cameras do I need?", a: "It depends on your property. We decide on the free site survey." },
      { q: "Can you add cameras to an existing system?", a: "Often yes. We check what you have and tell you what is possible." },
      { q: "Do you install alarms too?", a: "Yes. We install alarms alone or together with CCTV and electric fence." },
    ],
  },
  {
    slug: "electric-fence",
    title: "Electric fence",
    icon: "fence",
    short: "Perimeter electric fence for walls, gates and compounds.",
    image: "/images/cctv-fence/electric-fence-wall.jpg",
    imageAlt: "Electric fence wires on top of a perimeter wall",
    position: "50% 40%",
    metaTitle: "Electric fence installation",
    metaDescription:
      "Electric fence installation for walls, gates and compounds in Kenya. Own installation team, free site survey and written quote.",
    intro: [
      "An electric fence protects your perimeter and warns anyone who tries to climb in. We install electric fences on walls, gates and open compounds.",
      "We measure the perimeter, plan the corners and gates, and choose the energizer and wire layout. Then we give you a written quote.",
      "Our team fits the posts, wires, insulators, earthing and warning signs. We test the full line before handover.",
      "We can connect the fence to an alarm and pair it with CCTV.",
    ],
    includes: [
      "Wall-top and free-standing fences",
      "Energizers and earthing",
      "Gate and corner details",
      "Warning signs",
      "Alarm connection",
      "Testing and handover",
    ],
    gallery: ["fence-wall", "fence-pole-technician"],
    faqs: [
      { q: "Can you fit a fence on an existing wall?", a: "Yes. Wall-top fences are a common job for us." },
      { q: "Will the fence connect to an alarm?", a: "Yes. We can link it to a siren or alarm panel." },
      { q: "What about power cuts?", a: "We can add a battery backup so the fence keeps working." },
      { q: "Do you put up warning signs?", a: "Yes. Signs are part of every installation." },
    ],
  },
  {
    slug: "sound-installation",
    title: "Sound systems",
    icon: "speaker",
    short: "Permanent sound for churches, halls, restaurants, bars and offices.",
    image: "/images/racks/custom-amplifier-units.jpg",
    imageAlt: "Custom amplifier units built into a rack",
    position: "50% 50%",
    metaTitle: "Sound system installation for churches and venues",
    metaDescription:
      "Permanent sound system installation for churches, halls, restaurants, bars, conference rooms and offices in Kenya.",
    intro: [
      "We install permanent sound systems for churches, halls, restaurants, bars, conference rooms and offices. Clear speech and balanced music, in every seat.",
      "We look at the room, the number of people and how you use the space. Then we choose speakers, amplifiers, mixers and microphones to suit.",
      "We hang or mount the speakers, build the amplifier rack, run the cabling and tune the system in the room.",
      "Need sound for one event only? See our sound hire service.",
    ],
    includes: [
      "Speakers, ceiling and wall mounted",
      "Amplifier and mixer racks",
      "Microphones and wireless sets",
      "Cabling and neat rack builds",
      "Tuning in the room",
      "Training for your operators",
    ],
    gallery: ["racks-custom-amps", "racks-power-amp", "racks-internals", "sound-mixer-amp-rack", "sound-processor-rack"],
    faqs: [
      { q: "Do you install sound in churches?", a: "Yes. Churches, halls, bars, restaurants and offices." },
      { q: "Can you fix an existing sound system?", a: "Yes. We test it, find the fault and repair or replace parts." },
      { q: "Do you build amplifier racks?", a: "Yes. We build neat, labelled racks with the amplifiers and processors you need." },
      { q: "I only need sound for one event.", a: "Then hire is the better option. See our sound hire page." },
    ],
  },
  {
    slug: "machinery",
    title: "Machinery installation",
    icon: "gear",
    short: "Wiring, control panels and commissioning for industrial machines.",
    image: "/images/machinery/mixing-machine-with-control-panel.jpg",
    imageAlt: "Mixing machine with its control panel",
    position: "50% 50%",
    metaTitle: "Industrial machinery installation and commissioning",
    metaDescription:
      "Installation, wiring and commissioning of industrial machines with control panels, motors and gearboxes in Kenya.",
    intro: [
      "We install industrial machines and bring them into service. That covers positioning, motors, gearboxes, control panel wiring and commissioning.",
      "We work from the machine drawings and your site layout. Our team connects power, wires the control panel and tests each function.",
      "Commissioning means we run the machine under real conditions, check the controls and safety stops, and hand it over working.",
      "Send us the machine details and your site location for a quote.",
    ],
    includes: [
      "Machine positioning and fixing",
      "Motors and gearboxes",
      "Control panel wiring",
      "Power connection",
      "Testing and commissioning",
      "Handover to your operators",
    ],
    gallery: ["machinery-mixer", "machinery-testing-panel"],
    faqs: [
      { q: "What machines do you install?", a: "We install machines with control panels, motors and gearboxes. Tell us what you have." },
      { q: "Do you wire the control panel?", a: "Yes. We wire and test the panel as part of the installation." },
      { q: "What is commissioning?", a: "It is the final testing and setup that gets the machine running properly." },
      { q: "Can you work at my site?", a: "Yes. We travel to your site. Tell us the location." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
