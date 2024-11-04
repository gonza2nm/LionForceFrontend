import { Spinner } from 'react-bootstrap';

export default function LoadingSpinner() {
  return (
    <div className="loading-overlay">
      <Spinner animation="border" variant="primary" />
      <style jsx>{`
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
      `}</style>
    </div>
  );
}
