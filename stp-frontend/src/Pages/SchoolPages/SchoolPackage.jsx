// Testing2.jsx
import React, { useState } from 'react';
import '../../css/SchoolPortalStyle/SchoolPackage.css';
import ContactModal from "../../Components/SchoolPortalComp/ContactModal";
import PackageRotate from '../../Components/SchoolPortalComp/PackageRotate';
const SchoolPackage = () => {

  const items = [
    {
      id: 1,
      title: 'Basic Package',
      price: '250.00',
      package_type: 'package',
      features: [
        "Access to school portal",
        "Editable school details",
        "Access student basic information",
        "Able to view SPM, STPM exam results",
        "Access & Accept application details",
        "Managing courses details"
      ]
    },
    {
      id: 2,
      title: 'Featured Courses on HomePage',
      price: '200.00',
      package_type: 'add_ons',
      slots: 5,
      features: [
        "Premium placement on homepage",
        "Enhanced visibility",
        "Priority in search results",
        "Analytics tracking",
        "Custom thumbnail options",
        "Featured tag display"
      ]
    },
    {
      id: 3,
      title: 'Featured School on HomePage',
      price: '350.00',
      package_type: 'add_ons',
      slots: 3,
      features: [
        "Premium school listing",
        "Enhanced school profile",
        "Priority in school searches",
        "School statistics dashboard",
        "Custom school banner",
        "Featured school badge"
      ]
    },
    {
      id: 4,
      title: 'King Package',
      price: '1250.00',
      package_type: 'package',
      features: [
        "Access to school portal",
        "Editable school details",
        "Access student basic information",
        "Able to view SPM, STPM exam results",
        "Access & Accept application details",
        "Managing courses details"
      ]
    },
    {
      id: 5,
      title: 'Featured Courses on HomePage',
      price: '100.00',
      package_type: 'add_ons',
      slots: 5,
      features: [
        "Premium placement on homepage",
        "Enhanced visibility",
        "Priority in search results",
        "Analytics tracking",
        "Custom thumbnail options",
        "Featured tag display"
      ]
    },
    {
      id: 6,
      title: 'Featured School on HomePage',
      price: '950.00',
      package_type: 'add_ons',
      slots: 3,
      features: [
        "Premium school listing",
        "Enhanced school profile",
        "Priority in school searches",
        "School statistics dashboard",
        "Custom school banner",
        "Featured school badge"
      ]
    },
    {
      id: 7,
      title: 'Premium Package',
      price: '750.00',
      package_type: 'package',
      features: [
        "Access to school portal",
        "Editable school details",
        "Access student basic information",
        
      ]
    },
    {
      id: 8,
      title: 'Featured Courses on HomePage',
      price: '900.00',
      package_type: 'add_ons',
      slots: 5,
      features: [
        "Premium placement on homepage",
        "Enhanced visibility",
        "Priority in search results",
        "Analytics tracking",
        "Custom thumbnail options",
        "Featured tag display"
      ]
    },
  ];


  const packages = items.filter(item => item.package_type === 'package');
  const addOns = items.filter(item => item.package_type === 'add_ons');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleContactClick = () => {
    setIsModalOpen(true);
  };

  const [selectedPackage, setSelectedPackage] = useState(packages[0]);
  const [selectedAddOns, setSelectedAddOns] = useState({});

  const calculateTotal = () => {
    const packageAmount = selectedPackage ? parseFloat(selectedPackage.price) : 0;
    const addOnsAmount = Object.entries(selectedAddOns).reduce((total, [id, quantity]) => {
      const addOn = addOns.find(item => item.id === parseInt(id));
      return total + (addOn ? parseFloat(addOn.price) * quantity : 0);
    }, 0);
    return packageAmount + addOnsAmount;
  };

  const handleAddOnChange = (id, quantity) => {
    setSelectedAddOns(prev => ({
      ...prev,
      [id]: Math.max(0, Math.min(quantity, addOns.find(item => item.id === id)?.slots || 0))
    }));
  };

  return (
    <div className="SP-Container">
      <div className="SP-Container-Overall ">
        <div className="SP-Container-One">
          <h1 className="">MORE PACKAGE</h1>
          <h5

          >HOW TO GET STARTED:</h5>
          <ol>
            <li>SELECT YOUR PACKAGE</li>
            <li>ADD PREMIUM FEATURE</li>
            <li>REVIEW SUMMARY</li>
            <li>CONTACT OUR TEAM</li>
          </ol>
        </div>
        <PackageRotate items={items} />
      </div >
      <div className="SP-Container-Overall-Pricing ">
        <div class="pricing_summary_container" >
          <div className="pricing_summary-section_inside">
            <h2 className="pricing_summary_title" > Summary</h2>
            <div className="pricing_summary_section">
              <h3 className="pricing_summary_section_header">Your current plan</h3>
              <div className="package_selection_container">
                <select
                  className="package_select"
                  value={selectedPackage?.id}
                  onChange={(e) => setSelectedPackage(packages.find(p => p.id === parseInt(e.target.value)))}
                >
                  {packages.map(pkg => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.title} - RM{pkg.price}/month
                    </option>
                  ))}
                </select>
                <div className="pricing_plan_item">
                  <div>
                    <p className="pricing_plan_name mb-0">{selectedPackage?.title}</p>
                    <p className="pricing_subscription_text mb-0">1 month subscription</p>
                  </div>
                  <div className="pricing_total_amount">RM {selectedPackage?.price}</div>
                </div>
              </div>
            </div>
            <div className="pricing_summary_section">
              <h3 className="pricing_summary_section_header">Add Ons</h3>
              <table className="pricing_addons_table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Amount (RM)</th>
                    <th>Slots</th>
                    <th>Total Amount(RM)</th>
                  </tr>
                </thead>
                <tbody>
                  {addOns.map(addOn => {
                    const quantity = selectedAddOns[addOn.id] || 0;
                    const total = quantity * parseFloat(addOn.price);
                    return (
                      <tr key={addOn.id}>
                        <td>
                          <div className="pricing_addon_details">
                            <p className="pricing_plan_name mb-0">{addOn.title}</p>
                            <p className="pricing_subscription_text">1 month subscription</p>
                          </div>
                        </td>
                        <td>{addOn.price}</td>
                        <td>
                          <div className="quantity_control">
                            <button
                              className="SP-Container-Quantity-Button "
                              onClick={() => handleAddOnChange(addOn.id, (selectedAddOns[addOn.id] || 0) - 1)}
                            >
                              -
                            </button>
                            <span className="quantity_value">{quantity}</span>
                            <button
                              className="SP-Container-Quantity-Button "
                              onClick={() => handleAddOnChange(addOn.id, (selectedAddOns[addOn.id] || 0) + 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>{total.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="pricing_summary_total">
              <div className="pricing_total_text">Total</div>
              <div className="pricing_total_amount">RM {calculateTotal().toFixed(2)}</div>
            </div>
            <button 
            className="pricing_contact_button"
            onClick={handleContactClick}
          >
            Contact Us
          </button>
          </div>
        </div>
      </div>
      <ContactModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPackage={selectedPackage}
        selectedAddOns={selectedAddOns}
        addOns={addOns}
        total={calculateTotal()}
      />
    </div>
  );
};

export default SchoolPackage;