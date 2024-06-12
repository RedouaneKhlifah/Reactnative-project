import {ImageSourcePropType} from 'react-native';

export interface CategoryCardT {
  id: number;
  title: string;
  image: ImageSourcePropType | undefined;
}
