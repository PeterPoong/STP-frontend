import React, { useState } from 'react';

const ContactModal = ({ isOpen, onClose, selectedPackage, selectedAddOns, addOns, total }) => {
  if (!isOpen) return null;

  const formatSummaryText = () => {
    let text = `Dear StudyPal Team,\n\n`;
    text += `I am interested in subscribing to StudyPal's services. Here are the details of my selected package and requirements:\n\n`;
    
    // Selected Package Section
    text += `*Package Selection:*\n`;
    text += `• Package Name: ${selectedPackage.title}\n`;
    text += `• Monthly Price: RM${selectedPackage.price}\n`;
    text += `• Package Features:\n`;
    selectedPackage.features.forEach(feature => {
      text += `  - ${feature}\n`;
    });
    text += '\n';

    // Add-ons Section
    const selectedAddOnsDetails = Object.entries(selectedAddOns)
      .filter(([_, quantity]) => quantity > 0)
      .map(([id, quantity]) => {
        const addOn = addOns.find(item => item.id === parseInt(id));
        return { ...addOn, quantity };
      });

    if (selectedAddOnsDetails.length > 0) {
      text += `*Selected Add-ons:*\n`;
      selectedAddOnsDetails.forEach(addOn => {
        text += `• ${addOn.title}:\n`;
        text += `  - Quantity: ${addOn.quantity} slots\n`;
        text += `  - Price per slot: RM${addOn.price}\n`;
        text += `  - Subtotal: RM${(addOn.price * addOn.quantity).toFixed(2)}\n`;
        text += `  - Features:\n`;
        addOn.features.forEach(feature => {
          text += `    * ${feature}\n`;
        });
        text += '\n';
      });
    }

    // Total Cost
    text += `*Total Monthly Investment: RM${total.toFixed(2)}*\n\n`;

    // Closing Message
    text += `I would like to proceed with this subscription and would appreciate if you could contact me to finalize the details and proceed with the setup.\n\n`;
    text += `Thank you for your assistance.\n\n`;
    text += `Best regards,\n`;
    text += `[Your Name]`;

    return text;
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(formatSummaryText());
    window.open(`https://wa.me/60135538976?text=${text}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent('StudyPal Package Subscription Inquiry');
    const body = encodeURIComponent(formatSummaryText());
    window.location.href = `mailto:admin@studypal.my?subject=${subject}&body=${body}`;
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={handleModalClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
    >
      <div 
        className="modal-content"
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          width: '90%',
          maxWidth: '500px',
          maxHeight: '90vh',
          overflowY: 'auto',
          animation: 'modalFadeIn 0.3s ease-out',
          position: 'relative'
        }}
      >
        <button
          className="close-button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '5px',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'background-color 0.2s'
          }}
        >
          ×
        </button>

        <h2 style={{
          margin: '0 0 1.5rem 0',
          textAlign: 'center',
          color: '#333',
          fontSize: '1.5rem'
        }}>
          Contact Our Team
        </h2>

        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '1.5rem',
          fontSize: '0.9rem'
        }}>
          Choose how you'd like to send your package details to our team
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <button
            onClick={handleWhatsApp}
            style={{
              padding: '12px',
              backgroundColor: '#25D366',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '1rem',
              transition: 'background-color 0.2s',
              fontWeight: '500'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#128C7E'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#25D366'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            Send via WhatsApp (+6013-5538976)
          </button>

          <button
            onClick={handleEmail}
            style={{
              padding: '12px',
              backgroundColor: '#EA4335',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '1rem',
              transition: 'background-color 0.2s',
              fontWeight: '500'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#B23121'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#EA4335'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Send via Email (admin@studypal.my)
          </button>
        </div>

        <div
          className="summary-preview"
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '6px',
            fontSize: '0.9rem'
          }}
        >
          <h3 style={{
            margin: '0 0 0.5rem 0',
            fontSize: '1rem',
            color: '#666'
          }}>
            Message Preview
          </h3>
          <pre style={{
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontFamily: 'inherit',
            color: '#444',
            fontSize: '0.85rem',
            lineHeight: '1.5'
          }}>
            {formatSummaryText()}
          </pre>
        </div>

        <style>
          {`
            @keyframes modalFadeIn {
              from {
                opacity: 0;
                transform: translateY(-20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .close-button:hover {
              background-color: rgba(0, 0, 0, 0.1);
            }

            .modal-content::-webkit-scrollbar {
              width: 8px;
            }

            .modal-content::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 4px;
            }

            .modal-content::-webkit-scrollbar-thumb {
              background: #888;
              border-radius: 4px;
            }

            .modal-content::-webkit-scrollbar-thumb:hover {
              background: #555;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default ContactModal;