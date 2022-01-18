import {useBreakpointValue} from "native-base";

export default class BreakPointValues{
	static padding = 16;

	static WIDTH_MD = 768-BreakPointValues.padding;
	static WIDTH_LG = 992-BreakPointValues.padding;
	static WIDTH_XL = 1536-BreakPointValues.padding

	static getWidthValues(){
		return {
			"base": '100%',
			"md": BreakPointValues.WIDTH_MD+'px',
			"lg": BreakPointValues.WIDTH_LG+'px',
			"xl": BreakPointValues.WIDTH_XL+'px',
		}
	}

	static getSmallDeviceValues(){
		return {
			base: true,
			md: false,
		}
	}

	static usesSmallDevice(){
		return useBreakpointValue(BreakPointValues.getSmallDeviceValues())
	}

}