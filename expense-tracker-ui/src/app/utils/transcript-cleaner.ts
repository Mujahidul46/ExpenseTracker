export function getTextWithoutFillerWords(input: string): string {
    const listOfFillerWords: string[] = [
    // Action verbs
    'bought', 'purchased', 'paid', 'spent', 'got', 'ordered', 'had', 'went', 'grabbed', 'picked', 'took', 'used', 'needed', 'wanted',
    'getting', 'making', 'buying', 'seeing', 'eating', 'drinking', 'having', 'trying', 'stopping', 'see',
    // Mental/cognitive verbs
    'think', 'thought', 'believe', 'suppose', 'guess', 'feel', 'assume', 'reckon', 'figure', 'imagine', 'mean', 'meant', 'remember', 'forget',
    // Pronouns/articles
    'i', 'my', 'me', 'the', 'a', 'an', 'some', 'this', 'that', 'these', 'those', 'we', 'us', 'our', 'your', 'you', 'he', 'she', 'they', 'them', 'their', 'his', 'her', 'it', 'its',
    // Contractions
    "i'm", "i'll", "i've", "i'd", "you're", "you'll", "you've", "you'd", "he's", "she's", "it's", "we're", "we've", "we'll", "we'd", "they're", "they've", "they'll", "they'd",
    "that's", "there's", "here's", "what's", "who's", "where's", "when's", "why's", "how's", "ain't", "aren't", "wasn't", "weren't",
    "haven't", "hasn't", "hadn't", "don't", "doesn't", "didn't", "won't", "wouldn't", "shouldn't", "couldn't", "can't", "mustn't", "mightn't", "shan't",
    "let", "lets", "lemme", "gotta", "gonna", "wanna", "kinda", "sorta", "outta", "dunno", "betcha", "gimme", "c'mon", "y'all",
    // Prepositions
    'for', 'at', 'on', 'to', 'from', 'in', 'with', 'of', 'and', 'or', 'but', 'then', 'also', 'plus', 'near', 'next', 'under', 'over', 'through', 'across', 'between', 'among', 'along',
    // Conjunctions
    'nor', 'yet', 'because', 'since', 'unless', 'until', 'although', 'though', 'if', 'whether',
    // Time words
    'today', 'yesterday', 'earlier', 'later', 'morning', 'afternoon', 'before', 'after', 'when', 'while', 'now', 'soon', 'recently', 'currently', 'right', 'evening', 'night', 'week', 'month',
    // Approximations
    'about', 'around', 'roughly', 'approximately', 'like',
    // Noise
    'um', 'uh', 'er', 'ah', 'well', 'so', 'just', 'really', 'kind', 'sort', 'know', 'yeah', 'yes', 'no', 'okay', 'ok', 'sure',
    'anyway', 'anyways', 'anyhow', 'besides', 'however', 'nonetheless', 'nevertheless', 'otherwise', 'therefore', 'thus', 'hence', 'meanwhile', 'furthermore', 'moreover',
    // Auxiliary verbs
    'is', 'was', 'were', 'are', 'am', 'be', 'been', 'being', 'have', 'has', 'do', 'does', 'did', 'get', 'gets', 'getting',
    // Modal verbs
    'will', 'would', 'should', 'could', 'can', 'may', 'might', 'must', 'shall',
    // Location words
    'shop', 'shops', 'store', 'stores', 'supermarket', 'mall', 'place', 'market', 'restaurant', 'cafe', 'outlet', 'counter', 'stand', 'stall', 'vendor', 'bar', 'pub', 'deli', 'bakery', 'butcher',
    // Quantifiers/Determiners
    'much', 'more', 'less', 'little', 'lot', 'lots', 'bit', 'any', 'every', 'each', 'either', 'neither', 'both', 'all', 'several', 'few', 'many',
    // Adverbs
    'very', 'quite', 'pretty', 'rather', 'too', 'enough', 'only', 'even', 'almost', 'nearly', 'barely', 'hardly', 'actually', 'basically',
    // Common adjectives
    'new', 'old', 'nice', 'good', 'cheap', 'expensive', 'big', 'small', 'large', 'tiny', 'huge',
    // Vague words
    'thing', 'stuff', 'something', 'anything', 'nothing', 'everything', 'someone', 'anyone', 'everyone', 'test'
    ];
    const words = input.toLowerCase().split(/\s+/);
    const filteredWords: string[] = [];
    for (var word of words) {
    if (!listOfFillerWords.includes(word)) {
        filteredWords.push(word);
    }
    }
    return filteredWords.join(' ').trim();
}