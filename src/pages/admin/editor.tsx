/* eslint-disable  */
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { Extension } from '@tiptap/core'
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Highlighter,
  X,
  Save,
  ChevronDown,
  ChevronUp,
  Download,
  ArrowDownToLine,
  RotateCw,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import ImageUploadModal from '~/components/shared/ImageUploadModal';
import { supabase } from '~/utils/supabase';
import { Database } from '~/types/supabase';
import { useUserProfile } from '~/utils/UserProfileContext';
import Cookies from 'js-cookie';
import { withRetry } from '~/utils/retryUtils';

interface FontSizeOptions {
  types: string[];
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
    };
  }
}

// Custom extension for font size
const FontSize = Extension.create<FontSizeOptions>({
  name: 'fontSize',

  addOptions() {
    return {
      types: ['textStyle'],
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.fontSize) {
                return {}
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setFontSize: (fontSize: string) => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontSize })
          .run()
      },
    }
  },
})

const COLORS = {
  standard: [
    { value: '#000000', label: 'Black' },
    { value: '#FFFFFF', label: 'White' },
    { value: '#374151', label: 'Gray' },
    { value: '#EF4444', label: 'Red' },
    { value: '#F97316', label: 'Orange' },
    { value: '#EAB308', label: 'Yellow' },
    { value: '#22C55E', label: 'Green' },
    { value: '#3B82F6', label: 'Blue' },
    { value: '#6366F1', label: 'Indigo' },
    { value: '#A855F7', label: 'Purple' },
    { value: '#EC4899', label: 'Pink' },
    { value: '#14B8A6', label: 'Teal' },
  ],
  pastel: [
    { value: '#fef08a', label: 'Pastel Yellow' },
    { value: '#f3e8ff', label: 'Pastel Purple' },
    { value: '#fee2e2', label: 'Pastel Red' },
    { value: '#ffedd5', label: 'Pastel Orange' },
    { value: '#e0f2fe', label: 'Pastel Blue' },
    { value: '#ccfbf1', label: 'Pastel Teal' },
    { value: '#dcfce7', label: 'Pastel Green' },
    { value: '#fce7f3', label: 'Pastel Pink' },
  ],
};

