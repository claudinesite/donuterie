export interface MadieMenuItem {
  name: string;
  description?: string;
  image?: string;
  alt?: string;
  badge?: string;
  note?: string;
}

export interface MadieMenuGroup {
  title: string;
  items: MadieMenuItem[];
}

export interface MadieMenuPanel {
  id: "madeleines" | "coffee" | "takeaway";
  label: string;
  mobileLabel: string;
  groups: MadieMenuGroup[];
}

export interface MadieStoryCard {
  type: "image" | "video";
  src: string;
  alt: string;
  copy: string;
}
