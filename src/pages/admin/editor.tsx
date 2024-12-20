/* eslint-disable  */
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
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
} from 'lucide-react';
import { useState } from 'react';

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('Enter the URL of the image:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const url = window.prompt('Enter the URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="border-b border-gray-200 p-4 flex flex-wrap gap-2">
      <select
        className="p-2 rounded border"
        onChange={(event) => editor.chain().focus().setColor(event.target.value).run()}
      >
        <option value="#000000">Default</option>
        <option value="#958DF1">Purple</option>
        <option value="#F98181">Red</option>
        <option value="#FBBC88">Orange</option>
        <option value="#FAF594">Yellow</option>
        <option value="#70CFF8">Blue</option>
        <option value="#94FADB">Teal</option>
        <option value="#B9F18D">Green</option>
      </select>

      <select
        className="p-2 rounded border"
        onChange={(event) => {
          const size = event.target.value;
          editor.chain().focus().setFontSize(size).run();
          console.log(event.target.value);
        }}
      >
        <option value="normal">Normal</option>
        <option value="12px">Small</option>
        <option value="16px">Medium</option>
        <option value="20px">Large</option>
        <option value="24px">Extra Large</option>
      </select>

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
        onClick={addImage}
        className="p-2 rounded hover:bg-gray-100"
      >
        <ImageIcon size={20} />
      </button>
    </div>
  );
};

const EditorMenu = () => {
  const [content, setContent] = useState('');
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Color.configure({ types: [TextStyle.name] }),
      TextStyle,//.configure({ types: [TextStyle.name] }),
      ListItem,
      Link,
      Placeholder.configure({
        placeholder: 'Write something amazing...',
      }),
    ],
    content: '<p>Hello World! 🌎</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
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
          <p className="text-gray-600 italic">Editor still in the development stage, some buttons dont work yet, feel free to play around if you want</p>
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
            className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorMenu;