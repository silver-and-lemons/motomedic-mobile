import { useEffect } from 'react';
import { View, Text, Pressable, Modal, FlatList } from 'react-native';
import { X, Trash2, Clock } from 'lucide-react-native';
import { useRideSessions } from '../hooks/use-ride-sessions';
import type { TimerSession } from '../types';

type RideRecordingsProps = {
  visible: boolean;
  onClose: () => void;
};

function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  return `${minutes}m ${seconds}s`;
}

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const timeStr = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (isToday) {
    return `Today, ${timeStr}`;
  }

  const dateStr = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return `${dateStr}, ${timeStr}`;
}

export default function RideRecordings({
  visible,
  onClose,
}: RideRecordingsProps) {
  const { sessions, isLoading, refresh, clearAll, totalCount, totalDurationSeconds } =
    useRideSessions();

  useEffect(() => {
    if (visible) {
      refresh();
    }
  }, [visible, refresh]);

  const reversedSessions = [...sessions].reverse();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-[#0b171b]">
        <View className="flex-row items-center justify-between border-b border-[#1e2d33] px-5 py-4">
          <View>
            <Text className="text-lg font-bold text-white">Ride Recordings</Text>
            <Text className="text-xs text-[#8A999E]">
              {totalCount} ride{totalCount !== 1 ? 's' : ''} recorded
            </Text>
          </View>
          <Pressable
            onPress={onClose}
            className="h-9 w-9 items-center justify-center rounded-full bg-[#121B1E]"
          >
            <X size={18} color="#8A999E" />
          </Pressable>
        </View>

        {totalCount > 0 && (
          <View className="flex-row items-center gap-3 border-b border-[#1e2d33] px-5 py-3">
            <View className="flex-1 rounded-xl bg-[#121B1E] p-3">
              <Text className="text-xs text-[#8A999E]">Total Rides</Text>
              <Text className="mt-0.5 text-lg font-bold text-white">{totalCount}</Text>
            </View>
            <View className="flex-1 rounded-xl bg-[#121B1E] p-3">
              <Text className="text-xs text-[#8A999E]">Total Time</Text>
              <Text className="mt-0.5 text-lg font-bold text-[#00d4aa]">
                {formatDuration(totalDurationSeconds)}
              </Text>
            </View>
          </View>
        )}

        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-sm text-[#8A999E]">Loading sessions...</Text>
          </View>
        ) : reversedSessions.length === 0 ? (
          <View className="flex-1 items-center justify-center px-8">
            <Clock size={48} color="#1e2d33" />
            <Text className="mt-4 text-base font-semibold text-white">
              No rides yet
            </Text>
            <Text className="mt-1 text-center text-sm text-[#8A999E]">
              Start a ride from the dashboard to begin recording your sessions.
            </Text>
          </View>
        ) : (
          <FlatList
            data={reversedSessions}
            keyExtractor={(_, index) => `session-${index}`}
            contentContainerStyle={{ padding: 20, gap: 10 }}
            renderItem={({ item, index }) => (
              <SessionRow
                session={item}
                index={reversedSessions.length - index}
              />
            )}
          />
        )}

        {totalCount > 0 && (
          <View className="border-t border-[#1e2d33] px-5 py-4">
            <Pressable
              onPress={async () => {
                await clearAll();
                refresh();
              }}
              className="flex-row items-center justify-center gap-2 rounded-full border border-[#e74c3c]/30 bg-[#e74c3c]/10 py-3"
            >
              <Trash2 size={14} color="#e74c3c" />
              <Text className="text-sm font-bold text-[#e74c3c]">Clear All Recordings</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Modal>
  );
}

function SessionRow({
  session,
  index,
}: {
  session: TimerSession;
  index: number;
}) {
  return (
    <View className="flex-row items-center gap-4 rounded-xl border border-[#1e2d33] bg-[#121B1E] p-4">
      <View className="h-10 w-10 items-center justify-center rounded-full bg-[#00d4aa]/10">
        <Text className="text-sm font-bold text-[#00d4aa]">{index}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-sm font-semibold text-white">
          Ride #{index}
        </Text>
        <Text className="mt-0.5 text-xs text-[#8A999E]">
          {formatDate(session.startTimestamp)}
        </Text>
      </View>
      <View className="items-end">
        <Text
          className="text-sm font-bold text-[#00d4aa]"
          style={{ fontVariant: ['tabular-nums'] }}
        >
          {formatDuration(session.durationSeconds)}
        </Text>
      </View>
    </View>
  );
}
