import { Suspense } from 'react';
import Loading from '../Loading';
import ErrorBoundary from './ErrorBoundary';
import MarketSelectorContent from './MarketSelectorContent';

// Main component with Suspense boundary and Error Boundary
const DefaultMarketSelector = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <MarketSelectorContent />
      </Suspense>
    </ErrorBoundary>
  );
};

export default DefaultMarketSelector;
