import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "@repo/lib/i18n";

void i18n.use(initReactI18next).init({
	resources: translations,
	lng: "en",
	interpolation: {
		escapeValue: false,
	},
});

export { default } from "i18next";
