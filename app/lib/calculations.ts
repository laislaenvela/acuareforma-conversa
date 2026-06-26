import type { Contribution, ContributionPosition } from "./types";

/**
 * Count contributions by position type
 */
export function countByPosition(
  contributions: Contribution[],
  position: ContributionPosition
): number {
  return contributions.filter((c) => c.position === position).length;
}

/**
 * Get all unique users from contributions
 */
export function getUniqueUsers(contributions: Contribution[]): Set<string | undefined> {
  return new Set(contributions.map((c) => c.participantUser));
}

/**
 * Get all unique articles from contributions
 */
export function getUniqueArticles(contributions: Contribution[]): Set<number> {
  return new Set(contributions.map((c) => c.articleId));
}

/**
 * Get article ranking by contribution count
 */
export function getArticleRanking(
  contributions: Contribution[]
): Array<{
  articleId: number;
  articleTitle: string;
  count: number;
}> {
  const ranking = Object.values(
    contributions.reduce(
      (acc, contribution) => {
        const key = contribution.articleId;

        if (!acc[key]) {
          acc[key] = {
            articleId: contribution.articleId,
            articleTitle: contribution.articleTitle,
            count: 0,
          };
        }

        acc[key].count++;
        return acc;
      },
      {} as Record<
        number,
        {
          articleId: number;
          articleTitle: string;
          count: number;
        }
      >
    )
  );

  return ranking.sort((a, b) => b.count - a.count);
}

/**
 * Get contributions for a specific user
 */
export function getUserContributions(
  contributions: Contribution[],
  userNumber: string | undefined
): Contribution[] {
  return contributions.filter(
    (contribution) => contribution.participantUser === userNumber
  );
}

/**
 * Get count of articles without contributions
 */
export function getArticlesWithoutContributions(
  allArticles: Array<{ id: number; title: string }>,
  contributions: Contribution[]
): Array<{ id: number; title: string }> {
  return allArticles.filter(
    (article) =>
      !contributions.some((contribution) => contribution.articleId === article.id)
  );
}
