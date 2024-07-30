import ImageColor from 'react-native-image-colors';

export const getColorFromImage = async (image: string) => {
  const fallbackColor = '#f0f0f0';

  const color = await ImageColor.getColors(image, {
    fallback: fallbackColor,
  });
  switch (color.platform) {
    case 'android':
      return color.dominant ?? fallbackColor;
    case 'ios':
      return color.background ?? fallbackColor;
    default:
      return fallbackColor;
  }
};
