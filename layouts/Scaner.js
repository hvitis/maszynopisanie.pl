import { markdownify } from '@lib/utils/textConverter';
import { MDXRemote } from 'next-mdx-remote';
import { shortcodes } from './shortcodes/all';

import preprocessImage from '../lib/preprocess';

import { useState, useRef, useEffect } from 'react';
import Tesseract from 'tesseract.js';

const Default = ({ data }) => {
  const { frontmatter, mdxContent } = data;
  const { title } = frontmatter;

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const handleClick = () => {
    console.log(imageRef);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(imageRef.current, 0, 0);
    ctx.putImageData(preprocessImage(canvas), 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg');

    Tesseract.recognize(dataUrl, 'eng', {
      logger: (m) => console.log(m),
    })
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        // Get text
        if (result.data && result.data.text) {
          console.log('Extracted image', result);
          setText(result.data.text);
        }
      });
  };

  const [text, setText] = useState('');

  return (
    <section className="section">
      <div className="container">
        {markdownify(title, 'h1', 'h2 mb-8 text-center')}
        <div className="content">
          <MDXRemote {...mdxContent} components={shortcodes} />
        </div>
        <div className="App">
          <main className="App-main">
            <h3>Actual image uploaded</h3>
            <img src={preview} ref={imageRef} className="App-logo" alt="logo" />
            {text}
            <h3>Extracted text</h3>
            <div className="text-box">
              <h3>Canvas</h3>
              <canvas
                className="hidden"
                ref={canvasRef}
                width={700}
                height={250}
              ></canvas>
            </div>
            <input type="file" onChange={onSelectFile} />
            <button onClick={handleClick} style={{ height: 50 }}>
              {' '}
              convert to text
            </button>
          </main>
        </div>
      </div>
    </section>
  );
};

export default Default;

// {selectedFile && <img src={preview} />}
