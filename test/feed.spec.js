import { formatDateTime, formatUserName } from "../src/js/feed.js"

describe('formatDateTime', () => {
    test('returns a string in the format DD/MM/YYYY', () => {
        const date = new Date(2023, 4, 3); // May 3rd, 2023
        expect(formatDateTime(date)).toBe('3/5/2023');
    });

    test('returns an empty string if the date is invalid', () => {
        expect(formatDateTime('invalid date')).toBe('');
    });
});


describe('formatUserName', () => {
    it('should return the formatted username correctly', () => {
        const userEmail = 'user@example.com';
        const expected = '@user';

        const result = formatUserName(userEmail);

        expect(result).toEqual(expected);
    });

    it('should return an empty string when the email does not contain "@"', () => {
        const userEmail = 'userexample.com';
        const expected = '';

        const result = formatUserName(userEmail);

        expect(result).toEqual(expected);
    });

    it('should return an empty string when the email is null or undefined', () => {
        const userEmail = null;
        const expected = '';

        const result = formatUserName(userEmail);

        expect(result).toEqual(expected);
    });
});