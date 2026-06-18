import type { LucideIcon } from 'lucide-react-native';

export type PreTripChecklistPriority = 'required' | 'recommended';
export type PreTripChecklistItemState = 'good' | 'attention' | 'pending';

export type PreTripChecklistItem = {
  id: string;
  title: string;
  description: string;
  guideSteps?: string[];
  whyThisMatters?: string;
  priority: PreTripChecklistPriority;
  state: PreTripChecklistItemState;
  completed: boolean;
  icon?: LucideIcon;
};

export type PreTripChecklistSection = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  items: PreTripChecklistItem[];
};

export type PreTripChecklistMode = 'checklist' | 'status';

export type PreTripChecklistStats = {
  completedCount: number;
  totalCount: number;
  requiredRemainingCount: number;
  healthScore: number;
};
