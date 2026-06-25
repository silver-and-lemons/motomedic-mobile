import { View, Text, Pressable } from 'react-native';
import { Home, MapPin, HeadphonesIcon, User, QrCode } from 'lucide-react-native';

type NavigationBarProps = {
  activeTab?: string;
  onTabPress?: (tab: string) => void;
  onQrPress?: () => void;
};

type TabItemProps = {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onPress: () => void;
};

function TabItem({ icon, label, isActive, onPress }: TabItemProps) {
  return (
    <Pressable onPress={onPress} className="items-center gap-1">
      {icon}
      <Text
        className={`text-[10px] font-semibold ${
          isActive ? 'text-primary' : 'text-muted'
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function NavigationBar({
  activeTab = 'home',
  onTabPress,
  onQrPress,
}: NavigationBarProps) {
  return (
    <View className="flex-row items-center justify-around border-t border-surface-card bg-surface px-4 pb-6 pt-3">
      <TabItem
        icon={<Home size={22} color={activeTab === 'home' ? '#0ea5e9' : '#94a3b8'} />}
        label="Home"
        isActive={activeTab === 'home'}
        onPress={() => onTabPress?.('home')}
      />

      <TabItem
        icon={<MapPin size={22} color={activeTab === 'locate' ? '#0ea5e9' : '#94a3b8'} />}
        label="Locate"
        isActive={activeTab === 'locate'}
        onPress={() => onTabPress?.('locate')}
      />

      <View className="relative -mt-8">
        <Pressable
          onPress={onQrPress}
          className="h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/40"
        >
          <QrCode size={24} color="#FFFFFF" />
        </Pressable>
      </View>

      <TabItem
        icon={
          <HeadphonesIcon
            size={22}
            color={activeTab === 'support' ? '#0ea5e9' : '#94a3b8'}
          />
        }
        label="Support"
        isActive={activeTab === 'support'}
        onPress={() => onTabPress?.('support')}
      />

      <TabItem
        icon={<User size={22} color={activeTab === 'account' ? '#0ea5e9' : '#94a3b8'} />}
        label="Account"
        isActive={activeTab === 'account'}
        onPress={() => onTabPress?.('account')}
      />
    </View>
  );
}
