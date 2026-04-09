import { useButtonState } from './useButtonState';

describe('useButtonState', () => {
  beforeEach(() => {
    useButtonState.setState({
      held: '',
      pressed: '',
      activePressedIds: [],
    });
  });

  it('restores pressed to held button after releasing a second pressed button', () => {
    const { setPressed, setHeld, clearPressed } = useButtonState.getState();

    setPressed('record');
    setHeld('record');

    setPressed(13);
    expect(useButtonState.getState().held).toBe('record');
    expect(useButtonState.getState().pressed).toBe(13);

    clearPressed(13);

    expect(useButtonState.getState().held).toBe('record');
    expect(useButtonState.getState().pressed).toBe('record');
  });

  it('keeps held button while another button is pressed', () => {
    const { setPressed, setHeld } = useButtonState.getState();

    setPressed('record');
    setHeld('record');
    setPressed(13);

    expect(useButtonState.getState().held).toBe('record');
    expect(useButtonState.getState().pressed).toBe(13);
  });
});
