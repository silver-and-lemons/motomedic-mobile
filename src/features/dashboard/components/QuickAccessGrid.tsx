import { View, Text, Pressable } from 'react-native';
import type { QuickAccessLink } from '../types/dashboard';

type QuickAccessGridProps = {
  links: QuickAccessLink[];
};

export default function QuickAccessGrid({ links }: QuickAccessGridProps) {
  return (
    <View className="px-5">
      <Text className="mb-3 text-xs font-semibold tracking-wider text-muted uppercase">
        QUICK ACCESS
      </Text>

      <View className="flex-row gap-3">
        {links.map((link) => {
          const IconComponent = link.icon;
          return (
            <Pressable
              key={link.id}
              className="flex-1 items-center gap-2 rounded-2xl bg-surface-card py-4"
            >
              <View className="h-12 w-12 items-center justify-center rounded-full bg-surface-light">
                <IconComponent size={22} color="#94a3b8" />
              </View>
              <Text className="text-xs font-bold tracking-wider text-muted uppercase">
                {link.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
