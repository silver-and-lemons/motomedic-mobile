import { View, Text, ScrollView } from 'react-native';
import { Button } from '../../../components/atoms/Button';
import type { MotorcycleProfile } from '../types/motorcycle-profile';

const FEATURE_LABELS: Record<string, string> = {
  'aftermarket-exhaust': 'Aftermarket Exhaust',
  'power-commander': 'Power Commander / ECU Tune',
  'aftermarket-suspension': 'Aftermarket Suspension',
  'led-lighting': 'LED Lighting',
  'custom-seat': 'Custom Seat',
  'luggage-system': 'Luggage System',
  'windshield-upgrade': 'Windshield Upgrade',
  'crash-guards': 'Crash Guards / Frame Sliders',
  'aftermarket-brakes': 'Aftermarket Brakes',
};

type ProfileSummaryProps = {
  profile: MotorcycleProfile;
  onConfirm: () => void;
  onEdit: () => void;
};

export default function ProfileSummary({ profile, onConfirm, onEdit }: ProfileSummaryProps) {
  return (
    <ScrollView className="flex-1">
      <View className="gap-4">
        <View className="rounded-xl bg-white p-4">
          <Text className="text-lg font-bold text-slate-900 mb-3">Motorcycle Details</Text>
          <DetailRow label="Make" value={profile.make} />
          <DetailRow label="Model" value={profile.model} />
          <DetailRow label="Year" value={String(profile.year)} />
          <DetailRow label="Engine" value={profile.engineType.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())} />
          <DetailRow label="Displacement" value={`${profile.displacementCc}cc`} />
          <DetailRow
            label="Primary Use"
            value={profile.primaryUse.charAt(0).toUpperCase() + profile.primaryUse.slice(1)}
          />
          <DetailRow
            label="Experience"
            value={profile.experienceLevel.charAt(0).toUpperCase() + profile.experienceLevel.slice(1)}
          />
        </View>

        {profile.customFeatures.length > 0 && (
          <View className="rounded-xl bg-white p-4">
            <Text className="text-lg font-bold text-slate-900 mb-3">Custom Features</Text>
            {profile.customFeatures.map((feature) => (
              <Text key={feature} className="text-base text-slate-700 py-0.5">
                • {FEATURE_LABELS[feature] || feature}
              </Text>
            ))}
          </View>
        )}

        <View className="flex-row gap-3 pt-2">
          <Button variant="outline" className="flex-1" onPress={onEdit}>
            Edit
          </Button>
          <Button className="flex-1" onPress={onConfirm}>
            Confirm Profile
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between py-2 border-b border-slate-100">
      <Text className="text-sm text-slate-500">{label}</Text>
      <Text className="text-sm font-medium text-slate-900">{value}</Text>
    </View>
  );
}
