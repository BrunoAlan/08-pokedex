import { View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

interface Props {
  color?: string;
}

const FullScreenLoader = ({ color }: Props) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}
    >
      <ActivityIndicator color={color ?? undefined} size={50} />
    </View>
  );
};
export default FullScreenLoader;
