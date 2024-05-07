import { SIZES } from "../constants";


export const responsiveWidth = (number: number) => {
    const Multiplier  =  number / 375;
    return SIZES.width * Multiplier
};

export  const responsiveHeight = (number: number) => {
    const Multiplier  =  number / SIZES.height;
    return SIZES.height * Multiplier
  }