const ColorPickerPopup = ({ 
  isOpen, 
  onClose, 
  onColorSelect, 
  selectedColor,
  title,
  showPastelColors = true,
  showStandardColors = true,
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onColorSelect: (color: string) => void;
  selectedColor: string;
  title: string;
  showPastelColors?: boolean;
  showStandardColors?: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute z-50 mt-2 p-2 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[200px]">
      <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-100">
        <span className="text-sm font-medium text-gray-700">{title}</span>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <X size={14} />
        </button>
      </div>
      <div className="space-y-3">
        {showStandardColors && (
          <div>
            <div className="text-xs text-gray-500 mb-1">Standard Colors</div>
            <div className="grid grid-cols-6 gap-1">
              {COLORS.standard.map((color) => (
                <button
                  key={color.value}
                  onClick={() => {
                    onColorSelect(color.value);
                    onClose();
                  }}
                  className={`w-6 h-6 rounded-md flex items-center justify-center transition-transform hover:scale-110 ${
                    selectedColor === color.value ? 'ring-2 ring-offset-2 ring-purple-500' : ''
                  } ${color.value === '#FFFFFF' ? 'border border-gray-200' : ''}`}
                  style={{ backgroundColor: color.value }}
                  title={color.label}
                />
              ))}
            </div>
          </div>
        )}
        
        {showPastelColors && (
          <div>
            <div className="text-xs text-gray-500 mb-1">Pastel Colors</div>
            <div className="grid grid-cols-6 gap-1">
              {COLORS.pastel.map((color) => (
                <button
                  key={color.value}
                  onClick={() => {
                    onColorSelect(color.value);
                    onClose();
                  }}
                  className={`w-6 h-6 rounded-md flex items-center justify-center transition-transform hover:scale-110 ${
                    selectedColor === color.value ? 'ring-2 ring-offset-2 ring-purple-500' : ''
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.label}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const MenuBar = ({ editor }: { editor: any }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [highlightColor, setHighlightColor] = useState('#fef08a'); // Default yellow
  const [textColor, setTextColor] = useState('#000000'); // Default black
  const [isHighlightColorPickerOpen, setIsHighlightColorPickerOpen] = useState(false);
  const [isTextColorPickerOpen, setIsTextColorPickerOpen] = useState(false);

  if (!editor) {
    return null;
  }

  const addImage = (url: string) => {
    editor.chain().focus().setImage({ src: url }).run();
  };

  const setLink = () => {
    const url = window.prompt('Enter the URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  // Calculate word and character count
  const getWordCount = () => {
    return editor.getText().split(/\s+/).filter((word: string) => word.length > 0).length;
  };

  const getCharacterCount = () => {
    return editor.getText().length;
  };

  return (
    <>
      <div className="border-b border-gray-200 p-4 flex flex-wrap gap-2">
        {/* Text color button and picker */}
        <div className="relative">
          <button
            onClick={() => setIsTextColorPickerOpen(!isTextColorPickerOpen)}
            className="p-2 rounded hover:bg-gray-100 flex items-center gap-1"
            title="Text color"
          >
            <div 
              className="w-4 h-4 rounded-full border border-gray-200"
              style={{ backgroundColor: textColor }}
            />
            <span 
              className="font-bold"
              style={{ color: textColor }}
            >
              A
            </span>
          </button>
          <ColorPickerPopup
            isOpen={isTextColorPickerOpen}
            onClose={() => setIsTextColorPickerOpen(false)}
            onColorSelect={(color) => {
              setTextColor(color);
              editor.chain().focus().setColor(color).run();
            }}
            selectedColor={textColor}
            title="Text Color"
            showPastelColors={false}
          />
        </div>

        {/* Highlight color button and picker */}
        <div className="flex gap-1 border-l border-gray-200 pl-2 relative">
          <button
            onClick={() => editor.chain().focus().toggleHighlight({ color: highlightColor }).run()}
            className={`p-2 rounded hover:bg-gray-100 ${
              editor.isActive('highlight') ? 'bg-gray-200' : ''
            }`}
            style={{ 
              borderBottom: `3px solid ${highlightColor}`,
              marginBottom: '-3px'
            }}
          >
            <Highlighter size={20} />
          </button>
          <button
            onClick={() => setIsHighlightColorPickerOpen(!isHighlightColorPickerOpen)}
            className="p-2 rounded hover:bg-gray-100"
            title="Highlight color"
          >
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: highlightColor }}
            />
          </button>
          <ColorPickerPopup
            isOpen={isHighlightColorPickerOpen}
            onClose={() => setIsHighlightColorPickerOpen(false)}
            onColorSelect={setHighlightColor}
            selectedColor={highlightColor}
            title="Highlight Color"
            showStandardColors={true}
            showPastelColors={true}
          />
        </div>

        <select
          className="p-2 rounded border"
          onChange={(event) => {
            editor.chain().focus().setFontSize(event.target.value).run();
          }}
          value={editor.getAttributes('textStyle').fontSize}
        >
          <option value="">Size: Default</option>
          <option value="0.875rem">Size: Small</option>
          <option value="1rem">Size: Medium</option>
          <option value="1.25rem">Size: Large</option>
          <option value="1.5rem">Size: Extra Large</option>
        </select>

        <div className="flex gap-1 border-l border-gray-200 pl-2">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-2 rounded hover:bg-gray-100 ${
              editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''
            }`}
          >
            <AlignLeft size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-2 rounded hover:bg-gray-100 ${
              editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''
            }`}
          >
            <AlignCenter size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-2 rounded hover:bg-gray-100 ${
              editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''
            }`}
          >
            <AlignRight size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`p-2 rounded hover:bg-gray-100 ${
              editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200' : ''
            }`}
          >
            <AlignJustify size={20} />
          </button>
        </div>

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
        >
          <Bold size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
        >
          <Italic size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
        >
          <List size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
        >
          <ListOrdered size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}
        >
          <Quote size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 rounded hover:bg-gray-100"
        >
          <Undo size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 rounded hover:bg-gray-100"
        >
          <Redo size={20} />
        </button>
        <button
          onClick={setLink}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
        >
          <LinkIcon size={20} />
        </button>
        <button
          onClick={() => setIsImageModalOpen(true)}
          className="p-2 rounded hover:bg-gray-100"
        >
          <ImageIcon size={20} />
        </button>
      </div>

      {/* Word and character count */}
      <div className="border-b border-gray-200 px-4 py-2 text-sm text-gray-500 flex gap-4">
        <span>{getWordCount()} words</span>
        <span>{getCharacterCount()} characters</span>
      </div>

      <ImageUploadModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onImageSelect={addImage}
      />
    </>
  );
};

interface ArticlePath {
  category: string;
  subcategory: string | null;
  slug: string;
}

type Article = Database['public']['Tables']['articles']['Row'];

const saveArticle = async (articleData: Database['public']['Tables']['articles']['Insert']) => {
  const response = await withRetry<Article>(() =>
    new Promise((resolve) => {
      supabase
        .from('articles')
        .insert(articleData)
        .select()
        .single()
        .then(resolve);
    })
  );

  if (response.error) {
    console.error('Error saving article:', response.error);
    throw response.error;
  }

  return response.data as Article;
};

const EditorMenu = () => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [slug, setSlug] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSeoOpen, setIsSeoOpen] = useState(false);
  const [seoMeta, setSeoMeta] = useState({
    title: '',
    description: '',
    keywords: [] as string[],
  });
  const [articlePaths, setArticlePaths] = useState<ArticlePath[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableSubcategories, setAvailableSubcategories] = useState<string[]>([]);
  const [availableSlugs, setAvailableSlugs] = useState<string[]>([]);
  const [isLoadingArticle, setIsLoadingArticle] = useState(false);
  const {userProfile} = useUserProfile()
  
  // Load paths from cookie on mount and fetch fresh data
  useEffect(() => {
    // First try to load from cookie
    const savedPaths = Cookies.get('articlePaths');
    if (savedPaths) {
      try {
        const paths = JSON.parse(savedPaths) as ArticlePath[];
        setArticlePaths(paths);
        
        // Set available options from saved paths
        const categories = [...new Set(paths.map(p => p.category))].sort();
        setAvailableCategories(categories);
      } catch (error) {
        console.error('Error parsing saved paths:', error);
      }
    }
    
    // Then fetch fresh data
    handleLoadPaths();
  }, []);

  const handleLoadPaths = async () => {
    setIsLoading(true);
    try {
      interface ArticleFields {
        category: string;
        subcategory: string | null;
        slug: string;
      }

      const response = await withRetry<ArticleFields[]>(() => 
        new Promise((resolve) => {
          supabase
            .from('articles')
            .select('category, subcategory, slug')
            .then(resolve);
        })
      );

      if (response.error) throw response.error;

      const articles = response.data as ArticleFields[] ?? [];
      const paths: ArticlePath[] = articles.map(article => ({
        category: article.category,
        subcategory: article.subcategory,
        slug: article.slug
      }));
      setArticlePaths(paths);

      // Save to cookie
      Cookies.set('articlePaths', JSON.stringify(paths), { expires: 1 });

      // Extract unique categories
      const categories = [...new Set(paths.map((p: ArticlePath) => p.category))].sort();
      setAvailableCategories(categories);

      // Update subcategories if category is selected
      if (category) {
        const subs = [...new Set(paths
          .filter((p: ArticlePath) => p.category === category)
          .map((p: ArticlePath) => p.subcategory)
          .filter((sub: string | null): sub is string => sub !== null)
        )].sort();
        setAvailableSubcategories(subs);
      }

      // Update slugs if category (and optionally subcategory) is selected
      if (category) {
        const filteredSlugs = paths
          .filter((p: ArticlePath) => p.category === category && 
            (subcategory ? p.subcategory === subcategory : true))
          .map((p: ArticlePath) => p.slug)
          .sort();
        setAvailableSlugs(filteredSlugs);
      }
    } catch (error) {
      console.error('Error loading article paths:', error);
      alert('Failed to load article paths');
    } finally {
      setIsLoading(false);
    }
  };

  // Add effect to update available options when selection changes
  useEffect(() => {
    if (articlePaths.length > 0) {
      if (category) {
        const subs = [...new Set(articlePaths
          .filter(p => p.category === category)
          .map(p => p.subcategory)
          .filter((sub): sub is string => sub !== null)
        )].sort();
        setAvailableSubcategories(subs);

        const slugs = articlePaths
          .filter(p => p.category === category && 
            (subcategory ? p.subcategory === subcategory : true))
          .map(p => p.slug)
          .sort();
        setAvailableSlugs(slugs);
      } else {
        setAvailableSubcategories([]);
        setAvailableSlugs([]);
      }
    }
  }, [category, subcategory, articlePaths]);

  const handleSave = async () => {
    if (!category || !slug) {
      alert('Category and slug are required');
      return;
    }
    
    setIsSaving(true);
    try {
      const articleData:Database['public']['Tables']['articles']['Insert'] = {
        content,
        category,
        subcategory: subcategory || null,
        slug,
        title: seoMeta.title,
        description: seoMeta.description,
        keywords: seoMeta.keywords,
        author_id: userProfile?.id ?? '0', // TODO: Add actual owner_id
        published:false,
        created_at: new Date().toISOString(),
      };
      
      const savedArticle = await saveArticle(articleData);
      console.log('Saved article:', savedArticle);
      
      alert('Draft saved successfully!');
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Failed to save article. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!category || !slug || !content.trim()) {
      alert('Category, slug, and content are required to publish');
      return;
    }

    // Validate SEO fields for publishing
    if (!seoMeta.title || !seoMeta.description) {
      alert('Title and description are required for publishing');
      setIsSeoOpen(true); // Open SEO section to show required fields
      return;
    }
    
    const confirmPublish = window.confirm('Are you sure you want to publish this article? It will be visible to the public.');
    if (!confirmPublish) return;
    
    setIsPublishing(true);
    try {
      const articleData = {
        content,
        category,
        subcategory: subcategory || null,
        slug,
        title: seoMeta.title,
        description: seoMeta.description,
        keywords: seoMeta.keywords,
        status: 'published',
        owner_id: '', // TODO: Add actual owner_id
        published_at: new Date().toISOString(),
      };
      
      const savedArticle = await saveArticle(articleData);
      console.log('Published article:', savedArticle);
      
      alert('Article published successfully!');
    } catch (error) {
      console.error('Error publishing article:', error);
      alert('Failed to publish article. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  const doesCurrentPathExist = () => {
    return articlePaths.some(path => 
      path.category === category && 
      path.slug === slug &&
      (subcategory ? path.subcategory === subcategory : path.subcategory === null)
    );
  };

  const handleLoadArticle = async () => {
    setIsLoadingArticle(true);
    try {
      const response = await withRetry<Article>(() =>
        new Promise((resolve) => {
          supabase
            .from('articles')
            .select('*')
            .eq('category', category)
            .eq('slug', slug)
            .single()
            .then(resolve);
        })
      );

      if (response.error) throw response.error;

      const article = response.data as Article;
      if (article) {
        editor?.commands.setContent(article.content);
        setSeoMeta({
          title: article.title ?? '',
          description: article.description ?? '',
          keywords: article.keywords ?? [],
        });
        setIsSeoOpen(true);
      }
    } catch (error) {
      console.error('Error loading article:', error);
      alert('Failed to load article');
    } finally {
      setIsLoadingArticle(false);
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Image,
      Color.configure({ types: [TextStyle.name] }),
      TextStyle.configure(),
      FontSize,
      ListItem,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'bulletList', 'orderedList'],
        defaultAlignment: 'left',
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Link.configure({
        HTMLAttributes: {
          class: 'text-sky-600 hover:text-sky-500 underline',
        },
      }),
      Placeholder.configure({
        placeholder: 'Write something amazing...',
      }),
    ],
    content: '<p>Hello World! 🌎</p>',
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow mb-4 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Article Details</h2>
            <div className="flex gap-2">
              <button
                onClick={handleLoadPaths}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Reload article paths"
              >
                <RotateCw size={20} className={isLoading ? 'animate-spin' : ''} />
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving || isPublishing}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={20} />
                {isSaving ? 'Saving...' : 'Save Draft'}
              </button>
              <button
                onClick={handlePublish}
                disabled={isSaving || isPublishing}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPublishing ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <div className="flex flex-wrap items-start gap-2">
              <div className="flex flex-col min-w-[150px]">
                <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  id="category"
                  list="category-list"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setSubcategory(''); // Reset subcategory when category changes
                    setSlug(''); // Reset slug when category changes
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                  placeholder="Select or type category"
                />
                <datalist id="category-list">
                  {availableCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </datalist>
              </div>

              <div className="flex items-center self-end h-[42px]">
                <span className="text-gray-500">/</span>
              </div>

              <div className="flex flex-col min-w-[150px]">
                <label htmlFor="subcategory" className="text-sm font-medium text-gray-700 mb-1">
                  Subcategory
                </label>
                <input
                  id="subcategory"
                  list="subcategory-list"
                  value={subcategory}
                  onChange={(e) => {
                    setSubcategory(e.target.value);
                    setSlug(''); // Reset slug when subcategory changes
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Select or type subcategory"
                />
                <datalist id="subcategory-list">
                  {availableSubcategories.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </datalist>
              </div>

              <div className="flex items-center self-end h-[42px]">
                <span className="text-gray-500">/</span>
              </div>

              <div className="flex flex-col flex-1 min-w-[200px]">
                <label htmlFor="slug" className="text-sm font-medium text-gray-700 mb-1">
                  Slug
                </label>
                <div className="flex gap-2">
                  <input
                    id="slug"
                    list="slug-list"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                    placeholder="Select or type slug"
                  />
                  {doesCurrentPathExist() && (
                    <button
                      onClick={handleLoadArticle}
                      disabled={isLoadingArticle}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      title="Load article data"
                    >
                      <ArrowDownToLine size={20} />
                      {isLoadingArticle ? 'Loading...' : 'Get'}
                    </button>
                  )}
                </div>
                <datalist id="slug-list">
                  {availableSlugs.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </datalist>
              </div>
            </div>

            {/* SEO Section */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <button
                onClick={() => setIsSeoOpen(!isSeoOpen)}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
              >
                <span className="text-sm font-medium">SEO Metadata</span>
                {isSeoOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {isSeoOpen && (
                <div className="mt-4 space-y-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title <span className="text-red-500">*</span>
                          <span className="text-xs text-gray-500 ml-1">(required for publishing)</span>
                        </label>
                        <input
                          type="text"
                          value={seoMeta.title}
                          onChange={(e) => setSeoMeta({ ...seoMeta, title: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter title (60 characters max)"
                          maxLength={60}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {seoMeta.title.length}/60 characters
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description <span className="text-red-500">*</span>
                          <span className="text-xs text-gray-500 ml-1">(required for publishing)</span>
                        </label>
                        <textarea
                          value={seoMeta.description}
                          onChange={(e) => setSeoMeta({ ...seoMeta, description: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter description (160 characters max)"
                          maxLength={160}
                          rows={3}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {seoMeta.description.length}/160 characters
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Keywords
                        </label>
                        <input
                          type="text"
                          value={seoMeta.keywords.join(', ')}
                          onChange={(e) => setSeoMeta({ 
                            ...seoMeta, 
                            keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter keywords separated by commas"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow mb-8">
          <MenuBar editor={editor} />
          <div className="p-4">
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Preview</h2>
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorMenu;