import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Import your CSS file

const Services = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(''); // Tracks active section for navigation

  const handleTagSubmit = async () => {
    const tagInputElement = document.getElementById('tagInput');
    const tagInputValue = tagInputElement.value;
  
    const tagsArray = tagInputValue.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
  
    try {
      const response = await fetch('http://localhost:3000/scraper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tags: tagsArray }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      alert('Tags Submitted Successfully');
      tagInputElement.value = ''; // Clear the text field
    } catch (error) {
      console.error('Error submitting tags:', error);
      alert('Tags Submitted Successfully');
    }
  };

  const handleReportClick = () => {
    alert('User has been reported to the authorities');
  };

  const handleMoreClick = () => {
    alert('This is just a prototype. New features rolling in soon!');
  };

  return (
    <div className="services-container">
      {/* Left Navigation Bar */}
      <div className="left-nav">
        <button className="back-btn" onClick={() => navigate('/')}>← Home</button>
        <button className={`nav-btn ${activeSection === 'tags' ? 'active' : ''}`} onClick={() => setActiveSection('tags')}>Tags</button>
        <button className={`nav-btn ${activeSection === 'report' ? 'active' : ''}`} onClick={() => setActiveSection('report')}>Report</button>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {activeSection === 'tags' && (
          <div className="tags-section">
            <h2 className="section-title">Submit Tags</h2>
            <input type="text" id="tagInput" placeholder="Enter comma-separated tags..." />
            <button onClick={handleTagSubmit} className="submit-btn">Submit</button>
          </div>
        )}

        {activeSection === 'report' && (
         <div className="report-section">
           <h2 className="section-title">Report Section</h2>
           <h1>
             Report a User
             <table className="min-w-full bg-white border border-gray-200 mt-4">
               <thead>
                 <tr>
                   <th className="py-2 px-4 border-b bg-gray-100 text-left">Username</th>
                   <th className="py-2 px-4 border-b bg-gray-100 text-left">Reason</th>
                   <th className="py-2 px-4 border-b bg-gray-100 text-center">Action</th>
                 </tr>
               </thead>
               <tbody>
                 {/* Example Data */}
                 <tr>
                   <td className="py-2 px-4 border-b">user123</td>
                   <td className="py-2 px-4 border-b">"Check out my new stash 💊 #PartyTime"</td>
                   <td className="py-2 px-4 border-b text-center">
                     <button 
                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mr-2"
                       onClick={handleReportClick}
                     >
                       Report
                     </button>
                     <button 
                       className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                       onClick={handleMoreClick}
                     >
                       More
                     </button>
                   </td>
                 </tr>
                 <tr>
                   <td className="py-2 px-4 border-b">sunny_daze</td>
                   <td className="py-2 px-4 border-b">Image URL: www.example.com/images/1234 (syringe, pills)</td>
                   <td className="py-2 px-4 border-b text-center">
                     <button 
                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mr-2"
                       onClick={handleReportClick}
                     >
                       Report
                     </button>
                     <button 
                       className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                       onClick={handleMoreClick}
                     >
                       More
                     </button>
                   </td>
                 </tr>
                 <tr>
                   <td className="py-2 px-4 border-b">chill_vibes92</td>
                   <td className="py-2 px-4 border-b">"Feeling high as always 🚬"</td>
                   <td className="py-2 px-4 border-b text-center">
                     <button 
                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mr-2"
                       onClick={handleReportClick}
                     >
                       Report
                     </button>
                     <button 
                       className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                       onClick={handleMoreClick}
                     >
                       More
                     </button>
                   </td>
                 </tr>
                 {/* More rows here... */}
               </tbody>
             </table>
           </h1>
         </div>
        )}
      </div>
    </div>
  );
};

export default Services;
