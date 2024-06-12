interface ButtonProps {
  onPress: (() => void) | (() => Promise<void>);
  title: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
}
