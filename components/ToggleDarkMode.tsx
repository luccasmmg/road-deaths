import { Switch } from '@headlessui/react';
import { useEffect, useState } from 'react';

interface ToggleProps {
  icon?: React.ReactNode;
  description: string;
}

export const ToggleDarkMode: React.FC<ToggleProps> = ({
  icon,
  description,
}) => {
  const [enabled, setEnabledValue] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setEnabledValue(true);
    } else {
      setEnabledValue(false);
    }
  }, []);

  const setEnabled = (event: boolean) => {
    if (!enabled) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dark-mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dark-mode', 'false');
    }
    setEnabledValue(event);
  };

  return (
    <div className='py-2 pr-4'>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? 'bg-gray-700' : 'bg-gray-200'}
          relative inline-flex h-[21px] w-[44px] flex-shrink-0 cursor-pointer rounded-full border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className='sr-only'>{description}</span>
        <span
          aria-hidden='true'
          className={`${
            enabled
              ? 'translate-x-6 border-gray-700 bg-gray-600 text-white'
              : 'translate-x-0 border-gray-200 text-gray-200'
          }
            pointer-events-none -mt-0.5 inline-block h-[25px] w-[25px] transform rounded-full border-2 bg-white shadow-lg ring-0 transition duration-200 ease-in-out dark:bg-gray-600`}
        >
          {icon && (
            <span className='flex items-center justify-center'>{icon}</span>
          )}
        </span>
      </Switch>
    </div>
  );
};

export default ToggleDarkMode;
