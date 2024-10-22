import { useEffect, useRef, useState } from 'react';
import ShareIcon from './icons/ShareIcon';

type ShareButtonProps = {
  url?: string;
};

const ShareButton: React.FC<ShareButtonProps> = ({ url }) => {
  const [urlToShare, setUrlToShare] = useState(url || window.location.href);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const successMessageRef = useRef<HTMLDivElement | null>(null);
  const urlInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => setShowSuccessMessage(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ url: urlToShare, title: document.title }).catch((error) => {
        console.error('Error sharing:', error);
      });
    } else {
      handleCopyToClipboard();
    }
  };

  const handleCopyToClipboard = () => {
    if (urlInputRef.current) {
      navigator.clipboard.writeText(urlInputRef.current.value).then(() => {
        setShowSuccessMessage(true);
      });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="flex items-center gap-[10px]"
      >
        <ShareIcon width={13} height={12} /> <span className='text-[14px] font-medium underline'>Share</span>
      </button>
      {!navigator.share && (
        <input
          ref={urlInputRef}
          type="text"
          defaultValue={urlToShare}
          readOnly
          className="absolute left-0 top-12 w-full rounded border border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-300 focus:outline-none focus:ring"
        />
      )}
      {showSuccessMessage && (
        <div
          ref={successMessageRef}
          className="absolute left-0 top-16 rounded bg-green-100 px-3 py-1 text-green-700 shadow-md"
        >
          Link copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default ShareButton;