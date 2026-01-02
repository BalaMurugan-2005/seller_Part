import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Upload,
  FileText,
  IdCard,
  Building,
  Shield,
  Download
} from 'lucide-react';

const KYCVerification = () => {
  const [kycStatus, setKycStatus] = useState({
    basic: 'verified',
    business: 'pending',
    bank: 'verified',
    tax: 'verified',
    identity: 'verified'
  });

  const [documents, setDocuments] = useState({
    panCard: { uploaded: true, verified: true, file: 'pan_card.pdf' },
    aadhaarCard: { uploaded: true, verified: true, file: 'aadhaar_card.pdf' },
    gstCertificate: { uploaded: true, verified: true, file: 'gst_certificate.pdf' },
    businessLicense: { uploaded: false, verified: false, file: null },
    bankProof: { uploaded: true, verified: true, file: 'bank_proof.pdf' },
    addressProof: { uploaded: true, verified: true, file: 'address_proof.pdf' }
  });

  const verificationSteps = [
    {
      id: 1,
      title: 'Basic Information',
      status: kycStatus.basic,
      description: 'Personal and contact details',
      icon: IdCard
    },
    {
      id: 2,
      title: 'Business Details',
      status: kycStatus.business,
      description: 'Business registration and type',
      icon: Building
    },
    {
      id: 3,
      title: 'Bank Account',
      status: kycStatus.bank,
      description: 'Bank details for payouts',
      icon: Shield
    },
    {
      id: 4,
      title: 'Tax Information',
      status: kycStatus.tax,
      description: 'GST and PAN details',
      icon: FileText
    }
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case 'verified':
        return { color: 'text-green-600 bg-green-50', icon: CheckCircle, text: 'Verified' };
      case 'pending':
        return { color: 'text-amber-600 bg-amber-50', icon: Clock, text: 'Pending' };
      case 'rejected':
        return { color: 'text-red-600 bg-red-50', icon: AlertCircle, text: 'Rejected' };
      default:
        return { color: 'text-gray-600 bg-gray-50', icon: Clock, text: 'Not Started' };
    }
  };

  const handleFileUpload = (docType, file) => {
    setDocuments(prev => ({
      ...prev,
      [docType]: {
        uploaded: true,
        verified: false,
        file: file.name
      }
    }));
  };

  const calculateCompletion = () => {
    const totalSteps = Object.keys(kycStatus).length;
    const completedSteps = Object.values(kycStatus).filter(s => s === 'verified').length;
    return Math.round((completedSteps / totalSteps) * 100);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">KYC Verification</h1>
        <p className="text-gray-600">Complete verification to access all seller features</p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-semibold">Verification Progress</h3>
            <p className="text-gray-600">Complete all steps to become a verified seller</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-3xl font-bold text-indigo-600">{calculateCompletion()}%</div>
            <div className="text-sm text-gray-600">Overall Completion</div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${calculateCompletion()}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {verificationSteps.map((step) => {
            const statusConfig = getStatusConfig(step.status);
            const Icon = step.icon;
            
            return (
              <div key={step.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <Icon className="text-indigo-600" size={24} />
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                    {statusConfig.text}
                  </span>
                </div>
                <h4 className="font-medium">{step.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                {step.status === 'pending' && (
                  <button className="mt-4 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                    Complete Now →
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Document Upload */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-6">Required Documents</h3>
        <div className="space-y-4">
          {Object.entries(documents).map(([docType, doc]) => {
            const docConfig = {
              panCard: { label: 'PAN Card', required: true },
              aadhaarCard: { label: 'Aadhaar Card', required: true },
              gstCertificate: { label: 'GST Certificate', required: true },
              businessLicense: { label: 'Business License', required: true },
              bankProof: { label: 'Bank Proof (Cancelled Cheque)', required: true },
              addressProof: { label: 'Business Address Proof', required: true }
            };

            return (
              <div key={docType} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-50 rounded-lg mr-4">
                    <FileText size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium">{docConfig[docType].label}</div>
                    <div className="text-sm text-gray-600">
                      {docConfig[docType].required ? 'Required' : 'Optional'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {doc.uploaded ? (
                    <>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        doc.verified 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {doc.verified ? 'Verified' : 'Under Review'}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{doc.file}</span>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Download size={16} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <label className="cursor-pointer">
                      <div className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Upload size={16} className="mr-2" />
                        Upload Document
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(docType, e.target.files[0])}
                          className="hidden"
                        />
                      </div>
                    </label>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verification Guidelines */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-6">Verification Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-3">Document Requirements</h4>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-start">
                <CheckCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                All documents must be clear and legible
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                Upload files in PDF, JPG, or PNG format
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                Maximum file size: 5MB per document
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                Documents must be valid and not expired
              </li>
            </ul>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-800 mb-3">Verification Benefits</h4>
            <ul className="space-y-2 text-sm text-green-700">
              <li className="flex items-start">
                <Shield size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                Higher customer trust and credibility
              </li>
              <li className="flex items-start">
                <Shield size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                Faster payout processing
              </li>
              <li className="flex items-start">
                <Shield size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                Access to premium seller features
              </li>
              <li className="flex items-start">
                <Shield size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                Priority customer support
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-start">
            <AlertCircle className="text-amber-600 mt-0.5 mr-3" size={20} />
            <div>
              <h4 className="font-medium text-amber-800">Important Information</h4>
              <p className="text-sm text-amber-700 mt-1">
                Verification typically takes 2-3 business days. You can continue selling during this period, 
                but some features may be restricted until verification is complete.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Support Contact */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Need Help with Verification?</h3>
            <p className="text-gray-600">Contact our verification support team</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCVerification;