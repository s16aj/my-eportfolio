export function formatMonthYear(date) {
    if (!date) return '';

    const parsed = new Date(date);
    if (isNaN(parsed)) return '';

    return parsed.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    });
}
