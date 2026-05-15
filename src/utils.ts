/**
 * Count words in mixed Chinese/English text.
 * Chinese characters count as 1 word each, English words count as 1 word each.
 */
export function countWords(body: string): number {
	// Remove markdown/MDX syntax
	const text = body
		.replace(/```[\s\S]*?```/g, '')
		.replace(/`[^`]+`/g, '')
		.replace(/!\[.*?\]\(.*?\)/g, '')
		.replace(/\[([^\]]*)\]\(.*?\)/g, '$1')
		.replace(/#{1,6}\s/g, '')
		.replace(/[*_~>|-]/g, '')
		.replace(/\n+/g, ' ')
		.trim();

	if (!text) return 0;

	// Count Chinese characters
	const chineseChars = (text.match(/[一-鿿㐀-䶿]/g) || []).length;

	// Count English words (sequences of non-CJK, non-space characters)
	const englishWords = text
		.replace(/[一-鿿㐀-䶿]/g, ' ')
		.split(/\s+/)
		.filter((w) => w.length > 0).length;

	return chineseChars + englishWords;
}

/**
 * Format uptime from a start date to now.
 * Returns string like "11M 12d" or "3M 5d".
 */
export function formatUptime(startDate: Date): string {
	const now = new Date();
	const diffMs = now.getTime() - startDate.getTime();
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	const months = Math.floor(diffDays / 30);
	const days = diffDays % 30;

	if (months > 0) {
		return `${months}M ${days}d`;
	}
	return `${days}d`;
}
