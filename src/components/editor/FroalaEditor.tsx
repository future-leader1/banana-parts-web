import 'froala-editor/css/plugins/draggable.min.css';
import 'froala-editor/css/plugins/colors.min.css';
import 'froala-editor/css/plugins/image_manager.min.css';
import 'froala-editor/css/third_party/embedly.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/plugins/char_counter.min.css';
import 'froala-editor/css/plugins/emoticons.min.css';
import 'froala-editor/css/third_party/font_awesome.min.css';
import 'froala-editor/css/plugins/fullscreen.min.css';
import 'froala-editor/css/plugins/table.min.css';
import 'froala-editor/css/plugins/line_breaker.min.css';

import { config } from 'config';
import { CreatePresignedPostDto } from 'generated/api/front';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useFileUpload } from 'src/hooks/FileHook';

const Editor = dynamic(
  async () => {
    const values = await Promise.all([
      import('react-froala-wysiwyg'),
      import('froala-editor/js/plugins/table.min.js' as any),
      import('froala-editor/js/plugins/quote.min.js' as any),
      import('froala-editor/js/plugins/paragraph_style.min.js' as any),
      import('froala-editor/js/plugins/image.min.js' as any),
      import('froala-editor/js/plugins/font_size.min.js' as any),
      import('froala-editor/js/plugins/colors.min.js' as any),
      import('froala-editor/js/plugins/align.min.js' as any),
      import('froala-editor/js/plugins/line_height.min.js' as any),
      import('froala-editor/js/plugins/link.min.js' as any),
      import('froala-editor/js/plugins/emoticons.min.js' as any),
      import('froala-editor/js/plugins/entities.min.js' as any),
      import('froala-editor/js/plugins/lists.min.js' as any),
      import('froala-editor/js/plugins/line_breaker.min.js' as any),
      import('froala-editor/js/plugins/font_family.min.js' as any),
      import('froala-editor/js/plugins/inline_class.min.js' as any),
      import('froala-editor/js/plugins/video.min.js' as any),
    ]);
    return values[0];
  },
  {
    loading: () => <p></p>,
    ssr: false,
  }
);
const FroalaEditorView = dynamic(
  async () => {
    const values = await Promise.all([
      import('react-froala-wysiwyg/FroalaEditorView'),
    ]);
    return values[0];
  },
  {
    loading: () => <p></p>,
    ssr: false,
  }
);
export { FroalaEditorView as EditorView };

type FroalaEditorProps = {
  defaultValue?: string;
  onChange: (model: any) => void;
};

export default function FroalaEditor(props: FroalaEditorProps) {
  const fileUpload = useFileUpload();
  const ref = useRef({ editor: null });
  const [isFroalaInitialized, setIsFroalaInitialized] = useState(false);
  const [editor, setEditor] = useState<any>(undefined);

  const [model, setModel] = useState<string>('');

  const handleModelChange = (changeModel: any) => {
    setModel(changeModel);
    props.onChange(changeModel);
  };

  useEffect(() => {
    props.defaultValue && setModel(props.defaultValue);
  }, [props.defaultValue]);

  useEffect(() => {
    setEditor(ref.current.editor);
    editor && setIsFroalaInitialized(true);
  }, [ref.current]);

  useEffect(() => {
    if (isFroalaInitialized) {
      editor.html.set(model);
    }
  }, [isFroalaInitialized]);

  return (
    <div className="max-h-[450px] min-h-[250px] overflow-y-auto">
      <Editor
        model={model}
        onModelChange={handleModelChange}
        tag="textarea"
        config={{
          key: config.froalaKey,
          imageUpload: true,
          imageDefaultAlign: 'center',
          imageDefaultDisplay: 'block',
          imageMaxSize: 5 * 1024 * 1024,
          imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif'],
          events: {
            'image.beforeUpload': async function (images: File[]) {
              let url = '';
              if (images[0] instanceof Blob) {
                const blob = images[0];
                const fileName = (+new Date()).toString();
                const newFile = new File([images[0]], fileName, {
                  type: blob.type,
                  lastModified: new Date().getTime(),
                });
                url = await fileUpload({
                  file: newFile,
                  fileName,
                  fileCategory: CreatePresignedPostDto.fileCategory.IMAGE,
                });
              }
              if (images[0] instanceof File) {
                url = await fileUpload({
                  file: images[0],
                  fileName: images[0].name,
                  fileCategory: CreatePresignedPostDto.fileCategory.IMAGE,
                });
              }

              if (!url) {
                return false;
              }
              // @ts-ignore
              this.image.insert(
                url,
                null,
                null,
                // @ts-ignore
                this.image.get()
              );
              return false;
            },
          },
          attribution: false,
          placeholderText: 'Start typing...',
          toolbarButtons: {
            moreText: {
              buttons: [
                'bold',
                'italic',
                'underline',
                'strikeThrough',
                'subscript',
                'superscript',
                'fontFamily',
                'fontSize',
                'textColor',
                'backgroundColor',
                'inlineClass',
                'inlineStyle',
                'clearFormatting',
              ],
            },
            moreParagraph: {
              buttons: [
                'alignLeft',
                'alignCenter',
                'alignRight',
                'alignJustify',
                'formatOL',
                'formatUL',
                'paragraphFormat',
                'paragraphStyle',
                'lineHeight',
                'outdent',
                'indent',
                'quote',
              ],
            },
            moreRich: {
              buttons: [
                'insertLink',
                'insertImage',
                'emoticons',
                'insertTable',
                'fontAwesome',
                'specialCharacters',
                'embedly',
                'insertFile',
                'insertHR',
              ],
            },
            moreMisc: {
              buttons: [
                'undo',
                'redo',
                'fullscreen',
                'print',
                'getPDF',
                'spellChecker',
                'selectAll',
                'html',
                'help',
              ],
              align: 'right',
              buttonsVisible: 2,
            },
          },
          pluginsEnabled: [
            'table',
            'quote',
            'paragraphFormat',
            'paragraphStyle',
            'align',
            'link',
            'lists',
            'file',
            'image',
            'emoticons',
            'url',
            'video',
            'embedly',
            'colors',
            'entities',
            'inlineClass',
            'inlineStyle',
            'imageTUI',
          ],
        }}
      />
    </div>
  );
}
