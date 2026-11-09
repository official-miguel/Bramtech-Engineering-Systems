import meta from "./image-meta.json";

export type Category = "Solar" | "Electrical" | "CCTV" | "Fence" | "Sound" | "Machinery";
export const categories: ("All" | Category)[] = ["All", "Solar", "Electrical", "CCTV", "Fence", "Sound", "Machinery"];

export type Img = { src: string; alt: string; position: string; width: number; height: number; blur: string };

export type Project = Img & {
  id: string;
  title: string;
  category: Category;
  hire?: boolean;
  orientation: "portrait" | "landscape";
  location: string;
  year: string;
};

const m = meta as Record<string, { blur: string; w: number; h: number }>;

export function imgOf(src: string, alt: string, position = "50% 50%"): Img {
  const i = m[src];
  return { src, alt, position, width: i.w, height: i.h, blur: i.blur };
}

type Raw = {
  id: string;
  title: string;
  category: Category;
  hire?: boolean;
  image: string;
  alt: string;
  position: string;
};

const raw: Raw[] = [
  { id: "solar-team-inverter", title: "Inverter installation", category: "Solar", image: "/images/solar/team-installing-inverter.jpg", alt: "Three Bramtech installers in orange vests fitting a hybrid inverter and battery on a wall", position: "50% 30%" },
  { id: "solar-roof-array", title: "Rooftop array installation", category: "Solar", image: "/images/solar/roof-array-technician.jpg", alt: "Technician installing solar panels on a roof", position: "50% 40%" },
  { id: "solar-rooftop-panels", title: "Rooftop solar panels", category: "Solar", image: "/images/solar/rooftop-solar-panels.jpg", alt: "Rows of solar panels mounted on a roof", position: "50% 50%" },
  { id: "solar-water-heater", title: "Solar water heater", category: "Solar", image: "/images/solar/solar-water-heater-roof.jpg", alt: "Solar water heater installed on a roof", position: "50% 50%" },
  { id: "solar-water-heater-tech", title: "Water heater on the roof", category: "Solar", image: "/images/solar/water-heater-rooftop-technician.jpg", alt: "Technician fitting a solar water heater on a rooftop", position: "50% 35%" },
  { id: "solar-hybrid-inverter", title: "Hybrid inverter", category: "Solar", image: "/images/solar/hybrid-inverter-wall.jpg", alt: "Wall-mounted hybrid inverter with cabling", position: "50% 40%" },
  { id: "solar-battery-inverter", title: "Battery and inverter", category: "Solar", image: "/images/solar/battery-inverter-installation.jpg", alt: "Battery and inverter installation with wiring", position: "50% 40%" },
  { id: "solar-array-field", title: "Roof-mounted solar array", category: "Solar", image: "/images/solar/solar-array-open-field.jpg", alt: "Rows of solar panels on a flat roof with open land and houses behind", position: "50% 60%" },
  { id: "solar-heater-frame", title: "Water heater frame assembly", category: "Solar", image: "/images/solar/water-heater-frame-assembly.jpg", alt: "Two technicians assembling a stainless steel solar water heater frame on a flat roof", position: "50% 35%" },
  { id: "solar-felicity-board", title: "Inverter, changeover and protection", category: "Solar", image: "/images/solar/felicity-inverter-avr-board.jpg", alt: "Wall-mounted hybrid inverter, voltage protector, changeover switch and distribution board on trunking", position: "50% 50%" },
  { id: "solar-prostar-rack", title: "Inverter and battery rack", category: "Solar", image: "/images/solar/prostar-inverter-battery-rack.jpg", alt: "Technician fitting a battery rack below a wall-mounted green hybrid inverter", position: "50% 40%" },
  { id: "solar-srne-cage", title: "Lithium batteries in a steel cage", category: "Solar", image: "/images/solar/srne-inverter-battery-cage.jpg", alt: "Wall-mounted inverter with two lithium batteries inside a steel safety cage", position: "50% 40%" },
  { id: "solar-srne-cage-close", title: "Battery cage and inverter", category: "Solar", image: "/images/solar/srne-battery-cage-closeup.jpg", alt: "Inverter, breaker and two lithium batteries inside a locking steel cage", position: "50% 35%" },
  { id: "solar-commissioning", title: "Commissioning the inverter", category: "Solar", image: "/images/solar/technician-commissioning-srne.jpg", alt: "Bramtech technician in branded overalls setting up an inverter beside a battery cage", position: "50% 30%" },
  { id: "solar-srne-cabinet", title: "Battery and inverter cabinet", category: "Solar", image: "/images/solar/srne-felicity-cabinet.jpg", alt: "Lithium battery, hybrid inverter, distribution board and pump drive mounted inside a steel cabinet", position: "50% 50%" },
  { id: "solar-wall-battery", title: "Wall battery and inverter", category: "Solar", image: "/images/solar/felicity-wall-battery-inverter.jpg", alt: "Changeover switch, distribution board, inverter and wall-mounted battery on a clean wall", position: "50% 40%" },
  { id: "electrical-ladders", title: "Cabling on ladders", category: "Electrical", image: "/images/electrical/team-on-ladders-cabling.jpg", alt: "Bramtech team on ladders running cables", position: "50% 25%" },
  { id: "electrical-metal-enclosure", title: "Metal enclosure fabrication", category: "Electrical", image: "/images/electrical/cutting-metal-enclosure.jpg", alt: "Worker cutting a metal enclosure for electrical equipment", position: "50% 35%" },
  { id: "electrical-meter-box", title: "Outdoor meter box wiring", category: "Electrical", image: "/images/electrical/outdoor-meter-box-wiring.jpg", alt: "Outdoor meter box with wiring being connected", position: "50% 50%" },
  { id: "electrical-db-team", title: "Distribution board", category: "Electrical", image: "/images/electrical/distribution-board-team.jpg", alt: "Team installing a distribution board", position: "50% 30%" },
  { id: "cctv-camera-pole", title: "CCTV camera on pole", category: "CCTV", image: "/images/cctv-fence/cctv-camera-on-pole.jpg", alt: "CCTV camera mounted on a pole", position: "50% 30%" },
  { id: "fence-wall", title: "Wall-top electric fence", category: "Fence", image: "/images/cctv-fence/electric-fence-wall.jpg", alt: "Electric fence wires along the top of a wall", position: "50% 40%" },
  { id: "fence-pole-technician", title: "Fence pole installation", category: "Fence", image: "/images/cctv-fence/fence-pole-technician.jpg", alt: "Technician fitting an electric fence pole", position: "50% 30%" },
  { id: "sound-school-event", title: "School event sound", category: "Sound", hire: true, image: "/images/sound/school-event-sound-setup.jpg", alt: "Sound system set up for a school event", position: "50% 50%" },
  { id: "sound-dj", title: "DJ controller and laptop", category: "Sound", hire: true, image: "/images/sound/dj-controller-and-laptop.jpg", alt: "DJ controller and laptop on a table", position: "50% 55%" },
  { id: "sound-line-array", title: "Line array on stage", category: "Sound", hire: true, image: "/images/sound/line-array-speakers-stage.jpg", alt: "Line array speakers flown beside a stage", position: "50% 35%" },
  { id: "sound-stacks", title: "Outdoor speaker stacks", category: "Sound", hire: true, image: "/images/sound/speaker-stacks-outdoor.jpg", alt: "Speaker stacks set up outdoors", position: "50% 40%" },
  { id: "sound-garden", title: "Speakers on stands", category: "Sound", hire: true, image: "/images/sound/speakers-on-stands-garden.jpg", alt: "Speakers on stands in a garden venue", position: "50% 50%" },
  { id: "sound-subwoofer", title: "Large subwoofer", category: "Sound", hire: true, image: "/images/sound/large-subwoofer-stage.jpg", alt: "Large subwoofer on a stage", position: "50% 50%" },
  { id: "sound-jbl-rcf", title: "JBL and RCF speaker set", category: "Sound", hire: true, image: "/images/sound/jbl-rcf-speaker-set.jpg", alt: "JBL and RCF speakers set up together", position: "50% 45%" },
  { id: "sound-mixer-amp-rack", title: "Mixer and amplifier rack", category: "Sound", image: "/images/sound/mixer-and-amp-rack.jpg", alt: "Mixer and amplifier in an equipment rack", position: "50% 50%" },
  { id: "sound-processor-rack", title: "Processor and amplifier rack", category: "Sound", image: "/images/sound/processor-and-amp-rack.jpg", alt: "Audio processor and amplifiers in a rack", position: "50% 50%" },
  { id: "racks-power-amp", title: "Power amplifier unit", category: "Sound", image: "/images/racks/power-amplifier-unit.jpg", alt: "Power amplifier unit", position: "50% 50%" },
  { id: "racks-internals", title: "Amplifier on the workbench", category: "Sound", image: "/images/racks/amplifier-internals-workbench.jpg", alt: "Amplifier opened up on a workbench", position: "50% 50%" },
  { id: "racks-custom-amps", title: "Custom amplifier units", category: "Sound", image: "/images/racks/custom-amplifier-units.jpg", alt: "Custom-built amplifier units", position: "50% 50%" },
  { id: "machinery-mixer", title: "Mixing machine with control panel", category: "Machinery", image: "/images/machinery/mixing-machine-with-control-panel.jpg", alt: "Industrial mixing machine with its control panel", position: "50% 50%" },
  { id: "machinery-testing-panel", title: "Testing a control panel", category: "Machinery", image: "/images/machinery/video-still-testing-control-panel-2.jpg", alt: "Technician testing a machine control panel", position: "50% 40%" },
];

