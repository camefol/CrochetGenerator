import { Text, type TextProps, StyleSheet } from 'react-native';

export type ThemedTextProps = TextProps & {
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  };

export function BetterText({
    style,
    type='default',
    ...rest
}: ThemedTextProps ) {
    
  return (
    <Text
    style={[
      type === 'default' ? styles.default : undefined,
      type === 'title' ? styles.title : undefined,
      type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
      type === 'link' ? styles.link : undefined,
      style,
    ]}
    {...rest}
    />
  )
}

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    lineHeight: 24
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
    fontFamily: "Times New Roman",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  }
})