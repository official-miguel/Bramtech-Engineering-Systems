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
  ceo: { name: "Raphael Kang'ara", title: "Chief Executive Officer" },
  social: [
    { label: "Facebook", href: "[https://facebook.com/yourpage]" },
    { label: "Instagram", href: "[https://instagram.com/yourpage]" },
    { label: "TikTok", href: "[https://tiktok.com/@yourpage]" },
  ],
  // Only keep claims the owner has confirmed.
  trust: ["Own installation team", "Written warranty", "Free site survey"],
  // Plain description only. Add real history, years and numbers here when you have them.
  about: [
    "Bramtech Engineering Systems installs power, security and sound systems for homes, shops, schools, churches and industry across Kenya. We also hire out sound equipment for events.",
    "Our team does the work on site. We mount, wire, label and test every system, and we explain how it works before we leave.",
    "Every job starts with a free site survey and a written quote. After handover, call or WhatsApp us if you need help.",
  ],
  // Optional. Leave empty to hide. Example: ["Mixers", "Conveyors"]
  machineTypes: [] as string[],
  // Optional. Leave empty to hide. Example: ["JBL speakers", "Behringer mixers"]
  hireEquipment: [] as string[],
};

/** Footer credit. Set href to the Trillionaire Designs link (website or WhatsApp). The buttons show once it is set. */
export const designer = {
  name: "Trillionaire Designs",
  href: "https://trillionairedesigns.co.ke",
};

export function waLink(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
export const isPlaceholder = (v: string) => v.startsWith("[");
/** True when a value has been filled in (not empty, not a [placeholder]). */
export const isSet = (v?: string) => !!v && !isPlaceholder(v);