export const projects: Project[] = raw.map((p) => {
  const base = imgOf(p.image, p.alt, p.position);
  return {
    ...base,
    id: p.id,
    title: p.title,
    category: p.category,
    hire: p.hire,
    orientation: base.width >= base.height ? "landscape" : "portrait",
    location: "",
    year: "",
  };
});

/** Curated mix for the landing page preview (one of each service first). */
export const featuredIds = [
  "solar-team-inverter",
  "sound-line-array",
  "electrical-ladders",
  "solar-commissioning",
  "cctv-camera-pole",
  "fence-wall",
  "solar-array-field",
  "sound-school-event",
  "machinery-mixer",
  "solar-srne-cage",
  "electrical-db-team",
  "sound-stacks",
];

export const getProject = (id: string) => projects.find((p) => p.id === id)!;
export const featured = featuredIds.map((id) => projects.find((p) => p.id === id)!);
export const hireProjects = projects.filter((p) => p.hire);

export const team = {
  ceo: imgOf("/images/team/ceo-portrait.jpg", "Portrait of the CEO wearing a Bramtech hard hat and navy suit", "50% 18%"),
  site: imgOf("/images/team/team-at-site-fence.jpg", "Bramtech team in orange vests at a site with an electric fence", "50% 25%"),
  hero: imgOf("/images/solar/team-installing-inverter.jpg", "Three Bramtech installers in orange vests fitting a hybrid inverter and battery on a wall", "50% 30%"),
};
