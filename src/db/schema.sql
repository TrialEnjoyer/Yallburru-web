CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    owner_id UUID NOT NULL REFERENCES user_profile(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP WITH TIME ZONE,
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    slug VARCHAR(200) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    
    -- Basic article metadata
    title VARCHAR(200),
    description TEXT,
    featured_image_url TEXT,
    reading_time_minutes INTEGER,
    
    -- SEO metadata
    meta_title VARCHAR(60),  -- Recommended SEO title length
    meta_description VARCHAR(160),  -- Recommended SEO description length
    keywords TEXT[],  -- Array of keywords
    canonical_url TEXT,
    robots_meta VARCHAR(50) DEFAULT 'index, follow',
    
    -- Open Graph metadata
    og_title VARCHAR(60),
    og_description VARCHAR(200),
    og_image_url TEXT,
    og_type VARCHAR(50) DEFAULT 'article',
    
    -- Twitter Card metadata
    twitter_title VARCHAR(60),
    twitter_description VARCHAR(200),
    twitter_image_url TEXT,
    twitter_card_type VARCHAR(20) DEFAULT 'summary_large_image',
    
    -- Additional metadata
    is_featured BOOLEAN DEFAULT false,
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    share_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    estimated_read_time INTEGER,
    language VARCHAR(10) DEFAULT 'en',
    
    -- Constraints
    UNIQUE(slug),
    CONSTRAINT valid_status CHECK (status IN ('draft', 'published', 'archived'))
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_subcategory ON articles(subcategory);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_owner ON articles(owner_id);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at);

-- Full text search index for content and metadata
CREATE INDEX IF NOT EXISTS idx_articles_fts ON articles USING GIN (
    to_tsvector('english',
        COALESCE(title, '') || ' ' ||
        COALESCE(description, '') || ' ' ||
        COALESCE(content, '') || ' ' ||
        COALESCE(array_to_string(keywords, ' '), '')
    )
);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_articles_updated_at
    BEFORE UPDATE ON articles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 