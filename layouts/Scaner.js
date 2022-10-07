import { markdownify } from '@lib/utils/textConverter';
import { MDXRemote } from 'next-mdx-remote';
import { shortcodes } from './shortcodes/all';

import preprocessImage from '../lib/preprocess';

import { useState, useRef, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import { Fragment } from 'react';
import { Menu, Popover, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

const loaderSvg = () => {
  return (
    <svg
      aria-hidden="true"
      role="status"
      className="mr-3 inline h-4 w-4 animate-spin text-white"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="#E5E7EB"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentColor"
      />
    </svg>
  );
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Scaner = ({ data }) => {
  const { frontmatter, mdxContent } = data;
  const { title } = frontmatter;

  const [isFilePicked, setIsFilePicked] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isScanning, setIsScanning] = useState(false);
  const [preview, setPreview] = useState();
  const [ocrTextResult, setText] = useState('');

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

  const onLoadPicture = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const dragHandler = (event) => {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();
  };

  const dragOverHandler = (event) => {
    event.preventDefault();
  };

  const dropHandler = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
      setIsFilePicked(true);
      e.dataTransfer.clearData();
    }
  };

  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const startScan = () => {
    setIsScanning(true);
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
        setIsScanning(false);
      })
      .then((result) => {
        if (result.data && result.data.text) {
          console.log('Extracted image', result);
          setText(result.data.text);
          setIsScanning(false);
        }
      });
  };

  return (
    <>
      <div className="min-h-full">
        <Popover as="header" className="bg-gray-50 pb-24">
          {({ open }) => (
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="hidden border-t border-white border-opacity-20 py-5 lg:block">
                <div className="grid grid-cols-4 items-center gap-8">
                  <div className="col-span-2">
                    <nav className="flex space-x-4">
                      {!selectedFile ? (
                        <div>
                          <label
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                            htmlFor="file_input"
                          >
                            Załaduj Zdjęcie
                          </label>
                          <input
                            className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
                            aria-describedby="file_input_help"
                            id="file_input"
                            type="file"
                            onChange={onLoadPicture}
                            accept=".jpeg,.png"
                          />
                          <p
                            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                            id="file_input_help"
                          >
                            SVG, PNG, JPG or GIF (MAX. 1200x1200px).
                          </p>
                        </div>
                      ) : null}

                      <button
                        disabled={!selectedFile && !isFilePicked}
                        onClick={startScan}
                        className={classNames(
                          'my-auto mr-2 inline-flex h-min items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white  focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ' +
                            (!selectedFile
                              ? 'bg-opacity-50'
                              : 'bg-opacity-100 hover:bg-blue-800')
                        )}
                        type="button"
                        aria-current={'page'}
                      >
                        {isScanning ? loaderSvg() : null}
                        Skanuj
                      </button>
                    </nav>
                  </div>
                  <div></div>
                  {ocrTextResult ? (
                    <div className="lg:col-span-1">
                      <div className="ml-auto w-full max-w-md">
                        <label htmlFor="mobile-search" className="sr-only">
                          Szukaj
                        </label>
                        <div className="relative text-gray-600 focus-within:text-gray-300">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </div>
                          <input
                            id="desktop-search"
                            className="block w-full rounded-md border border-transparent bg-white bg-opacity-100 py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-gray-500 focus:border-transparent focus:bg-opacity-80 focus:placeholder-gray-300 focus:outline-none focus:ring-0 sm:text-sm"
                            placeholder="Szukaj"
                            type="search"
                            name="search"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Popover>
        <main className="-mt-24 pb-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">{title}</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-2">
              {/* Left column */}
              <div className="grid gap-4 lg:col-span-2">
                <section>
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-6">
                      {selectedFile ? (
                        <img
                          src={preview}
                          ref={imageRef}
                          className="App-logo"
                          alt="Preview"
                        />
                      ) : (
                        <div className="flex w-full items-center justify-center">
                          <label
                            htmlFor="dropzone-file"
                            className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                          >
                            <div
                              className="flex flex-col items-center justify-center pt-5 pb-6"
                              onDrop={dropHandler}
                              onDrag={dragHandler}
                              onDragOver={dragOverHandler}
                            >
                              <svg
                                aria-hidden="true"
                                className="mb-3 h-10 w-10 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                ></path>
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Kliknij aby załadować
                                </span>{' '}
                                albo upuść tutaj plik.
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 1200x1200px).
                              </p>
                            </div>
                            <input
                              id="dropzone-file"
                              type="file"
                              className="hidden"
                              onChange={onLoadPicture}
                              accept=".jpeg,.png"
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                  <canvas
                    className="hidden"
                    ref={canvasRef}
                    width={1200}
                    height={1200}
                  ></canvas>
                </section>
              </div>

              {/* Right column */}
              <div className="grid gap-4 lg:col-span-2">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-10">
                    {isScanning ? (
                      <div className="text-center">{loaderSvg()}</div>
                    ) : ocrTextResult ? (
                      ocrTextResult
                    ) : (
                      <div className="content h-52">
                        <MDXRemote {...mdxContent} components={shortcodes} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Scaner;
