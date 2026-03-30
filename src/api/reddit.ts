export const API_ROOT = 'https://www.reddit.com';

export const getSubredditPosts = async (subreddit: string) : Promise<RedditPost[]> => {
  const response = await fetch(`${API_ROOT}${subreddit}.json`);
  const json: RedditResponse<RedditPost> = await response.json();

  return json.data.children.map((post) => post.data);
};

export const getSubreddits = async () : Promise<RedditSubreddit[]> => {
  const response = await fetch(`${API_ROOT}/subreddits.json`);
  const json: RedditResponse<RedditSubreddit> = await response.json();

  return json.data.children.map((subreddit) => subreddit.data);
};

export const getPostComments = async (permalink: string) : Promise<RedditComment[]> => {
  const response = await fetch(`${API_ROOT}${permalink}.json`);
  const json: [RedditResponse<RedditPost>, RedditResponse<RedditComment>] = await response.json();

  return json[1].data.children.map((subredditComment) => subredditComment.data);
};
