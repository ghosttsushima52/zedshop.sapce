'use client';

import { dentalClinicData } from '../../content/dental';
import { fitnessClubData } from '../../content/fitness';
import { lawFirmData } from '../../content/law';
import { saasPlatformData } from '../../content/saas';
import { ServicesRenderer } from './ServicesRenderer';

export type ServicesSiteId = 'law' | 'saas' | 'dental' | 'fitness';
export const ServicesSiteRenderer = ServicesRenderer;

export const servicesRouteManifest = {
  law: { pages: ['index', 'practices', 'team', 'publications', 'contact'], details: [...lawFirmData.practiceAreas.map((item) => item.slug), ...lawFirmData.publications.map((item) => item.slug)] },
  saas: { pages: ['index', 'product', 'solutions', 'pricing', 'changelog', 'docs'], details: [...saasPlatformData.modules.map((item) => item.slug), ...saasPlatformData.useCases.map((item) => item.slug)] },
  dental: { pages: ['index', 'treatments', 'clinicians', 'technology', 'patient-guide'], details: dentalClinicData.treatments.map((item) => item.slug) },
  fitness: { pages: ['index', 'programs', 'coaches', 'facilities', 'memberships', 'schedule'], details: fitnessClubData.programs.map((item) => item.slug) },
} as const;
