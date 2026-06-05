import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useFormContext } from 'react-hook-form';
import { Checkbox } from '../../../components/atoms/Checkbox';
import type { MotorcycleProfile } from '../types/motorcycle-profile';

const POLICY_SECTIONS = [
  {
    key: 'scope',
    title: 'Scope of Services',
    text: 'Motomedic provides motorcycle maintenance and repair services as agreed upon in the service order. Additional services require separate approval.',
  },
  {
    key: 'accounts',
    title: 'User Accounts',
    text: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.',
  },
  {
    key: 'conduct',
    title: 'User Conduct',
    text: 'You agree to use the service only for lawful purposes and in accordance with all applicable laws and regulations.',
  },
  {
    key: 'intellectual-property',
    title: 'Intellectual Property',
    text: 'All content, trademarks, and intellectual property on this platform are owned by Motomedic or its licensors.',
  },
  {
    key: 'limitation',
    title: 'Limitation of Liability',
    text: 'Motomedic shall not be liable for any indirect, incidental, or consequential damages arising from service use.',
  },
  {
    key: 'privacy',
    title: 'Privacy Policy',
    text: 'We collect and process personal data in accordance with our Privacy Policy. By agreeing, you consent to such processing.',
  },
];

export default function PoliciesAgreementStep() {
  const { setValue } = useFormContext<MotorcycleProfile>();
  const [agreedSections, setAgreedSections] = useState<Set<string>>(new Set());

  const toggleSection = (key: string) => {
    const next = new Set(agreedSections);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    setAgreedSections(next);
    setValue('agreedToPolicies', next.size === POLICY_SECTIONS.length);
  };

  return (
    <View className="flex-1">
      <Text className="text-base text-[#94a3b8] mb-4">
        Please review and agree to each section below:
      </Text>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="gap-4 mb-6">
          {POLICY_SECTIONS.map((section) => (
            <View
              key={section.key}
              className="rounded-xl border border-slate-700 bg-[#1b232c] p-4"
            >
              <Checkbox
                label={section.title}
                checked={agreedSections.has(section.key)}
                onCheckedChange={() => toggleSection(section.key)}
              />
              <Text className="text-sm text-[#64748b] mt-2 ml-8 leading-5">
                {section.text}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
