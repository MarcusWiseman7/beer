import { appMessages } from './stores';
import type { LocaleObject, TranslationReplacements } from './types/locale';
import type { Message } from './types/message';
import handlebars from 'handlebars';
import fs from 'fs/promises';

export const setAppMessage = (message: Message): void => {
    appMessages.update((a) => [...a, message]);
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

export const getLocaleText = (text: LocaleObject | string | undefined, locale: string, replacements: TranslationReplacements = []): string => {
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

export const compileEmailTemplate = async (contentTemplatePath: string, data: Record<string, unknown>): Promise<string> => {
    try {
        const layoutTemplatePath = './src/lib/email/layout.hbs';

        // layout template
        const layoutSource = await fs.readFile('./src/lib/email/layout.hbs', 'utf8');
        const layoutTemplate = handlebars.compile(layoutSource);

        // content template
        const contentSource = await fs.readFile(contentTemplatePath, 'utf8');
        const contentTemplate = handlebars.compile(contentSource);

        // Render template with data
        const contentHtml = contentTemplate(data);

        // Render the final email with layout and content
        return layoutTemplate({ body: contentHtml });
    } catch (error) {
        console.error('Error compiling email template:', error);
        throw error;
    }
};
