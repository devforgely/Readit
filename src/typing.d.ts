type RedditResponse<T> = {
  kind: "Listing";
  data: {
    modhash: string;
    dist: number;
    children: {
      kind: string;
      data: T;
    }[];
    after: string | null;
    before: string | null;
  };
}

type RedditPost = {
  id: string;
  title: string;
  author: string;
  subreddit: string;
  selftext: string;
  score: number;
  num_comments: number;
  thumbnail: string;
  url: string;
  permalink: string;
  created_utc: number;
  ups: number;
  downs: number;
  is_self: boolean;
  over_18: boolean;
}

type RedditSubreddit = {
  id: string;
  display_name: string;
  title: string;
  public_description: string;
  subscribers: number;
  url: string; // e.g., "/r/pics/"
  icon_img: string;
  header_img: string | null;
  over18: boolean;
  subreddit_type: "public" | "private" | "restricted";
  created_utc: number;
}

type RedditComment = {
  // Identifiers
  id: string;              // e.g., "g12345"
  name: string;            // Fullname, e.g., "t1_g12345"
  author: string;          // Username of the commenter
  parent_id: string;       // The ID of the parent (could be a post or another comment)
  link_id: string;         // The ID of the post (Link) this comment belongs to
  
  // Content
  body: string;            // Raw markdown text
  body_html: string;       // Escaped HTML version of the comment
  
  // Metadata
  score: number;           // Net votes (ups - downs)
  ups: number;             // Total upvotes
  downs: number;           // Total downvotes
  created_utc: number;     // Unix timestamp (UTC)
  permalink: string;       // Relative URL to the comment
  
  // Subreddit Info
  subreddit: string;       // Name of the subreddit (e.g., "javascript")
  subreddit_id: string;    // Fullname of the subreddit (e.g., "t5_2qh1i")
  
  // Nesting
  // Note: 'replies' can be an empty string ("") if there are no replies, 
  // or a Listing object if there are.
  replies: RedditResponse<RedditComment> | ""; 
  
  // Distinguishing (for Mods/Admins)
  distinguished: "moderator" | "admin" | null;
  is_submitter: boolean;   // True if the commenter is the original poster (OP)
}

type RedditPostView = RedditPost & {
  showingComments: boolean;
  loadingComments: boolean;
  errorComments: boolean;
  comments: RedditComment[];
}