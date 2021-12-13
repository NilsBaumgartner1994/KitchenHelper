import {extendTheme} from 'native-base';
import {CSS_Helper} from "../helper/CSS_Helper";

const sidebarWidth = 320;

export default class BaseThemeGenerator{

	static getBaseTheme(initialColorMode){
		return extendTheme({
			sidebarWidth: sidebarWidth+"px",
			breakpoints: {
				'base': 0+320,
				'sm': 480+320,
				'md': 768+320,
				'lg': 992+320,
				'xl': 1536+320, // +280 from MenuWidth
			},
			components: {
				Text: {
					defaultProps: {
						fontSize: 'lg',
					},
				},
				Button: {
					defaultProps: {
						_dark: {
							backgroundColor: "#A9A9A9"
						},
						_light: {
							backgroundColor: "rgb(23, 41, 64)"
						},
						paddingHorizontal: 12,
						height: 52
					}
				}
			},
			colors: {
				slateGray: {
					50: '#f3f2f2',
					100: '#d8d8d8',
					200: '#bebebe',
					300: '#a3a3a3',
					400: '#898989',
					500: '#6f6f6f',
					600: '#565656',
					700: '#3e3e3e',
					800: '#252525',
					900: '#0d0c0d',
				},
			},
			Pressable: {
				cursor: 'pointer',
			},

			config: {
				// Changing initialColorMode to 'dark'
				initialColorMode: initialColorMode,
			},
		});
	}
}
