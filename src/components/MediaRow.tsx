import { Link } from 'react-router-dom';
import type { MediaItemWithOwner } from '../types/DBTypes';

const MediaRow = (props: { item: MediaItemWithOwner }) => {
  const { item } = props;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img
          src={item.thumbnail || item.filename}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-black/50 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-lg">
            {item.media_type.split('/')[0]}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {item.title}
          </h3>
        </div>

        <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-grow leading-relaxed">
          {item.description || 'No description provided.'}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
          <span className="text-xs font-medium text-gray-400">
            {new Date(item.created_at).toLocaleDateString('fi-FI')}
          </span>
          <Link
            to="/single"
            state={{ item }}
            className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group/btn"
          >
            Details 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MediaRow;