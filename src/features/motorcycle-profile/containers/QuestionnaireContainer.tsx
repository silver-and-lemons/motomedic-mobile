import { useState, useCallback } from 'react';
import { View, Text, ScrollView, Pressable, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, type Href } from 'expo-router';
import { ArrowLeft, Ellipsis } from 'lucide-react-native';
import { Button } from '../../../components/atoms/Button';
import VehicleTypeStep from '../components/VehicleTypeStep';
import EngineSizeStep from '../components/EngineSizeStep';
import FuelTypeStep from '../components/FuelTypeStep';
import CoolingTypeStep from '../components/CoolingTypeStep';
import BikeAgeStep from '../components/BikeAgeStep';
import SummaryOverlay from '../components/SummaryOverlay';
import PoliciesAgreementStep from '../components/PoliciesAgreementStep';
import {
  motorcycleProfileSchema,
  questionnaireDefaultValues,
} from '../types/motorcycle-profile';
import type { MotorcycleProfile } from '../types/motorcycle-profile';
import { useMotorcycleProfileStore } from '../../../store/motorcycle-profile.store';
import { useGenerateChecklist } from '../hooks/use-checklist';

const STEPS = [
  { key: 'vehicle-type', title: 'Vehicle Type', component: VehicleTypeStep },
  { key: 'engine-size', title: 'Engine Size', component: EngineSizeStep },
  { key: 'fuel-type', title: 'Fuel Type', component: FuelTypeStep },
  { key: 'cooling-type', title: 'Cooling Type', component: CoolingTypeStep },
  { key: 'bike-age', title: 'Bike Age', component: BikeAgeStep },
  { key: 'policies', title: 'Policies', component: PoliciesAgreementStep },
] as const;

const PRE_TRIP_CHECKLIST_ROUTE = '/pre-trip-checklist' as Href;

export default function QuestionnaireContainer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const saveProfile = useMotorcycleProfileStore((s) => s.saveProfile);
  const mutation = useGenerateChecklist();

  const form = useForm<MotorcycleProfile>({
    resolver: zodResolver(motorcycleProfileSchema),
    defaultValues: questionnaireDefaultValues,
    mode: 'onChange',
  });

  const goNext = useCallback(async () => {
    const fields = getStepFields(currentStep);
    const isValid = await form.trigger(fields);
    if (!isValid) return;

    if (currentStep === 4) {
      setShowSummary(true);
      return;
    }

    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, form]);

  const goBack = useCallback(() => {
    if (showSummary) {
      setShowSummary(false);
    } else if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      router.back();
    }
  }, [currentStep, showSummary]);

  const handleAgree = useCallback(() => {
    setShowSummary(false);
    setCurrentStep(5);
  }, []);

  const handleConfirm = useCallback(async () => {
    const isValid = await form.trigger();
    if (!isValid) return;
    const profile = form.getValues();
    saveProfile(profile);
    mutation.mutate(profile, {
      onSuccess: () => {
        router.replace(PRE_TRIP_CHECKLIST_ROUTE);
      },
      onError: () => {
        Alert.alert(
          'Connection Error',
          'Checklist could not be generated. Your profile was saved locally.',
        );
        router.replace(PRE_TRIP_CHECKLIST_ROUTE);
      },
    });
  }, [form, saveProfile, mutation]);

  const StepComponent = STEPS[currentStep].component;
  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#11161a]"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FormProvider {...form}>
        <View className="flex-1 px-5 pt-4">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <Pressable onPress={goBack} className="h-10 w-10 items-center justify-center active:opacity-60">
              <ArrowLeft size={22} color="#94a3b8" />
            </Pressable>
            <Text className="text-base font-bold text-white">Motorcycle Profile</Text>
            <Pressable className="h-10 w-10 items-center justify-center active:opacity-60">
              <Ellipsis size={22} color="#94a3b8" />
            </Pressable>
          </View>

          {/* Step Indicator */}
          {!showSummary && (
            <View className="mb-6">
              <Text className="text-xs font-bold uppercase tracking-widest text-[#94a3b8] mb-3">
                Step {currentStep + 1} of {STEPS.length}
              </Text>
              <View className="flex-row gap-1.5">
                {STEPS.map((_, idx) => (
                  <View
                    key={idx}
                    className={`h-1 flex-1 rounded-full ${
                      idx <= currentStep ? 'bg-[#0ea5e9]' : 'bg-[#2a3a4a]'
                    }`}
                  />
                ))}
              </View>
            </View>
          )}

          {/* Content */}
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {showSummary ? (
              <SummaryOverlay
                profile={form.getValues()}
                onAgree={handleAgree}
                onDecline={() => setShowSummary(false)}
              />
            ) : (
              <>
                <StepComponent />
              </>
            )}
          </ScrollView>

          {/* Bottom Navigation */}
          {!showSummary && (
            <View className="py-4 gap-3">
              {isLastStep ? (
                <>
                  {form.formState.errors.agreedToPolicies && (
                    <Text className="text-sm text-red-500 text-center">
                      {form.formState.errors.agreedToPolicies.message}
                    </Text>
                  )}
                  <Button
                    variant="primary"
                    className="w-full rounded-full py-4"
                    onPress={handleConfirm}
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? 'SUBMITTING...' : 'CONFIRM'}
                  </Button>
                  <Pressable onPress={goBack} className="items-center active:opacity-60">
                    <Text className="text-sm font-medium text-[#94a3b8]">{'< GO BACK'}</Text>
                  </Pressable>
                </>
              ) : (
                <View className="flex-row gap-3">
                  {currentStep > 0 && (
                    <Button
                      variant="outline"
                      className="flex-1 rounded-full py-4"
                      onPress={goBack}
                    >
                      {'< GO BACK'}
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    className={`${currentStep > 0 ? 'flex-1' : 'w-full'} rounded-full py-4`}
                    onPress={goNext}
                  >
                    {`PROCEED ${currentStep < STEPS.length - 1 ? '>' : ''}`}
                  </Button>
                </View>
              )}
            </View>
          )}
        </View>
      </FormProvider>
    </KeyboardAvoidingView>
  );
}

function getStepFields(step: number): (keyof MotorcycleProfile)[] {
  switch (step) {
    case 0: return ['vehicleType'];
    case 1: return ['engineSizeCc'];
    case 2: return ['fuelType'];
    case 3: return ['coolingType'];
    case 4: return ['bikeAge'];
    case 5: return ['agreedToPolicies'];
    default: return [];
  }
}
