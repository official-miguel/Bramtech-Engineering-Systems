/**
 * Edit everything in [brackets] here. Each placeholder is also listed in PLACEHOLDERS.md.
 */
export const site = {
  name: "Bramtech Engineering Systems",
  short: "Bramtech",
  tagline: "One team for your power, security and sound.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com",
  phoneDisplay: "0722 257 244", // confirm with owner
  phoneTel: "+254722257244",
  whatsapp: "254722257244",
  email: "[info@yourdomain.co.ke]",
  address: "[Street / building, Town]",
  city: "[Town]",
  region: "Kenya",
  areasServed: ["[Nairobi]", "[Kiambu]", "[Other counties]"],
  hours: [
    { days: "Monday to Friday", time: "[8:00 am to 5:00 pm]" },
    { days: "Saturday", time: "[8:00 am to 1:00 pm]" },
    { days: "Sunday", time: "[Closed]" },
  ],
  ceo: { name: "Raphael Kang'ara", title: "[Chief Executive Officer]" },
  social: [
    { label: "Facebook", href: "[https://facebook.com/yourpage]" },
    { label: "Instagram", href: "[https://instagram.com/yourpage]" },
    { label: "TikTok", href: "[https://tiktok.com/@yourpage]" },
  ],
  // Only keep claims the owner has confirmed.
  trust: ["Own installation team", "Written warranty", "Free site survey"],
  about: [
    "[Short company story, paragraph 1. Who you are and where you work.]",
    "[Paragraph 2. What you install and how your team works on site.]",
    "[Paragraph 3. What clients can expect after handover.]",
  ],
  machineTypes: ["[Machine type 1]", "[Machine type 2]", "[Machine type 3]"],
  hireEquipment: [
    "[Speakers, brand and model]",
    "[Amplifiers]",
    "[Mixers]",
    "[DJ equipment]",
    "[Microphones]",
    "[Stands and cabling]",
  ],
};

/** Footer credit. Set href to the Trillionaire Designs link (website or WhatsApp). The buttons show once it is set. */
export const designer = {
  name: "Trillionaire Designs",
  href: "",
};

export function waLink(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
export const isPlaceholder = (v: string) => v.startsWith("[");
