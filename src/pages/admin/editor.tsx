/* eslint-disable  */
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Image as TiptapImage } from '@tiptap/extension-image';
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
  Plus,
  Trash2,
  ExternalLink,
  FileText,
  PictureInPicture,
  Copy,
} from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import ImageUploadModal from '~/components/shared/ImageUploadModal';
import { supabase } from '~/utils/supabase';
import { Database } from '~/types/supabase';
import { useUserProfile } from '~/utils/UserProfileContext';
import Cookies from 'js-cookie';
import { withRetry } from '~/utils/retryUtils';
import { LoadingButton } from '~/components/ui/LoadingButton';
import { LoadingOverlay } from '~/components/ui/LoadingOverlay';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { DroppableProvided, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import ScheduleTab from '~/components/admin/ScheduleTab';

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

const initialContent = `
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <p class="text-yellow-700">
          <strong>👋 Welcome to the Demo Article!</strong> This is a placeholder article designed to showcase the editor's capabilities. Feel free to edit or remove this content to start creating your own article.
        </p>
      </div>

      <h1 style="font-size: 2.5rem; text-align: center; color: #1e293b;">Content Creation</h1>
      <p style="text-align: center; color: #64748b; font-size: 1.125rem;">A guide to using our rich text editor</p>

      <h2 style="color: #334155; margin-top: 2rem;">🎨 Styling Capabilities</h2>
      <p>Our editor supports a wide range of styling options. You can make text <strong>bold</strong>, <em>italic</em>, or both <strong><em>bold and italic</em></strong>.</p>
      
      <h3 style="color: #475569;">Text Colors and Highlights</h3>
      <p>You can <span style="color: #ef4444;">color your text</span> or <mark style="background-color: #fef08a;">highlight important information</mark>. Mix and match to <span style="color: #3b82f6;"><mark style="background-color: #e0f2fe;">create engaging content</mark></span>.</p>

      <h3 style="color: #475569;">Lists and Organization</h3>
      <ul>
        <li>Create bulleted lists</li>
        <li>With multiple items</li>
        <li>To organize information</li>
      </ul>

      <ol>
        <li>Numbered lists</li>
        <li>Are great for</li>
        <li>Step-by-step instructions</li>
      </ol>

      <h3 style="color: #475569;">Quotes and Citations</h3>
      <blockquote style="border-left: 4px solid #e2e8f0; padding-left: 1rem; margin: 1.5rem 0; color: #64748b;">
        You can just throw words in to convey Authoritative opinions. 
        <br>- Adrian Hankin
      </blockquote>

      <h2 style="color: #334155; margin-top: 2rem;">🔗 Links and Resources</h2>
      <p>You can add <a href="https://yallburru.org.au" class="text-sky-600 hover:text-sky-500 underline">links to external resources</a> or reference other articles.</p>

      <h2 style="color: #334155; margin-top: 2rem;">📝 Text Alignment</h2>
      <p style="text-align: left;">This text is left-aligned (default)</p>
      <p style="text-align: center;">This text is center-aligned</p>
      <p style="text-align: right;">This text is right-aligned</p>
      <p style="text-align: justify;">This text is justified, which means it will stretch to fill the width of its container while maintaining even spacing between words. Great for long paragraphs of text.</p>

      <h2 style="color: #334155; margin-top: 2rem;">🎯 Best Practices</h2>
      <ul>
        <li>Use headings to structure your content</li>
        <li>Include relevant images and media</li>
        <li>Keep paragraphs concise and readable</li>
        <li>Use formatting to emphasize key points</li>
        <li>Add resources in the sidebar for additional context</li>
      </ul>

      <div style="background-color: #f8fafc; border-radius: 0.5rem; padding: 1.5rem; margin: 2rem 0;">
        <h3 style="color: #475569; margin-top: 0;">💡 Pro Tip</h3>
        <p>You can use the Resources panel on the right to add supplementary materials like external links, images, or HTML content that complements your article.</p>
      </div>
    `

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
        .upsert(articleData)
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

interface Resource {
  type: string;
  title: string;
  html?: string;
  image?: string;
  url?: string;
  description?: string;
  text?: string;
}

const ResourcePanel = ({
  resources,
  onResourcesChange,
}: {
  resources: Resource[];
  onResourcesChange: (resources: Resource[]) => void;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [newResource, setNewResource] = useState<Resource>({
    type: 'link',
    title: '',
  });
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const resourceTypes = [
    { value: 'link', label: 'External Link', icon: <ExternalLink size={16} /> },
    { value: 'html', label: 'HTML Content', icon: <FileText size={16} /> },
    { value: 'image', label: 'Image', icon: <PictureInPicture size={16} /> },
    { value: 'text', label: 'Plain Text', icon: <FileText size={16} /> },
  ];

  const handleMoveResource = (index: number, direction: 'up' | 'down') => {
    if (index < 0 || index >= resources.length) return;
    
    const newResources = [...resources] as Resource[];
    if (direction === 'up' && index > 0) {
      const current = newResources[index];
      const previous = newResources[index - 1];
      if (!current || !previous) return;
      newResources[index] = previous;
      newResources[index - 1] = current;
      onResourcesChange(newResources);
    } else if (direction === 'down' && index < resources.length - 1) {
      const current = newResources[index];
      const next = newResources[index + 1];
      if (!current || !next) return;
      newResources[index] = next;
      newResources[index + 1] = current;
      onResourcesChange(newResources);
    }
  };

  const handleDuplicateResource = (index: number) => {
    if (index < 0 || index >= resources.length) return;
    const resourceToDuplicate = resources[index];
    if (!resourceToDuplicate) return;
    
    const duplicatedResource: Resource = {
      type: resourceToDuplicate.type,
      title: `${resourceToDuplicate.title} (Copy)`,
      description: resourceToDuplicate.description,
      html: resourceToDuplicate.html,
      image: resourceToDuplicate.image,
      url: resourceToDuplicate.url,
      text: resourceToDuplicate.text,
    };
    
    const newResources = [...resources] as Resource[];
    newResources.splice(index + 1, 0, duplicatedResource);
    onResourcesChange(newResources);
  };

  const handleAddResource = () => {
    if (!newResource.title) return;
    
    onResourcesChange([...resources, newResource]);
    setNewResource({ type: 'link', title: '' });
    setIsAdding(false);
  };

  const handleRemoveResource = (index: number) => {
    const newResources = [...resources];
    newResources.splice(index, 1);
    onResourcesChange(newResources);
  };

  const handleStartEdit = (index: number) => {
    const resource = resources[index];
    if (!resource) return;
    
    setEditingIndex(index);
    setNewResource({
      type: resource.type,
      title: resource.title,
      html: resource.html,
      image: resource.image,
      url: resource.url,
      text: resource.text,
      description: resource.description,
    });
  };

  const handleSaveEdit = () => {
    if (editingIndex === null || !newResource.title) return;
    
    const newResources = [...resources];
    newResources[editingIndex] = newResource;
    onResourcesChange(newResources);
    setEditingIndex(null);
    setNewResource({ type: 'link', title: '' });
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setNewResource({ type: 'link', title: '' });
  };

  const ResourceForm = ({ 
    onSave, 
    onCancel,
    initialResource = { type: 'link', title: '' } 
  }: {
    onSave: (resource: Resource) => void;
    onCancel: () => void;
    initialResource: Resource;
  }) => {
    const [formState, setFormState] = useState<Resource>(initialResource);
    const [isValidUrl, setIsValidUrl] = useState(true);
    const [isValidImage, setIsValidImage] = useState(true);
    const [isCheckingImage, setIsCheckingImage] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const validateUrl = (url: string) => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormState(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const url = e.target.value;
      const isValid = validateUrl(url);
      setIsValidUrl(isValid);
      handleChange(e);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formState);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-3 w-full">
        <select
          name="type"
          value={formState.type}
          onChange={handleChange}
          className="w-full p-2 text-sm border rounded"
        >
          {resourceTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formState.title}
          onChange={handleChange}
          className="w-full p-2 text-sm border rounded"
          maxLength={100}
        />

        {formState.type === 'link' && (
          <div>
            <input
              type="url"
              name="url"
              placeholder="URL"
              value={formState.url || ''}
              onChange={handleUrlChange}
              className={`w-full p-2 text-sm border rounded ${!isValidUrl && formState.url ? 'border-red-500' : ''}`}
            />
            {!isValidUrl && formState.url && (
              <p className="text-xs text-red-500 mt-1">Please enter a valid URL</p>
            )}
          </div>
        )}

        {formState.type === 'html' && (
          <textarea
            name="html"
            placeholder="HTML Content"
            value={formState.html || ''}
            onChange={handleChange}
            className="w-full p-2 text-sm border rounded"
            rows={4}
          />
        )}

        {formState.type === 'text' && (
          <textarea
            name="text"
            placeholder="Text content"
            value={formState.text || ''}
            onChange={handleChange}
            className="w-full p-2 text-sm border rounded"
            rows={4}
          />
        )}

        <input
          type="text"
          name="description"
          placeholder="Description (optional)"
          value={formState.description || ''}
          onChange={handleChange}
          className="w-full p-2 text-sm border rounded"
          maxLength={200}
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!formState.title || (formState.type === 'link' && !isValidUrl)}
            className="px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
          >
            {editingIndex !== null ? 'Save Changes' : 'Add Resource'}
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-blue-50/50"
      >
        <span className="text-sm font-medium text-gray-700">Resources</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div className="p-4 border-t border-blue-100 bg-blue-50/50">
          {/* Resource List */}
          <div className="space-y-3 mb-4">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="bg-white rounded"
              >
                {editingIndex === index ? (
                  <ResourceForm
                    onSave={(updatedResource) => {
                      const newResources = [...resources];
                      newResources[index] = updatedResource;
                      onResourcesChange(newResources);
                      setEditingIndex(null);
                    }}
                    onCancel={handleCancelEdit}
                    initialResource={resource}
                  />
                ) : (
                  <div className="flex items-start gap-2 p-2 group">
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveResource(index, 'up')}
                        disabled={index === 0}
                        className={`p-1 rounded-md transition-colors ${
                          index === 0 
                            ? 'text-gray-300 cursor-not-allowed' 
                            : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
                        }`}
                        title="Move up"
                      >
                        <ChevronUp size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveResource(index, 'down')}
                        disabled={index === resources.length - 1}
                        className={`p-1 rounded-md transition-colors ${
                          index === resources.length - 1
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
                        }`}
                        title="Move down"
                      >
                        <ChevronDown size={16} />
                      </button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {resourceTypes.find(t => t.value === resource.type)?.icon}
                        <span className="text-sm font-medium truncate">{resource.title}</span>
                      </div>
                      {resource.description && (
                        <p className="text-xs text-gray-500 truncate mt-1">{resource.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDuplicateResource(index);
                        }}
                        className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
                        title="Duplicate"
                      >
                        <Copy size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleStartEdit(index);
                        }}
                        className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                          <path d="m15 5 4 4"/>
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemoveResource(index);
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add Resource Form */}
          {isAdding ? (
            <ResourceForm
              onSave={(newResource) => {
                onResourcesChange([...resources, newResource]);
                setIsAdding(false);
              }}
              onCancel={() => {
                setIsAdding(false);
              }}
              initialResource={{ type: 'link', title: '' }}
            />
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="w-full flex items-center justify-center gap-2 p-2 text-sm text-gray-600 hover:text-gray-800 border border-dashed border-gray-300 rounded hover:border-gray-400"
            >
              <Plus size={16} />
              Add Resource
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const ResourcePreview = ({ resource }: { resource: Resource }) => {
  switch (resource.type) {
    case 'link':
      return (
        <a 
          href={resource.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <ExternalLink size={16} className="text-blue-500" />
            <span className="text-sm font-medium text-blue-500">{resource.title}</span>
          </div>
          {resource.description && (
            <p className="text-xs text-gray-500 mt-1">{resource.description}</p>
          )}
        </a>
      );
    
    case 'text':
      return (
        <div className="p-3 bg-white rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FileText size={16} className="text-gray-500" />
            <span className="text-sm font-medium">{resource.title}</span>
          </div>
          <div className="text-sm text-gray-600 whitespace-pre-wrap">{resource.text}</div>
          {resource.description && (
            <p className="text-xs text-gray-500 mt-2">{resource.description}</p>
          )}
        </div>
      );
    
    case 'html':
      return (
        <div className="p-3 bg-white rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FileText size={16} className="text-gray-500" />
            <span className="text-sm font-medium">{resource.title}</span>
          </div>
          <div 
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: resource.html || '' }}
          />
          {resource.description && (
            <p className="text-xs text-gray-500 mt-2">{resource.description}</p>
          )}
        </div>
      );
    
    case 'image':
      return (
        <div className="p-3 bg-white rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <PictureInPicture size={16} className="text-gray-500" />
            <span className="text-sm font-medium">{resource.title}</span>
          </div>
          {resource.image && (
            <img 
              src={resource.image} 
              alt={resource.title}
              className="w-full h-auto rounded-md"
            />
          )}
          {resource.description && (
            <p className="text-xs text-gray-500 mt-2">{resource.description}</p>
          )}
        </div>
      );
    
    default:
      return null;
  }
};

const SEO_LIMITS = {
  title: { min: 30, max: 60, recommended: 50 },
  description: { min: 120, max: 160, recommended: 150 },
  keywords: { min: 3, max: 10 }
};

const EditorMenu = () => {
  const [view, setView] = useState<'editor' | 'seo' | 'schedule'>('editor');
  const [content, setContent] = useState(initialContent);
  const [id, setId] = useState<undefined|number>(undefined);
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [slug, setSlug] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSeoOpen, setIsSeoOpen] = useState(false);
  const [isScoreBreakdownOpen, setIsScoreBreakdownOpen] = useState(false);
  const [isSocialPreviewOpen, setIsSocialPreviewOpen] = useState(false);
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
  const {userProfile} = useUserProfile();
  const [resources, setResources] = useState<Resource[]>([
    {
      type: 'link',
      title: 'Editor Documentation',
      url: 'https://tiptap.dev/docs',
      description: 'Official TipTap editor documentation'
    },
    {
      type: 'text',
      title: 'Did you know?',
      text: 'The editor supports markdown shortcuts! Try typing "# " for a heading, ">" for a quote, or "- " for a bullet point. These shortcuts automatically chance your text when you press space!',
      description: 'Quick tip about markdown shortcuts'
    },
    {
      type: 'html',
      title: 'html Formatting Example',
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif;">
          <p style="background-color: #f0fdf4; color: #166534; padding: 0.75rem; border-radius: 0.5rem; margin-bottom: 0.5rem;">
            This is text with a green background and matching text color.
          </p>
          <p style="background-color: #eff6ff; color: #1e40af; padding: 0.75rem; border-radius: 0.5rem; margin-bottom: 0.5rem;">
            You can use different background colors to highlight important information.
          </p>
          <p style="background-color: #fef2f2; color: #991b1b; padding: 0.75rem; border-radius: 0.5rem;">
            Perfect for warnings, notes, or any content you want to emphasize!
          </p>
        </div>`,
      description: 'Example of styled text blocks using html code'
    },
    {
      type: 'image',
      title: 'Websites Logo',
      image: '/Logo.svg',
      description: 'Websites Logo'
    }
  ]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [seoScores, setSeoScores] = useState({
    title: 0,
    description: 0,
    keywords: 0,
    overall: 0
  });
  
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

      const { data: paths, error } = await supabase
        .from('articles')
        .select('category, subcategory, slug')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedPaths = (paths as ArticleFields[]).map(p => ({
        category: p.category,
        subcategory: p.subcategory,
        slug: p.slug,
      }));

      setArticlePaths(formattedPaths);
      
      // Save to cookie for faster initial load
      Cookies.set('articlePaths', JSON.stringify(formattedPaths), { expires: 1 }); // 1 day
      
      // Update available options
      const categories = [...new Set(formattedPaths.map(p => p.category))].sort();
      setAvailableCategories(categories);
      
      if (category) {
        const subcategories = [...new Set(
          formattedPaths
            .filter(p => p.category === category)
            .map(p => p.subcategory)
            .filter((sub): sub is string => sub !== null)
        )].sort();
        setAvailableSubcategories(subcategories);
        
        if (subcategory) {
          const slugs = formattedPaths
            .filter(p => p.category === category && p.subcategory === subcategory)
            .map(p => p.slug);
          setAvailableSlugs(slugs);
        }
      }
    } catch (error) {
      console.error('Error loading paths:', error);
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

  // Add beforeunload event listener
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Autosave functionality
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const performAutosave = async () => {
      if (!hasUnsavedChanges || !category || !slug) return;

      try {
        await handleSave();
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
      } catch (error) {
        console.error('Autosave failed:', error);
      }
    };

    if (hasUnsavedChanges) {
      timeoutId = setTimeout(performAutosave, 30000); // Autosave after 30 seconds of no changes
    }

    return () => clearTimeout(timeoutId);
  }, [hasUnsavedChanges, content, category, slug, resources]);

  // Update hasUnsavedChanges when content changes
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [content, category, subcategory, slug, seoMeta, resources]);

  // Add slug validation
  const validateSlug = (newSlug: string) => {
    if (!newSlug) {
      setSlugError(null);
      return;
    }

    const existingArticle = articlePaths.find(
      path => path.slug === newSlug && 
             path.category === category && 
             path.subcategory === subcategory
    );

    if (existingArticle) {
      setSlugError('An article with this slug already exists in this category/subcategory');
    } else {
      setSlugError(null);
    }
  };

  // Update slug validation when dependencies change
  useEffect(() => {
    validateSlug(slug);
  }, [slug, category, subcategory, articlePaths]);

  // Calculate SEO scores
  const calculateSeoScores = useCallback(() => {
    const scores = {
      title: 0,
      description: 0,
      keywords: 0,
      overall: 0
    };

    // Title score
    const titleLength = seoMeta.title.length;
    if (titleLength >= SEO_LIMITS.title.min && titleLength <= SEO_LIMITS.title.max) {
      scores.title = titleLength === SEO_LIMITS.title.recommended ? 100 : 80;
    } else {
      scores.title = 40;
    }

    // Description score
    const descLength = seoMeta.description?.length || 0;
    if (descLength >= SEO_LIMITS.description.min && descLength <= SEO_LIMITS.description.max) {
      scores.description = descLength === SEO_LIMITS.description.recommended ? 100 : 80;
    } else {
      scores.description = 40;
    }

    // Keywords score
    const keywordCount = seoMeta.keywords.length;
    if (keywordCount >= SEO_LIMITS.keywords.min && keywordCount <= SEO_LIMITS.keywords.max) {
      scores.keywords = 100;
    } else if (keywordCount > 0) {
      scores.keywords = 60;
    }

    // Calculate overall score
    scores.overall = Math.round((scores.title + scores.description + scores.keywords) / 3);

    setSeoScores(scores);
  }, [seoMeta]);

  // Update SEO scores when metadata changes
  useEffect(() => {
    calculateSeoScores();
  }, [seoMeta, calculateSeoScores]);

  const handleSave = async () => {
    if (!category || !slug) {
      alert('Category and slug are required');
      return;
    }
    
    setIsSaving(true);
    try {
      const articleData:Database['public']['Tables']['articles']['Insert'] = {
        id: id,
        content,
        category,
        subcategory: subcategory || null,
        slug,
        title: seoMeta.title,
        description: seoMeta.description,
        keywords: seoMeta.keywords,
        resources: resources,
        author_id: userProfile?.id ?? '0',
        published:false,
        created_at: new Date().toISOString(),
      };
      
      const savedArticle = await saveArticle(articleData);
      console.log('Saved article:', savedArticle);
      
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
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
      setIsSeoOpen(true); // Open SEO section to show required fields
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
        id: id,
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
        setResources(article.resources ?? []);
        setId(article.id);
        setIsSeoOpen(true);
      }
    } catch (error) {
      console.error('Error loading article:', error);
      alert('Failed to load article');
    } finally {
      setIsLoadingArticle(false);
    }
  };

  const handleClear = () => {
    const confirmClear = window.confirm('Are you sure you want to clear all content? This cannot be undone.');
    if (!confirmClear) return;

    editor?.commands.clearContent();
    setCategory('');
    setSubcategory('');
    setSlug('');
    setSeoMeta({
      title: '',
      description: '',
      keywords: [],
    });
    setResources([]);
    setId(undefined);
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
      TiptapImage.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
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
    content: initialContent,
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
    <div className="flex flex-col h-full">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setView('editor')}
          className={`px-4 py-2 rounded-lg ${
            view === 'editor'
              ? 'bg-sky-100 text-sky-600'
              : 'hover:bg-gray-100'
          }`}
        >
          Editor
        </button>
        <button
          onClick={() => setView('seo')}
          className={`px-4 py-2 rounded-lg ${
            view === 'seo'
              ? 'bg-sky-100 text-sky-600'
              : 'hover:bg-gray-100'
          }`}
        >
          SEO
        </button>
        <button
          onClick={() => setView('schedule')}
          className={`px-4 py-2 rounded-lg ${
            view === 'schedule'
              ? 'bg-sky-100 text-sky-600'
              : 'hover:bg-gray-100'
          }`}
        >
          Schedule
        </button>
      </div>

      {view === 'editor' && (
        <div className="relative">
          {isLoadingArticle && (
            <LoadingOverlay
              isLoading={true}
              text="Loading article..."
              className="rounded-lg"
            />
          )}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-4">
              <LoadingButton
                onClick={handleSave}
                isLoading={isSaving}
                loadingText="Saving..."
                variant="outline"
                className="md:flex hidden items-center gap-2"
              >
                <Save size={20} />
                Save Draft
              </LoadingButton>
              <LoadingButton
                onClick={handlePublish}
                isLoading={isPublishing}
                loadingText="Publishing..."
                className="md:flex hidden items-center gap-2"
              >
                <ArrowDownToLine size={20} />
                Publish
              </LoadingButton>
              {/* Mobile Save/Publish Icons */}
              <div className="flex md:hidden items-center gap-2">
                <button
                  onClick={handleSave}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  aria-label="Save Draft"
                >
                  <Save size={20} />
                </button>
                <button
                  onClick={handlePublish}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  aria-label="Publish"
                >
                  <ArrowDownToLine size={20} />
                </button>
              </div>
              {lastSaved && (
                <span className="text-sm text-gray-500 hidden md:inline">
                  Last saved: {new Intl.RelativeTimeFormat().format(
                    Math.round((lastSaved.getTime() - Date.now()) / 1000 / 60),
                    'minute'
                  )}
                </span>
              )}
              {hasUnsavedChanges && (
                <span className="text-sm text-yellow-600 hidden md:inline">
                  ● Unsaved changes
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <LoadingButton
                onClick={handleLoadPaths}
                isLoading={isLoading}
                loadingText="Refreshing..."
                variant="ghost"
                size="sm"
                className="hidden md:inline-flex"
              >
                <RotateCw size={16} />
              </LoadingButton>
            
              <button
                onClick={handleClear}
                className="md:flex hidden items-center gap-2 p-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
              >
                <X size={16} />
                Clear
              </button>
              {/* Mobile Clear Icon */}
              <button
                onClick={handleClear}
                className="flex md:hidden p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                aria-label="Clear"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
          
          <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-[1400px] mx-auto">
              <div className="bg-white rounded-lg shadow mb-4 p-4">
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
                        Slug <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <input
                            id="slug"
                            list="slug-list"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                              slugError ? 'border-red-500' : 'border-gray-300'
                            }`}
                            required
                            placeholder="Select or type slug"
                          />
                          {slugError && (
                            <p className="text-xs text-red-500 mt-1">{slugError}</p>
                          )}
                        </div>
                        {doesCurrentPathExist() && (
                          <LoadingButton
                            onClick={handleLoadArticle}
                            isLoading={isLoadingArticle}
                            variant="outline"
                            className="px-3 py-2"
                            loadingText="Loading..."
                          >
                            <ArrowDownToLine size={20} />
                            Get
                          </LoadingButton>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SEO Section */}
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <button
                      onClick={() => setIsSeoOpen(!isSeoOpen)}
                      className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
                    >
                      <span className="text-sm font-medium">SEO Metadata</span>
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${
                          seoScores.overall >= 80 ? 'bg-green-500' :
                          seoScores.overall >= 60 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`} />
                        <span className="text-sm text-gray-500">{seoScores.overall}%</span>
                      </div>
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
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                  seoMeta.title.length > SEO_LIMITS.title.max ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter title"
                              />
                              <div className="flex justify-between mt-1">
                                <p className={`text-xs ${
                                  seoMeta.title.length > SEO_LIMITS.title.max ? 'text-red-500' :
                                  seoMeta.title.length < SEO_LIMITS.title.min ? 'text-yellow-500' :
                                  'text-green-500'
                                }`}>
                                  {seoMeta.title.length}/{SEO_LIMITS.title.max} characters
                                </p>
                                <p className="text-xs text-gray-500">
                                  Recommended: {SEO_LIMITS.title.min}-{SEO_LIMITS.title.max} characters
                                </p>
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description <span className="text-red-500">*</span>
                                <span className="text-xs text-gray-500 ml-1">(required for publishing)</span>
                              </label>
                              <textarea
                                value={seoMeta.description}
                                onChange={(e) => setSeoMeta({ ...seoMeta, description: e.target.value })}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                  seoMeta.description.length > SEO_LIMITS.description.max ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter description"
                                rows={3}
                              />
                              <div className="flex justify-between mt-1">
                                <p className={`text-xs ${
                                  seoMeta.description.length > SEO_LIMITS.description.max ? 'text-red-500' :
                                  seoMeta.description.length < SEO_LIMITS.description.min ? 'text-yellow-500' :
                                  'text-green-500'
                                }`}>
                                  {seoMeta.description.length}/{SEO_LIMITS.description.max} characters
                                </p>
                                <p className="text-xs text-gray-500">
                                  Recommended: {SEO_LIMITS.description.min}-{SEO_LIMITS.description.max} characters
                                </p>
                              </div>
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
                              <div className="flex justify-between mt-1">
                                <p className={`text-xs ${
                                  seoMeta.keywords.length > SEO_LIMITS.keywords.max ? 'text-red-500' :
                                  seoMeta.keywords.length < SEO_LIMITS.keywords.min ? 'text-yellow-500' :
                                  'text-green-500'
                                }`}>
                                  {seoMeta.keywords.length} keywords
                                </p>
                                <p className="text-xs text-gray-500">
                                  Recommended: {SEO_LIMITS.keywords.min}-{SEO_LIMITS.keywords.max} keywords
                                </p>
                              </div>
                            </div>

                            {/* Score Breakdown Dropdown */}
                            <div className="bg-gray-50 rounded-lg">
                              <button
                                onClick={() => setIsScoreBreakdownOpen(!isScoreBreakdownOpen)}
                                className="w-full flex items-center justify-between p-4 hover:bg-gray-100 rounded-lg transition-colors"
                              >
                                <span className="text-sm font-medium text-gray-700">SEO Score Breakdown</span>
                                <div className="flex items-center gap-2">
                                  <div className={`h-2 w-2 rounded-full ${
                                    seoScores.overall >= 80 ? 'bg-green-500' :
                                    seoScores.overall >= 60 ? 'bg-yellow-500' :
                                    'bg-red-500'
                                  }`} />
                                  <span className="text-sm text-gray-500">{seoScores.overall}%</span>
                                </div>
                              </button>
                              
                              {isScoreBreakdownOpen && (
                                <div className="p-4 space-y-2 border-t border-gray-200">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Title</span>
                                    <div className="flex items-center gap-2">
                                      <div className={`h-2 w-2 rounded-full ${
                                        seoScores.title >= 80 ? 'bg-green-500' :
                                        seoScores.title >= 60 ? 'bg-yellow-500' :
                                        'bg-red-500'
                                      }`} />
                                      <span className="text-sm text-gray-500">{seoScores.title}%</span>
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Description</span>
                                    <div className="flex items-center gap-2">
                                      <div className={`h-2 w-2 rounded-full ${
                                        seoScores.description >= 80 ? 'bg-green-500' :
                                        seoScores.description >= 60 ? 'bg-yellow-500' :
                                        'bg-red-500'
                                      }`} />
                                      <span className="text-sm text-gray-500">{seoScores.description}%</span>
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Keywords</span>
                                    <div className="flex items-center gap-2">
                                      <div className={`h-2 w-2 rounded-full ${
                                        seoScores.keywords >= 80 ? 'bg-green-500' :
                                        seoScores.keywords >= 60 ? 'bg-yellow-500' :
                                        'bg-red-500'
                                      }`} />
                                      <span className="text-sm text-gray-500">{seoScores.keywords}%</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Social Media Preview Dropdown */}
                            <div className="bg-gray-50 rounded-lg">
                              <button
                                onClick={() => setIsSocialPreviewOpen(!isSocialPreviewOpen)}
                                className="w-full flex items-center justify-between p-4 hover:bg-gray-100 rounded-lg transition-colors"
                              >
                                <span className="text-sm font-medium text-gray-700">Social Media Preview</span>
                                {isSocialPreviewOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </button>
                              
                              {isSocialPreviewOpen && (
                                <div className="p-4 space-y-6 border-t border-gray-200">
                                  {/* Google Preview */}
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Google Search Result</h4>
                                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden p-4">
                                      <div className="text-[#1a0dab] text-xl mb-1 hover:underline cursor-pointer line-clamp-1">
                                        {seoMeta.title || 'Your title will appear here'}
                                      </div>
                                      <div className="text-[#006621] text-[14px] mb-1">
                                        yallburru.com.au › {category} {subcategory ? ` › ${subcategory}` : ''} › {slug}
                                      </div>
                                      <div className="text-[#545454] text-[14px] line-clamp-2">
                                        {seoMeta.description || 'Your description will appear here'}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Social Media Previews Grid */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Facebook Preview */}
                                    <div>
                                      <h4 className="text-sm font-medium text-gray-700 mb-2">Facebook</h4>
                                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden" style={{ maxWidth: '500px' }}>
                                        <div className="aspect-[1.91/1] bg-gray-100 flex items-center justify-center">
                                          <span className="text-sm text-gray-500">1200 x 630px</span>
                                        </div>
                                        <div className="p-3">
                                          <div className="text-[13px] text-[#385898] uppercase tracking-wide font-medium mb-1">yallburru.com.au</div>
                                          <div className="text-[16px] font-bold text-[#1c1e21] mb-2 line-clamp-2">
                                            {seoMeta.title || 'Your title will appear here'}
                                          </div>
                                          <div className="text-[14px] text-[#606770] line-clamp-3">
                                            {seoMeta.description || 'Your description will appear here'}
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Twitter Preview */}
                                    <div>
                                      <h4 className="text-sm font-medium text-gray-700 mb-2">Twitter</h4>
                                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden" style={{ maxWidth: '440px' }}>
                                        <div className="aspect-[2/1] bg-gray-100 flex items-center justify-center">
                                          <span className="text-sm text-gray-500">800 x 418px</span>
                                        </div>
                                        <div className="p-3">
                                          <div className="text-[15px] font-bold text-[#0f1419] mb-1 line-clamp-2">
                                            {seoMeta.title || 'Your title will appear here'}
                                          </div>
                                          <div className="text-[13px] text-[#536471] mb-2 line-clamp-2">
                                            {seoMeta.description || 'Your description will appear here'}
                                          </div>
                                          <div className="text-[13px] text-[#536471] flex items-center gap-1">
                                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true"><g><path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S13.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"></path></g></svg>
                                            yallburru.com.au
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Editor and Resources Section */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-4 mb-8">
                <div className="bg-white rounded-lg shadow">
                  <MenuBar editor={editor} />
                  <div className="p-4">
                    <EditorContent editor={editor} />
                  </div>
                </div>

                {/* Resources Panel */}
                <div className="space-y-4">
                  <ResourcePanel
                    resources={resources}
                    onResourcesChange={setResources}
                  />
                </div>
              </div>

              {/* Preview Section */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-4">
                {/* Article Preview */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4">Content Preview</h2>
                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </div>

                {/* Resources Preview */}
                <div className="space-y-4">
                  <div className="bg-white rounded-lg shadow">
                    <div className="p-4 border-b border-gray-100">
                      <h2 className="text-lg font-semibold">Resources Preview</h2>
                    </div>
                    <div className="p-4 space-y-3">
                      {resources.length === 0 ? (
                        <p className="text-sm text-gray-500 text-center">No resources added yet</p>
                      ) : (
                        resources.map((resource, index) => (
                          <ResourcePreview key={index} resource={resource} />
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
       )}

      {view === 'seo' && (
        <div className="p-4 border-t border-gray-200 pt-4 mt-4">
          <button
            onClick={() => setIsSeoOpen(!isSeoOpen)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <span className="text-sm font-medium">SEO Metadata</span>
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${
                seoScores.overall >= 80 ? 'bg-green-500' :
                seoScores.overall >= 60 ? 'bg-yellow-500' :
                'bg-red-500'
              }`} />
              <span className="text-sm text-gray-500">{seoScores.overall}%</span>
            </div>
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
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        seoMeta.title.length > SEO_LIMITS.title.max ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter title"
                    />
                    <div className="flex justify-between mt-1">
                      <p className={`text-xs ${
                        seoMeta.title.length > SEO_LIMITS.title.max ? 'text-red-500' :
                        seoMeta.title.length < SEO_LIMITS.title.min ? 'text-yellow-500' :
                        'text-green-500'
                      }`}>
                        {seoMeta.title.length}/{SEO_LIMITS.title.max} characters
                      </p>
                      <p className="text-xs text-gray-500">
                        Recommended: {SEO_LIMITS.title.min}-{SEO_LIMITS.title.max} characters
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-red-500">*</span>
                      <span className="text-xs text-gray-500 ml-1">(required for publishing)</span>
                    </label>
                    <textarea
                      value={seoMeta.description}
                      onChange={(e) => setSeoMeta({ ...seoMeta, description: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        seoMeta.description.length > SEO_LIMITS.description.max ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter description"
                      rows={3}
                    />
                    <div className="flex justify-between mt-1">
                      <p className={`text-xs ${
                        seoMeta.description.length > SEO_LIMITS.description.max ? 'text-red-500' :
                        seoMeta.description.length < SEO_LIMITS.description.min ? 'text-yellow-500' :
                        'text-green-500'
                      }`}>
                        {seoMeta.description.length}/{SEO_LIMITS.description.max} characters
                      </p>
                      <p className="text-xs text-gray-500">
                        Recommended: {SEO_LIMITS.description.min}-{SEO_LIMITS.description.max} characters
                      </p>
                    </div>
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
                    <div className="flex justify-between mt-1">
                      <p className={`text-xs ${
                        seoMeta.keywords.length > SEO_LIMITS.keywords.max ? 'text-red-500' :
                        seoMeta.keywords.length < SEO_LIMITS.keywords.min ? 'text-yellow-500' :
                        'text-green-500'
                      }`}>
                        {seoMeta.keywords.length} keywords
                      </p>
                      <p className="text-xs text-gray-500">
                        Recommended: {SEO_LIMITS.keywords.min}-{SEO_LIMITS.keywords.max} keywords
                      </p>
                    </div>
                  </div>

                  {/* Score Breakdown Dropdown */}
                  <div className="bg-gray-50 rounded-lg">
                    <button
                      onClick={() => setIsScoreBreakdownOpen(!isScoreBreakdownOpen)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-700">SEO Score Breakdown</span>
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${
                          seoScores.overall >= 80 ? 'bg-green-500' :
                          seoScores.overall >= 60 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`} />
                        <span className="text-sm text-gray-500">{seoScores.overall}%</span>
                      </div>
                    </button>
                    
                    {isScoreBreakdownOpen && (
                      <div className="p-4 space-y-2 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Title</span>
                          <div className="flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full ${
                              seoScores.title >= 80 ? 'bg-green-500' :
                              seoScores.title >= 60 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`} />
                            <span className="text-sm text-gray-500">{seoScores.title}%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Description</span>
                          <div className="flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full ${
                              seoScores.description >= 80 ? 'bg-green-500' :
                              seoScores.description >= 60 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`} />
                            <span className="text-sm text-gray-500">{seoScores.description}%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Keywords</span>
                          <div className="flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full ${
                              seoScores.keywords >= 80 ? 'bg-green-500' :
                              seoScores.keywords >= 60 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`} />
                            <span className="text-sm text-gray-500">{seoScores.keywords}%</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Social Media Preview Dropdown */}
                  <div className="bg-gray-50 rounded-lg">
                    <button
                      onClick={() => setIsSocialPreviewOpen(!isSocialPreviewOpen)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-700">Social Media Preview</span>
                      {isSocialPreviewOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    
                    {isSocialPreviewOpen && (
                      <div className="p-4 space-y-6 border-t border-gray-200">
                        {/* Google Preview */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Google Search Result</h4>
                          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden p-4">
                            <div className="text-[#1a0dab] text-xl mb-1 hover:underline cursor-pointer line-clamp-1">
                              {seoMeta.title || 'Your title will appear here'}
                            </div>
                            <div className="text-[#006621] text-[14px] mb-1">
                              yallburru.com.au › {category} {subcategory ? ` › ${subcategory}` : ''} › {slug}
                            </div>
                            <div className="text-[#545454] text-[14px] line-clamp-2">
                              {seoMeta.description || 'Your description will appear here'}
                            </div>
                          </div>
                        </div>

                        {/* Social Media Previews Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Facebook Preview */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Facebook</h4>
                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden" style={{ maxWidth: '500px' }}>
                              <div className="aspect-[1.91/1] bg-gray-100 flex items-center justify-center">
                                <span className="text-sm text-gray-500">1200 x 630px</span>
                              </div>
                              <div className="p-3">
                                <div className="text-[13px] text-[#385898] uppercase tracking-wide font-medium mb-1">yallburru.com.au</div>
                                <div className="text-[16px] font-bold text-[#1c1e21] mb-2 line-clamp-2">
                                  {seoMeta.title || 'Your title will appear here'}
                                </div>
                                <div className="text-[14px] text-[#606770] line-clamp-3">
                                  {seoMeta.description || 'Your description will appear here'}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Twitter Preview */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Twitter</h4>
                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden" style={{ maxWidth: '440px' }}>
                              <div className="aspect-[2/1] bg-gray-100 flex items-center justify-center">
                                <span className="text-sm text-gray-500">800 x 418px</span>
                              </div>
                              <div className="p-3">
                                <div className="text-[15px] font-bold text-[#0f1419] mb-1 line-clamp-2">
                                  {seoMeta.title || 'Your title will appear here'}
                                </div>
                                <div className="text-[13px] text-[#536471] mb-2 line-clamp-2">
                                  {seoMeta.description || 'Your description will appear here'}
                                </div>
                                <div className="text-[13px] text-[#536471] flex items-center gap-1">
                                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true"><g><path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S13.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"></path></g></svg>
                                  yallburru.com.au
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {view === 'schedule' && (
        <div className="flex-1">
          <ScheduleTab />
        </div>
      )}
    </div>
  );
};

export default EditorMenu;