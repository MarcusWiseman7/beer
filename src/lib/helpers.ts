import { appMessages } from './stores';
import type { IMessage } from './ts-interfaces';

export const setAppMessage = (message: IMessage): void => {
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
