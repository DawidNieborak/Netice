using Newtonsoft.Json;

namespace Netice.Models
{
    public class TwitterRepositoryItem
    {
        [JsonProperty("id")] public string Id { get; set; }
        [JsonProperty("text")] public string Text { get; set; }
        [JsonProperty("author_id")] public string AuthorId { get; set; }
        [JsonProperty("conversation_id")] public string ConversationId { get; set; }
        [JsonProperty("created_at")] public string CreatedAt { get; set; }
        
        
        [JsonProperty("public_metrics")] public PublicMetrics PublicMetrics { get; set; }
        [JsonProperty("referenced_tweets", NullValueHandling = NullValueHandling.Ignore)] 
        public List<ReferencedTweets> ReferencedTweets { get; set; }
    }

    public partial class PublicMetrics
    {
        [JsonProperty("retweet_count")]
        public long RetweetCount { get; set; }
        [JsonProperty("reply_count")]
        public long ReplyCount { get; set; }
        [JsonProperty("like_count")]
        public long LikeCount { get; set; }
        [JsonProperty("quote_count")]
        public long QuoteCount { get; set; }
    }

    public partial class ReferencedTweets
    {
        [JsonProperty("type")]
        public string Type { get; set; }
        [JsonProperty("id")]
        public string Id { get; set; }
    }
    
    public partial class Meta
    {
        [JsonProperty("oldest_id")]
        public string OldestId { get; set; }

        [JsonProperty("newest_id")]
        public string NewestId { get; set; }

        [JsonProperty("result_count")]
        public long ResultCount { get; set; }

        [JsonProperty("next_token")]
        public string NextToken { get; set; }
    }
    
    
    // entry
    public class RetrieveMultipleTwitterRepositoryItems
    {
        [JsonProperty("data")]
        public List<TwitterRepositoryItem> TwitterRepositoryItem { get; set; }
        
        [JsonProperty("meta")]
        public Meta Meta { get; set; }
    }

}