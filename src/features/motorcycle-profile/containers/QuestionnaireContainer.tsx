import { useState, useCallback } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Button } from '../../../components/atoms/Button';
import { Progress } from '../../../components/atoms/Progress';
import BasicInfoStep from '../components/BasicInfoStep';
import EngineStep from '../components/EngineStep';
import FeaturesStep from '../components/FeaturesStep';
import RiderProfileStep from '../components/RiderProfileStep';
import ProfileSummary from '../components/ProfileSummary';
import {
  motorcycleProfileSchema,
  questionnaireDefaultValues,
} from '../types/motorcycle-profile';
import type { MotorcycleProfile } from '../types/motorcycle-profile';
import { useMotorcycleProfileStore } from '../../../store/motorcycle-profile.store';

const STEPS = [
  { key: 'basic-info', title: 'Basic Info', component: BasicInfoStep },
  { key: 'engine', title: 'Engine', component: EngineStep },
  { key: 'features', title: 'Features', component: FeaturesStep },
  { key: 'rider-profile', title: 'Rider Profile', component: RiderProfileStep },
] as const;

export default function QuestionnaireContainer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const saveProfile = useMotorcycleProfileStore((s) => s.saveProfile);

  const form = useForm<MotorcycleProfile>({
    resolver: zodResolver(motorcycleProfileSchema),
    defaultValues: questionnaireDefaultValues,
    mode: 'onChange',
  });

  const goNext = useCallback(async () => {
    const fields = getStepFields(currentStep);
    const isValid = await form.trigger(fields);
    if (!isValid) return;

    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowSummary(true);
    }
  }, [currentStep, form]);

  const goBack = useCallback(() => {
    if (showSummary) {
      setShowSummary(false);
    } else if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep, showSummary]);

  const handleConfirm = useCallback(() => {
    const data = form.getValues();
    saveProfile(data);
    router.back();
  }, [form, saveProfile]);

  const StepComponent = STEPS[currentStep].component;
  const progressValue = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-slate-50"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FormProvider {...form}>
        <View className="flex-1 px-5 pt-4">
          {!showSummary && (
            <View className="mb-6">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-sm font-medium text-slate-500">
                  Step {currentStep + 1} of {STEPS.length}
                </Text>
                <Text className="text-sm font-medium text-blue-600">
                  {Math.round(progressValue)}%
                </Text>
              </View>
              <Progress value={progressValue} />
              <Text className="text-xl font-bold text-slate-900 mt-4">
                {STEPS[currentStep].title}
              </Text>
            </View>
          )}

          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {showSummary ? (
              <ProfileSummary
                profile={form.getValues()}
                onConfirm={handleConfirm}
                onEdit={() => setShowSummary(false)}
              />
            ) : (
              <>
                <StepComponent />

                <View className="flex-row gap-3 mt-8 mb-6">
                  {(currentStep > 0) && (
                    <Button variant="outline" className="flex-1" onPress={goBack}>
                      Back
                    </Button>
                  )}
                  <Button className="flex-1" onPress={goNext}>
                    {currentStep === STEPS.length - 1 ? 'Review' : 'Next'}
                  </Button>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </FormProvider>
    </KeyboardAvoidingView>
  );
}

function getStepFields(step: number): (keyof MotorcycleProfile)[] {
  switch (step) {
    case 0: return ['make', 'model', 'year'];
    case 1: return ['engineType', 'displacementCc'];
    case 2: return ['customFeatures'];
    case 3: return ['primaryUse', 'experienceLevel'];
    default: return [];
  }
}
