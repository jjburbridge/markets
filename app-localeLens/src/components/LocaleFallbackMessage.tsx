import React from 'react';

interface LocaleFallbackMessageProps {
  title?: string;
  message?: string;
  suggestion?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  variant?: 'warning' | 'error' | 'info';
}

const LocaleFallbackMessage: React.FC<LocaleFallbackMessageProps> = ({
  title = 'No Languages Found',
  message = 'The app could not load any supported languages.',
  suggestion = 'Try refreshing the page, or check your Sanity configuration to ensure locale documents exist.',
  buttonText = 'Refresh Page',
  onButtonClick,
  variant = 'warning',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'error':
        return {
          container: 'bg-red-50 border-red-200',
          title: 'text-red-800',
          message: 'text-red-700',
          suggestion: 'text-red-600',
          button: 'bg-red-100 hover:bg-red-200 text-red-800',
        };
      case 'info':
        return {
          container: 'bg-blue-50 border-blue-200',
          title: 'text-blue-800',
          message: 'text-blue-700',
          suggestion: 'text-blue-600',
          button: 'bg-blue-100 hover:bg-blue-200 text-blue-800',
        };
      case 'warning':
      default:
        return {
          container: 'bg-yellow-50 border-yellow-200',
          title: 'text-yellow-800',
          message: 'text-yellow-700',
          suggestion: 'text-yellow-600',
          button: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800',
        };
    }
  };

  const styles = getVariantStyles();

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      // Default behavior: refresh the page
      window.location.reload();
    }
  };

  return (
    <div className={`relative mb-2 p-4 border rounded-md ${styles.container}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className={`text-sm font-medium mb-2 ${styles.title}`}>
            {title}
          </h3>
          <p className={`text-sm mb-2 ${styles.message}`}>
            {message}
          </p>
          <p className={`text-xs ${styles.suggestion}`}>
            {suggestion}
          </p>
        </div>
        <button
          onClick={handleButtonClick}
          className={`px-3 py-2 text-sm rounded-md transition-colors ${styles.button}`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default LocaleFallbackMessage;
