import { useMutation } from '@tanstack/react-query';
import { generateChecklist } from '../services/checklist.service';
import { mapProfileToApiRequest } from '../services/mapper';
import { saveChecklist } from '../../../lib/storage';
import { checklistKeys } from '../queries/checklist.queries';
import type { MotorcycleProfile } from '../types/motorcycle-profile';

export function useGenerateChecklist() {
  return useMutation({
    mutationKey: checklistKeys.generate(),
    mutationFn: async (profile: MotorcycleProfile) => {
      const apiData = mapProfileToApiRequest(profile);
      return generateChecklist(apiData);
    },
    onSuccess: async (result) => {
      await saveChecklist(result);
    },
  });
}
