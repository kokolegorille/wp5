import { LanguageContext } from "./useApp";

// Wrap custom context into a hook
const useLanguage = () => {
    const { lang, setLang } = useContext(LanguageContext);

    if (!setLang) {
        throw new Error("The LanguageProvider is missing")
    }

    return [lang, setLang];
}

export default useLanguage;