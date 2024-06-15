import {ImageSourcePropType} from 'react-native';

export interface CategoryCardT {
  id: number;
  name: string;
  image: ImageSourcePropType | undefined;
}
