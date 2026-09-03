import type { Project, Localized } from "@/lib/projects";

// The CRM's public, read-only properties feed. No API key needed —
// see MMM_CRM/api.php, action=public-properties. Only properties an
// agent has explicitly checked "Publish to Website" for are returned.
const CRM_PROPERTIES_URL = "https://crm.mmmestate.com/api.php?action=public-properties";

type CrmProperty = {
  id: number;
  slug: string;
  title: string;
  emirate: string;
  location: Localized;
  description: Localized;
  price: number | null;
  currency: string;
  status: string;
  developer: string;
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  handover: string;
  image: string;
  gallery: string[];
};

type CrmPropertiesResponse = {
  status: "success" | "error";
  properties: CrmProperty[];
  message?: string;
};

function toProject(cp: CrmProperty): Project {
  const typeLabel: Localized = {
    en: cp.status || "Property",
    ru: cp.status || "Объект",
    ar: cp.status || "عقار",
  };

  return {
    slug: cp.slug,
    name: cp.title,
    image: cp.image,
    gallery: cp.gallery && cp.gallery.length > 0 ? cp.gallery : [cp.image],
    location: cp.location,
    type: typeLabel,
    handover: cp.handover || "TBA",
    priceFromAed: cp.price ?? 0,
    paymentPlan: "TBA",
    description: cp.description,
    amenities: [],
  };
}

/**
 * Fetches published properties from the CRM and maps them into the
 * site's existing Project shape, so they can be rendered by the same
 * ProjectCard / project detail components used for the DAMAC catalogue.
 *
 * Network or parsing failures return an empty array rather than
 * throwing, so a CRM outage never takes down the projects page —
 * it just temporarily shows no CRM-sourced listings.
 */
export async function fetchCrmProjects(): Promise<Project[]> {
  try {
    const res = await fetch(CRM_PROPERTIES_URL, {
      // Revalidate periodically rather than caching indefinitely, since
      // this data changes whenever an agent publishes/edits a listing.
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return [];
    const data: CrmPropertiesResponse = await res.json();
    if (data.status !== "success" || !Array.isArray(data.properties)) return [];
    return data.properties.map(toProject);
  } catch {
    return [];
  }
}
