import { appMessages } from './stores';
import type { LocaleObject, TranslationReplacements } from './types/locale';
import type { Message } from './types/message';

export const setAppMessage = (message: Message): void => {
    appMessages.update((a) => [...a, message]);
};

export const cloudinaryPicURL = (src: string): string => {
    return 'https://res.cloudinary.com/dukumou2e/image/upload/f_auto' + src;
};

export const getPointFromEvent = ($event): { x: number, y: number } => {
    let point;
    if ($event.targetTouches && $event.targetTouches[0]) {
        point = { x: $event.targetTouches[0].clientX, y: $event.targetTouches[0].clientY };
    } else if ($event.changedTouches && $event.changedTouches[0]) {
        point = { x: $event.changedTouches[0].clientX, y: $event.changedTouches[0].clientY };
    } else {
        point = { x: $event.clientX, y: $event.clientY };
    }
    return point;
};

export const timeAgo = (date: Date): string => {
    const now = Date.now();
    const referenceDate = new Date(date).getTime();
    const diff = now - referenceDate;

    if (diff > 72 * 60 * 60 * 1000) return new Date(date).toLocaleDateString();
    else return `${Math.round(diff / (1000 * 60 * 60))}h ago`;
};

export const getLocaleText = (text: LocaleObject | string | undefined, locale: string,replacements: TranslationReplacements): string => {
    return (text &&
        parseTranslation((typeof text === 'string' ? text : text[locale as keyof object]), replacements)
    ) || '';
};

export const parseTranslation = (rawText: string, replacements: TranslationReplacements): string => {
    if (replacements && rawText) {
        let outputText = rawText.slice(0);

        replacements.forEach((replacement) => {
            outputText = outputText.replaceAll(`{${replacement.key}}`, replacement.value);
        });

        return outputText;
    }

    return rawText;
};
