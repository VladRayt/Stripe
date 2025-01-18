import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform, Pressable, StyleProp, ViewStyle } from 'react-native';

type LinkProps = ComponentProps<typeof Link>;


type Props = Omit<LinkProps, 'href'> & {
  href: string;
  style?: StyleProp<ViewStyle>;
};

export function ExternalLink({ href, children, style, onPress, ...rest }: Props): JSX.Element {
  const handlePress = async (event: any) => {
    if (Platform.OS !== 'web') {
      event.preventDefault();
      await openBrowserAsync(href);
    }
    onPress?.(event);
  };

  if (href.startsWith('http://') || href.startsWith('https://')) {
    return (
      <Pressable
        onPress={handlePress}
        style={style}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <Link
      target="_blank"
      {...rest}
      style={style}
      href={href as LinkProps['href']}
      onPress={handlePress}
    >
      {children}
    </Link>
  );
}
