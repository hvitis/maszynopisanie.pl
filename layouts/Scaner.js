import { useState, useRef, useEffect } from 'react';
import { Popover } from '@headlessui/react';

// Project extensions
import preprocessImage from '../lib/preprocess';
import LanguageToggler from './components/LanguageToggler';

// Icons
import {
  ClipboardDocumentListIcon,
  ClipboardDocumentCheckIcon,
  CloudArrowUpIcon,
} from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import Loader from '../public/assets/svg/loader.svg';

// 3rd party lib
import Tesseract from 'tesseract.js';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Scaner = ({ data }) => {
  const { frontmatter, mdxContent } = data;
  const { title } = frontmatter;

  const [isFilePicked, setIsFilePicked] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState();
  const [ocrTextResult, setText] = useState('');
  const [languageSelected, setLanguage] = useState('pol');
  const [isCopied, setIsCopied] = useState(false);

  const handleLanguageToggle = (langCode) => {
    console.log(langCode);
    setLanguage(langCode);
  };

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

  const onCopyToClipboard = (event) => {
    navigator.clipboard.writeText(ocrTextResult);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 800);
  };

  const resetFiles = (event) => {
    setIsFilePicked(false);
    setSelectedFile();
    setIsScanning(false);
    setPreview();
    setText('');
    setProgress(0);
    setIsCopied(false);
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

    Tesseract.recognize(dataUrl, languageSelected, {
      logger: (msg) => {
        if (msg.progress !== 1 && msg.progress !== 0.5) {
          let percentageOfScanning = (msg.progress * 100).toFixed(0) + '%';
          setProgress(percentageOfScanning);
        }
      },
    })
      .catch((err) => {
        setIsScanning(false);
        setProgress(0);
      })
      .then((result) => {
        if (result.data && result.data.text) {
          setText(result.data.text);
          setIsScanning(false);
        }
      });
  };

  let translatedStatic = {
    pol: [
      'Kliknij aby załadować',
      'albo upuść tutaj plik.',
      'PNG, JPG, JPEG lub WEBP (max. 1200x1200px).',
      'Szukaj',
      'Skanuj',
      'Wyczyść',
      'Załaduj Zdjęcie',
      'Załaduj zdjęcie i kliknij przycisk Skanuj',
      'Skanowanie maszynopisów nigdy nie było łatwiejsze',
      'Skopiuj do Schowka',
    ],
    eng: [
      'Click to load',
      'or drop the file here.',
      'PNG, JPG, JPEG or WEBP (max. 1200x1200px).',
      'Search',
      'Scan',
      'Reset',
      'Load Image',
      'Load image and click Scan',
      'Scanning your typewritten texts has never been easier',
      'Copy to Clipboard',
    ],
  };

  return (
    <>
      <div className="min-h-full">
        <Popover as="header" className="bg-gray-50 pb-24">
          {({ open }) => (
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="border-t border-white border-opacity-20 py-5">
                <div className="grid grid-cols-4 items-center gap-8">
                  <div className="col-span-2">
                    <nav className="flex space-x-4">
                      {!selectedFile ? (
                        <div className="hidden lg:block">
                          <label
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                            htmlFor="file_input"
                          >
                            {translatedStatic[languageSelected][6]}
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
                            {translatedStatic[languageSelected][2]}
                          </p>
                        </div>
                      ) : null}

                      {selectedFile ? (
                        <button
                          onClick={resetFiles}
                          className={classNames(
                            'my-auto mr-2 inline-flex h-min items-center rounded-lg bg-red-700 bg-opacity-100 px-5 py-2.5 text-center text-sm font-medium  text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
                          )}
                          type="button"
                          aria-current={'page'}
                        >
                          {translatedStatic[languageSelected][5]}
                        </button>
                      ) : null}
                      {!ocrTextResult ? (
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
                          {isScanning ? (
                            <Loader className="mr-3 inline h-4 w-4 animate-spin text-white" />
                          ) : null}
                          {translatedStatic[languageSelected][4]}
                        </button>
                      ) : null}
                    </nav>
                  </div>
                  <div></div>
                  {ocrTextResult ? (
                    <div className="lg:col-span-1">
                      {/* <div className="ml-auto w-full max-w-md">
                        <label htmlFor="mobile-search" className="sr-only">
                          {translatedStatic[languageSelected][3]}
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
                            placeholder={translatedStatic[languageSelected][3]}
                            type="search"
                            name="search"
                          />
                        </div>
                      </div> */}
                    </div>
                  ) : (
                    <div className="ml-auto">
                      <LanguageToggler
                        handleLanguageToggle={handleLanguageToggle}
                      />
                    </div>
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
            <div
              className={classNames(
                'order-last grid grid-cols-1 items-start gap-4 lg:order-first lg:grid-cols-4 lg:gap-2'
              )}
            >
              {/* Left column */}
              {/* Switching columns on mobile when scanning or text available */}
              <div
                className={classNames(
                  'grid gap-4 lg:col-span-2 ' +
                    (ocrTextResult || isScanning
                      ? 'order-last lg:order-first'
                      : '')
                )}
              >
                <section>
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-6">
                      {selectedFile ? (
                        <img
                          src={preview}
                          ref={imageRef}
                          className=""
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
                              <CloudArrowUpIcon className="h-12" />
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  {translatedStatic[languageSelected][0]}
                                </span>{' '}
                                {translatedStatic[languageSelected][1]}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {translatedStatic[languageSelected][2]}
                              </p>
                            </div>
                            <input
                              id="dropzone-file"
                              type="file"
                              className="hidden"
                              onChange={onLoadPicture}
                              accept="image/*"
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
              <div className="grid gap-4 lg:col-span-2 ">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-10">
                    {isScanning ? (
                      <div className="text-center">
                        <span classNames="mx-2 p-1">{progress}</span>
                      </div>
                    ) : ocrTextResult ? (
                      <div className="">
                        <div className="flex justify-end">
                          <div></div>
                          <div>
                            <button
                              className="mb-7 flex text-right"
                              onClick={onCopyToClipboard}
                            >
                              <span className="pointer-events-auto font-mono text-sm font-medium underline underline-offset-8 hover:font-bold">
                                {translatedStatic[languageSelected][9]}
                              </span>

                              {isCopied ? (
                                <ClipboardDocumentCheckIcon
                                  className="mx-1 h-5 w-5 text-green-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <ClipboardDocumentListIcon
                                  className="mx-1 h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </button>
                          </div>
                        </div>
                        <div>{ocrTextResult}</div>
                      </div>
                    ) : (
                      <div className="">
                        <div type="button" className="content">
                          <p> {translatedStatic[languageSelected][7]}</p>
                          <p>{translatedStatic[languageSelected][8]}</p>
                        </div>
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
