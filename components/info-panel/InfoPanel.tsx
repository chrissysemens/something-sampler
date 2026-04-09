import { View, Text } from "react-native"
import { useButtonState } from "state/useButtonState";
import { useModeState } from "state/useModeState";

const InfoPanel = () => {
    const  {pressed, held} = useButtonState();
    const { activeMode, activePad } = useModeState();
    return (
        <View>
            <Text>{`HELD: ${held}`}</Text>
            <Text>{`PRESSED: ${pressed}`}</Text>
            <Text>{`ACTIVE MODE: ${activeMode}`}</Text>
            <Text>{`ACTIVE PAD: ${activePad}`}</Text>
        </View>
    )
}

export { InfoPanel }