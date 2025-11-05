import { Suspense } from 'react';
import Loading from '../Loading';
import ErrorBoundary from './ErrorBoundary';
import LanguageSelectorContent from './LanguageSelectorContent';

// Main component with Suspense boundary and Error Boundary
const DefaultLanguageSelector = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <LanguageSelectorContent />
      </Suspense>
    </ErrorBoundary>
  );
};

export default DefaultLanguageSelector;
