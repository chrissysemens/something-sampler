import { Pad } from 'components/device/pad/pad';
import { playSampleFromUri } from 'audio/audioEngine';
import React from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { View } from 'react-native';
import {
  SEQUENCER_STEP_COUNT,
  useSequencerStore,
} from 'state/useSequencerState';
import { useButtonState } from 'state/useButtonState';
import { useTheme } from 'theme/useTheme';
import { Knobs } from '../knobs/knobs';
import { useModeState } from 'state/useModeState';

const STEPS_PER_ROW = 4;
const ROW_COUNT = SEQUENCER_STEP_COUNT / STEPS_PER_ROW;

const Sequencer = () => {
  const { theme } = useTheme();
  const { held } = useButtonState();
  const {
    pads,
    bpm,
    isPlaying,
    currentStep,
    advanceStep,
    toggleStep,
    assignSound,
  } = useSequencerStore();

  const { activePad, setActiveMode, setActivePad } = useModeState();

  const selectedPad =
    typeof activePad === 'number' ? (pads[activePad] ?? pads[0]) : pads[0];

  const stepRows = Array.from({ length: ROW_COUNT }, (_, rowIndex) =>
    Array.from({ length: STEPS_PER_ROW }, (_, columnIndex) => {
      return rowIndex * STEPS_PER_ROW + columnIndex;
    }),
  );

  React.useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const stepDurationMs = 60000 / bpm;
    let timeoutId: ReturnType<typeof setTimeout>;
    let expectedAt = performance.now() + stepDurationMs;

    const tick = () => {
      const { currentStep: storeCurrentStep, pads: storePads } =
        useSequencerStore.getState();
      const nextStep = (storeCurrentStep + 1) % SEQUENCER_STEP_COUNT;

      storePads.forEach((pad) => {
        if (!pad.soundId || !pad.pattern[nextStep]) {
          return;
        }
        void playSampleFromUri(pad.soundId);
      });

      advanceStep();

      // Measure drift and correct next tick timing
      const drift = performance.now() - expectedAt;
      expectedAt += stepDurationMs;
      timeoutId = setTimeout(tick, Math.max(0, stepDurationMs - drift));
    };

    timeoutId = setTimeout(tick, stepDurationMs);

    return () => clearTimeout(timeoutId);
  }, [advanceStep, bpm, isPlaying]);

  if (!selectedPad) {
    return null;
  }

  const assignSampleFromPicker = async (padId: number) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'audio/*',
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (result.canceled) {
      return;
    }

    const selectedAsset = result.assets[0];

    if (!selectedAsset) {
      return;
    }

    assignSound(padId, selectedAsset.uri);
  };

  const handleStepPress = (stepIndex: number) => {
    switch (held) {
      case 'record':
        setActiveMode('program');
        setActivePad(stepIndex);
        void assignSampleFromPicker(stepIndex);
        break;
      case 'play':
        setActiveMode('playback');
        setActivePad(stepIndex);
        {
          const sampleUri = pads[stepIndex]?.soundId;

          if (!sampleUri) {
            return;
          }

          void playSampleFromUri(sampleUri);
        }
        break;
      case 'fx':
        console.log('FX action on step', stepIndex + 1);
        break;
      case 'func':
        setActiveMode('program');
        setActivePad(stepIndex);
        break;
      default:
        toggleStep(selectedPad.id, stepIndex);
        break;
    }
  };

  return (
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing[4],
          marginTop: 5,
        }}
      >
        {stepRows.map((row, rowIndex) => (
          <View
            key={rowIndex}
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {row.map((stepIndex) => {
              const isCurrentStep = stepIndex === currentStep;
              const isStepEnabled = selectedPad.pattern[stepIndex];

              return (
                <Pad
                  key={stepIndex}
                  id={stepIndex}
                  active={isCurrentStep}
                  enableHold={false}
                  width={56}
                  height={50}
                  showIndicator={true}
                  indicatorOn={isStepEnabled}
                  onPressInAction={() => handleStepPress(stepIndex)}
                />
              );
            })}
          </View>
        ))}
      </View>
      <Knobs />
    </View>
  );
};

export { Sequencer };
