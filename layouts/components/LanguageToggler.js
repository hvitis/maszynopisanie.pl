import { useState } from 'react';
import { LanguageIcon } from '@heroicons/react/24/solid';

const LanguageToggler = ({ handleLanguageToggle }) => {
  const languagesAvailable = ['pol', 'eng'];
  const [language, setLanguage] = useState(languagesAvailable[0]);

  const languageToggle = () => {
    language === 'pol' ? setLanguage('eng') : setLanguage('pol');
    handleLanguageToggle(language)
  };

  return (
    <button
      className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 ring-blue-400 transition-all duration-300 hover:ring-2 focus:outline-none dark:bg-slate-200"
      onClick={languageToggle}
      aria-label="Toggle Dark Mode"
    >
      <LanguageIcon className="h-5 w-5 text-gray-700" /> 
    </button>
  );
};

export default LanguageToggler;
