import { useState } from 'react';
import { ChevronDown, CircleCheck, Ellipsis, Search } from 'lucide-react-native';
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
  type ListRenderItem,
} from 'react-native';
import { Button } from '../../../components/atoms/Button';
import type {
  BikeBrandFilter,
  CatalogueBike,
} from '../types/catalogue-bike';

type BikeCatalogueScreenProps = {
  bikes: CatalogueBike[];
  brandFilters: BikeBrandFilter[];
  selectedBikeId?: number;
  selectedBrand: BikeBrandFilter;
  search: string;
  isLoading: boolean;
  errorMessage?: string;
  onBack: () => void;
  onBrandChange: (brand: BikeBrandFilter) => void;
  onFallback: () => void;
  onProceed: () => void;
  onSearchChange: (value: string) => void;
  onSelectBike: (bikeId: number) => void;
};

export default function BikeCatalogueScreen({
  bikes,
  brandFilters,
  selectedBikeId,
  selectedBrand,
  search,
  isLoading,
  errorMessage,
  onBack,
  onBrandChange,
  onFallback,
  onProceed,
  onSearchChange,
  onSelectBike,
}: BikeCatalogueScreenProps) {
  const [brandMenuOpen, setBrandMenuOpen] = useState(false);
  const renderBike: ListRenderItem<CatalogueBike> = ({ item }) => (
    <BikeCard
      bike={item}
      selected={item.id === selectedBikeId}
      onPress={() => onSelectBike(item.id)}
    />
  );

  return (
    <View className="flex-1 bg-[#11161a]">
      <FlatList
        data={bikes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderBike}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ gap: 14 }}
        contentContainerStyle={{ padding: 20, paddingBottom: 28, gap: 14 }}
        ListHeaderComponentStyle={{ zIndex: 20, elevation: 20 }}
        ListHeaderComponent={
          <View
            className="gap-5"
            style={{ zIndex: 20, elevation: 20 }}
          >
            <View className="flex-row items-center justify-between border-b border-[#22313a] pb-5">
              <Pressable
                accessibilityRole="button"
                onPress={onBack}
                className="flex-row items-center gap-2 active:opacity-70"
              >
                <Text className="text-xl text-white">{'<'}</Text>
                <Text className="text-sm font-semibold text-white">Booking</Text>
              </Pressable>
              <Ellipsis size={20} color="#f8fafc" />
            </View>

            <View className="items-center gap-1">
              <Text className="text-2xl font-extrabold text-white">
                BIKE SELECTION
              </Text>
              <Text className="text-base font-bold text-white">
                Choose from the following:
              </Text>
              <Text className="text-xs text-[#94a3b8]">
                What motorcycle are you currently using?
              </Text>
            </View>

            <View className="flex-row items-center rounded-full border border-[#2a3a4a] bg-[#101f25] px-4">
              <Search size={16} color="#5fb3d3" />
              <TextInput
                accessibilityLabel="Search bikes by model"
                className="min-h-11 flex-1 px-3 text-sm text-white"
                placeholder="Search model"
                placeholderTextColor="#64748b"
                value={search}
                onChangeText={onSearchChange}
              />
            </View>

            <View className="gap-3">
              <View className="relative z-20 flex-row items-center justify-between">
                <Text className="text-base font-extrabold text-white">
                  The most searched bikes
                </Text>
                <View className="relative">
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => setBrandMenuOpen((open) => !open)}
                    className="w-32 flex-row items-center justify-between rounded-full border border-[#5b7480] px-3 py-2 active:opacity-80"
                  >
                    <Text className="text-xs text-white" numberOfLines={1}>
                      {selectedBrand === 'all' ? 'Select Motor' : selectedBrand}
                    </Text>
                    <ChevronDown size={14} color="#f8fafc" />
                  </Pressable>

                  {brandMenuOpen && (
                    <View
                      className="absolute right-0 top-10 w-32 overflow-hidden rounded-xl border border-[#2a3a4a] bg-[#0d1b21]"
                      style={{ zIndex: 30, elevation: 30 }}
                    >
                      {brandFilters.map((brand) => (
                        <Pressable
                          key={brand}
                          accessibilityRole="button"
                          onPress={() => {
                            onBrandChange(brand);
                            setBrandMenuOpen(false);
                          }}
                          className={`px-3 py-2 active:opacity-80 ${
                            selectedBrand === brand ? 'bg-[#173442]' : ''
                          }`}
                        >
                          <Text className="text-xs font-semibold text-white" numberOfLines={1}>
                            {brand === 'all' ? 'All' : brand}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View className="rounded-xl border border-[#2a3a4a] bg-[#15242b] p-5">
            <Text className="text-center text-sm font-semibold text-white">
              {isLoading ? 'Loading bikes...' : errorMessage ?? 'No bikes found'}
            </Text>
          </View>
        }
        ListFooterComponent={
          <View className="gap-4 pt-2">
            <Button
              variant="primary"
              className="rounded-xl py-4"
              onPress={onFallback}
            >
              My bike is NOT in the list
            </Button>
            <Pressable
              accessibilityRole="button"
              disabled={!selectedBikeId}
              onPress={onProceed}
              className="items-center active:opacity-70 disabled:opacity-40"
            >
              <Text className="text-base font-extrabold text-[#0ea5e9]">
                PROCEED {'>'}
              </Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={onBack}
              className="items-center active:opacity-70"
            >
              <Text className="text-xs font-semibold text-[#94a3b8]">
                {'< GO BACK'}
              </Text>
            </Pressable>
          </View>
        }
      />
    </View>
  );
}

function BikeCard({
  bike,
  selected,
  onPress,
}: {
  bike: CatalogueBike;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={`min-h-[178px] flex-1 rounded-xl border-2 bg-[#0b2028] p-2 active:opacity-80 ${
        selected ? 'border-[#0ea5e9]' : 'border-[#15546a]'
      }`}
    >
      <View className="absolute right-2 top-2 z-10">
        <CircleCheck
          size={14}
          color={selected ? '#0ea5e9' : '#7ca0ad'}
          fill={selected ? '#0ea5e9' : 'transparent'}
        />
      </View>
      <View className="h-24 items-center justify-center rounded-lg bg-[#14262d]">
        <Text className="text-xs font-bold uppercase text-[#5fb3d3]">
          Image
        </Text>
      </View>
      <View className="mt-2 rounded-lg bg-[#45535a] p-2">
        <Text className="text-sm font-extrabold text-white" numberOfLines={1}>
          {bike.brand} {bike.model}
        </Text>
        <Text className="text-[10px] font-semibold text-[#7dd3fc]">
          {bike.year} - Present
        </Text>
        <Text className="text-[10px] text-[#b6c3ca]" numberOfLines={1}>
          {bike.transmission}
        </Text>
      </View>
    </Pressable>
  );
}
