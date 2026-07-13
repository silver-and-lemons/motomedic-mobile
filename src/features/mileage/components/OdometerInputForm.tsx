import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';

type OdometerInputFormProps = {
  initialValue?: number;
  onSave: (value: number) => void;
  title?: string;
  submitLabel?: string;
};

export default function OdometerInputForm({
  initialValue = 0,
  onSave,
  title = 'Set Odometer Reading',
  submitLabel = 'Save Reading',
}: OdometerInputFormProps) {
  const [value, setValue] = useState(initialValue);
  const [textValue, setTextValue] = useState(String(initialValue));
  const [error, setError] = useState('');

  const STEP = 100;
  const MIN = 0;
  const MAX = 999999;

  function syncFromNumber(n: number) {
    setValue(n);
    setTextValue(String(n));
    setError('');
  }

  function increment() {
    const next = value + STEP;
    if (next <= MAX) syncFromNumber(next);
  }

  function decrement() {
    const next = value - STEP;
    if (next >= MIN) syncFromNumber(next);
  }

  function handleTextChange(text: string) {
    const cleaned = text.replace(/[^0-9]/g, '');
    setTextValue(cleaned);
    const parsed = parseInt(cleaned, 10);
    if (!isNaN(parsed) && parsed >= MIN && parsed <= MAX) {
      setValue(parsed);
      setError('');
    }
  }

  function handleBlur() {
    const parsed = parseInt(textValue, 10);
    if (isNaN(parsed) || parsed < MIN) {
      syncFromNumber(MIN);
    } else if (parsed > MAX) {
      syncFromNumber(MAX);
    } else {
      syncFromNumber(parsed);
    }
  }

  function handleSubmit() {
    if (value < MIN) {
      setError('Reading must be at least 0 km');
      return;
    }
    onSave(value);
  }

  return (
    <View className="gap-6">
      <View>
        <Text className="mb-2 text-2xl font-bold text-white">{title}</Text>
        <Text className="text-sm text-muted">
          Enter your current odometer reading in kilometers
        </Text>
      </View>

      <View className="items-center gap-6">
        <View className="flex-row items-center gap-4">
          <Pressable
            onPress={decrement}
            disabled={value <= MIN}
            className="h-14 w-14 items-center justify-center rounded-full border border-slate-600 active:opacity-60 disabled:opacity-30"
          >
            <Minus size={24} color="#94a3b8" />
          </Pressable>

          <View className="min-w-[140px] items-center">
            <Text className="text-5xl font-bold text-white">
              {value.toLocaleString()}
            </Text>
            <Text className="text-base text-muted">km</Text>
          </View>

          <Pressable
            onPress={increment}
            disabled={value >= MAX}
            className="h-14 w-14 items-center justify-center rounded-full border border-slate-600 active:opacity-60 disabled:opacity-30"
          >
            <Plus size={24} color="#94a3b8" />
          </Pressable>
        </View>

        <View className="w-full">
          <Input
            label="Or type exact reading"
            keyboardType="numeric"
            value={textValue}
            onChangeText={handleTextChange}
            onBlur={handleBlur}
            error={error}
            placeholder="0"
          />
        </View>

        <Button
          title={submitLabel}
          variant="primary"
          className="mt-2 w-full"
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
}
