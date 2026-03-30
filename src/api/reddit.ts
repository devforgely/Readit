export const API_ROOT = 'https://www.reddit.com';
const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(API_ROOT)}`;

export const getSubredditPosts = async (subreddit: string) : Promise<RedditPost[]> => {
  const response = await fetch(`${proxyUrl}${subreddit}.json`);
  const json: RedditResponse<RedditPost> = await response.json();

  return json.data.children.map((post) => post.data);
};

export const getSubreddits = async () : Promise<RedditSubreddit[]> => {
  const response = await fetch(`${proxyUrl}/subreddits.json`);
  const json: RedditResponse<RedditSubreddit> = await response.json();

  return json.data.children.map((subreddit) => subreddit.data);
};

export const getPostComments = async (permalink: string) : Promise<RedditComment[]> => {
  const response = await fetch(`${proxyUrl}${permalink}.json`);
  const json: [RedditResponse<RedditPost>, RedditResponse<RedditComment>] = await response.json();

  return json[1].data.children.map((subredditComment) => subredditComment.data);
};
