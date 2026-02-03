// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useLostFound, useCreateLostFound } from '../hooks/useApi';
// import apiService from '../api/apiService';
// import LostFoundCard from '../components/LostFoundCard';
// import ReportItemModal from '../components/ReportItemModal';
// import LoadingSpinner from '../components/LoadingSpinner';
// import ErrorMessage from '../components/ErrorMessage';
// import '../styles/LostAndFound.css'

// const LostAndFound = () => {
//   const { user } = useAuth();
//   const [typeFilter, setTypeFilter] = useState('All');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [page, setPage] = useState(0);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);

//   const { data: itemsData, loading, error, refetch } = useLostFound({ page, size: 20 });

//   useEffect(() => {
//     refetch();
//   }, [typeFilter, page, refreshTrigger]);

//   const handleClaim = async (id) => {
//     if (window.confirm('Mark this item as claimed?')) {
//       try {
//         await apiService.markAsClaimed(id);
//         setRefreshTrigger(prev => prev + 1);
//       } catch (err) {
//         alert('Failed to claim: ' + err.message);
//       }
//     }
//   };

//   const filteredItems = itemsData?.content?.filter(item => {
//     const matchesType = typeFilter === 'All' || item.status === typeFilter.toUpperCase();
//     const matchesSearch = !searchTerm || 
//       item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.description.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesType && matchesSearch;
//   }) || [];

//   return (
//     <div className="lost-found-page">
//       <div className="page-header">
//         <h1>Lost & Found</h1>
//         <button className="btn-primary" onClick={() => setShowModal(true)}>
//           + Report Item
//         </button>
//       </div>

//       <div className="search-filters">
//         <input
//           type="text"
//           placeholder="Search items..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="search-input"
//         />
        
//         <div className="type-filters">
//           {['All', 'Lost', 'Found', 'Claimed'].map(type => (
//             <button
//               key={type}
//               className={typeFilter === type ? 'active' : ''}
//               onClick={() => setTypeFilter(type)}
//             >
//               {type}
//             </button>
//           ))}
//         </div>
//       </div>

//       {loading && <LoadingSpinner />}
//       {error && <ErrorMessage message={error.message} onRetry={refetch} />}

//       {!loading && !error && (
//         <div className="items-grid">
//           {filteredItems.length > 0 ? (
//             filteredItems.map(item => (
//               <LostFoundCard
//                 key={item.id}
//                 item={item}
//                 onClaim={handleClaim}
//                 canClaim={user && item.userId !== user.id}
//               />
//             ))
//           ) : (
//             <div className="empty-state">No items found</div>
//           )}
//         </div>
//       )}

//       {showModal && (
//         <ReportItemModal
//           onClose={() => setShowModal(false)}
//           onSuccess={() => {
//             setShowModal(false);
//             setRefreshTrigger(prev => prev + 1);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default LostAndFound;

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLostFound } from '../hooks/useApi';
import apiService from '../api/apiService';
import LostFoundCard from '../components/LostFoundCard';
import ReportItemModal from '../components/ReportItemModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/LostAndFound.css';
import '../styles/SharedStyles.css';

const LostAndFound = () => {
  const { user } = useAuth();
  const [typeFilter, setTypeFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(0);

  const { data: itemsData, loading, error, refetch } = useLostFound({ page, size: 20 });

  const handleClaim = async (id) => {
    if (window.confirm('Mark this item as claimed?')) {
      try {
        await apiService.markAsClaimed(id);
        refetch();
        alert('Item marked as claimed!');
      } catch (err) {
        alert('Failed to claim: ' + err.message);
      }
    }
  };

  const handleSuccess = () => {
    setShowModal(false);
    refetch(); 
  };

  const filteredItems = itemsData?.content?.filter(item => {
    const matchesType = typeFilter === 'All' || item.status === typeFilter.toUpperCase();
    return matchesType;
  }) || [];

  return (
    <div className="lost-found-page">
      <div className="page-header">
        <div className="header-content">
        <h1>Lost & Found</h1>
        <p className="subtitle">Help reunite items with their owners</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          + Report Item
        </button>
      </div>

      <div className="type-filters">
        {['All', 'Lost', 'Found', 'Claimed'].map(type => (
          <button
            key={type}
            className={typeFilter === type ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setTypeFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error.message} onRetry={refetch} />}

      {!loading && !error && (
        <div className="items-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <LostFoundCard
                key={item.id}
                item={item}
                onClaim={handleClaim}
                canClaim={user && item.userId !== user.id}
              />
            ))
          ) : (
            <div className="empty-state">
              <p>No items found</p>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <ReportItemModal
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default LostAndFound;