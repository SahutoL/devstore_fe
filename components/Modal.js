import React from 'react'

export default function Modal({ app, onClose }) {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div onClick={handleBackgroundClick} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white p-6 pb-10 rounded shadow-lg max-w-lg w-full relative max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-2 right-2 text-gray-500 z-10" onClick={onClose}>
          閉じる
        </button>
        <div className="flex items-center space-x-4">
          {app.artworkUrl512 && (
            <img src={app.artworkUrl512} alt="アプリアイコン" className="w-20 h-20 rounded" />
          )}
          <h2 className="text-2xl mb-4">{app.track_name}</h2>
        </div>
        <p><strong>ジャンル:</strong> {app.genre}</p>
        <p><strong>価格:</strong> {app.price}</p>
        {app.screenshotUrls && app.screenshotUrls.length > 0 && (
          <div className="mt-4">
            <div className="grid grid-cols-2 gap-2">
              {app.screenshotUrls.map((url, index) => (
                <img key={index} src={url} alt={`スクリーンショット ${index + 1}`} className="w-full rounded" />
              ))}
            </div>
          </div>
        )}
        <p className="mt-4">{app.description}</p>
        <div className="mt-6 flex justify-center">
          <a 
            href={app.track_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-blue-500 text-white p-2 rounded"
          >
            アプリを見る
          </a>
        </div>
      </div>
    </div>
  )
}
