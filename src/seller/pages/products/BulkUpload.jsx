import React, { useState } from 'react';
import { Upload, Download, FileText, AlertCircle, CheckCircle, X } from 'lucide-react';

const BulkUpload = () => {
  const [uploadStep, setUploadStep] = useState('select');
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validationResults, setValidationResults] = useState(null);
  const [mapping, setMapping] = useState({});

  const templateColumns = [
    { header: 'Product Name', required: true, sample: 'Wireless Headphones' },
    { header: 'Description', required: true, sample: 'Premium wireless headphones...' },
    { header: 'Category', required: true, sample: 'Electronics' },
    { header: 'Brand', required: false, sample: 'AudioPro' },
    { header: 'Price', required: true, sample: '2499' },
    { header: 'Compare Price', required: false, sample: '2999' },
    { header: 'Cost Price', required: false, sample: '1500' },
    { header: 'SKU', required: false, sample: 'AUDIO-001' },
    { header: 'Stock Quantity', required: true, sample: '100' },
    { header: 'Weight (kg)', required: false, sample: '0.5' },
  ];

  const mockValidationResults = {
    totalRows: 50,
    validRows: 45,
    invalidRows: 5,
    errors: [
      { row: 3, column: 'Price', error: 'Price must be a number' },
      { row: 7, column: 'Category', error: 'Invalid category' },
      { row: 12, column: 'Product Name', error: 'Required field missing' },
      { row: 23, column: 'Stock Quantity', error: 'Stock must be a number' },
      { row: 45, column: 'Price', error: 'Price cannot be zero' },
    ],
    preview: [
      { Product_Name: 'Wireless Headphones', Category: 'Electronics', Price: '2499', Stock: '100' },
      { Product_Name: 'Running Shoes', Category: 'Sports', Price: '1899', Stock: '50' },
      { Product_Name: 'Yoga Mat', Category: 'Fitness', Price: '1199', Stock: '75' },
    ]
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadStep('validate');
      
      // Simulate validation
      setTimeout(() => {
        setValidationResults(mockValidationResults);
      }, 1500);
    }
  };

  const handleUpload = () => {
    setUploadStep('uploading');
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStep('complete');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDownloadTemplate = () => {
    // Create CSV content
    const headers = templateColumns.map(col => col.header).join(',');
    const samples = templateColumns.map(col => col.sample).join(',');
    const csvContent = `${headers}\n${samples}`;
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'product_bulk_upload_template.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const renderStepContent = () => {
    switch (uploadStep) {
      case 'select':
        return (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-6">
              <Upload className="text-indigo-600" size={40} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Upload Product CSV File</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Upload a CSV file with your product information. Make sure it follows our template format.
            </p>
            
            <label className="cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-indigo-400 transition-colors">
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="text-indigo-600 mb-3">
                  <Upload size={32} className="mx-auto" />
                </div>
                <div className="font-medium">Click to upload or drag and drop</div>
                <div className="text-sm text-gray-500 mt-2">CSV or Excel files (Max 10MB)</div>
              </div>
            </label>
            
            <div className="mt-8">
              <button
                onClick={handleDownloadTemplate}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Download size={16} className="mr-2" />
                Download Template
              </button>
            </div>
          </div>
        );

      case 'validate':
        return (
          <div className="py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-semibold">Validate Your File</h3>
                <p className="text-gray-600">We're checking your file for errors</p>
              </div>
              <div className="flex items-center">
                <FileText size={20} className="text-gray-400 mr-2" />
                <span className="font-medium">{file?.name}</span>
              </div>
            </div>

            {!validationResults ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Validating your file...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Validation Summary */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 border border-gray-200 rounded-lg">
                      <div className="text-3xl font-bold text-gray-900">{validationResults.totalRows}</div>
                      <div className="text-gray-600">Total Rows</div>
                    </div>
                    <div className="text-center p-4 border border-green-200 rounded-lg bg-green-50">
                      <div className="text-3xl font-bold text-green-700">{validationResults.validRows}</div>
                      <div className="text-green-600">Valid Rows</div>
                    </div>
                    <div className="text-center p-4 border border-red-200 rounded-lg bg-red-50">
                      <div className="text-3xl font-bold text-red-700">{validationResults.invalidRows}</div>
                      <div className="text-red-600">Invalid Rows</div>
                    </div>
                  </div>
                </div>

                {/* Errors */}
                {validationResults.errors.length > 0 && (
                  <div className="bg-white rounded-xl border border-red-200 p-6">
                    <div className="flex items-center mb-4">
                      <AlertCircle className="text-red-600 mr-3" size={24} />
                      <h4 className="text-lg font-semibold text-red-800">Validation Errors Found</h4>
                    </div>
                    <div className="space-y-3">
                      {validationResults.errors.map((error, index) => (
                        <div key={index} className="flex items-start p-3 bg-red-50 rounded-lg">
                          <AlertCircle size={16} className="text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <div className="font-medium">Row {error.row}: {error.column}</div>
                            <div className="text-sm text-red-600">{error.error}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      Please fix these errors in your CSV file and upload again.
                    </div>
                  </div>
                )}

                {/* Preview */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h4 className="font-semibold mb-4">Data Preview</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          {Object.keys(validationResults.preview[0]).map((header) => (
                            <th key={header} className="py-2 px-4 text-left font-medium text-gray-700">
                              {header.replace('_', ' ')}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {validationResults.preview.map((row, index) => (
                          <tr key={index}>
                            {Object.values(row).map((value, idx) => (
                              <td key={idx} className="py-2 px-4">
                                {value}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      setFile(null);
                      setUploadStep('select');
                      setValidationResults(null);
                    }}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Upload Different File
                  </button>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => window.open(`/download/errors/${file.name}`, '_blank')}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Download Error Report
                    </button>
                    <button
                      onClick={handleUpload}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Proceed to Upload ({validationResults.validRows} products)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'uploading':
        return (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-2xl font-bold">{uploadProgress}%</div>
              </div>
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="4"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${uploadProgress * 2.76} 276`}
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Uploading Products</h3>
            <p className="text-gray-600 mb-8">
              Please wait while we upload {validationResults?.validRows} products...
            </p>
            <div className="text-sm text-gray-500">
              Do not close this window
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="text-green-600" size={40} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Upload Complete!</h3>
            <p className="text-gray-600 mb-2">
              Successfully uploaded {validationResults?.validRows} products
            </p>
            {validationResults?.invalidRows > 0 && (
              <p className="text-amber-600 mb-8">
                {validationResults.invalidRows} products were skipped due to errors
              </p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mt-8">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{validationResults?.validRows}</div>
                <div className="text-gray-600">Products Added</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-700">
                  ₹{(validationResults?.validRows * 2499).toLocaleString()}
                </div>
                <div className="text-green-600">Estimated Value</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-700">
                  {validationResults?.validRows * 100}
                </div>
                <div className="text-blue-600">Total Stock Added</div>
              </div>
            </div>

            <div className="mt-8 space-x-4">
              <button
                onClick={() => {
                  setFile(null);
                  setUploadStep('select');
                  setUploadProgress(0);
                  setValidationResults(null);
                }}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Upload More Products
              </button>
              <button
                onClick={() => window.location.href = '/seller/products'}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                View Products
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bulk Product Upload</h1>
        <p className="text-gray-600">Upload multiple products at once using CSV file</p>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-8">
          {['select', 'validate', 'uploading', 'complete'].map((step, index) => (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === 'select' 
                    ? 'bg-indigo-600 text-white' 
                    : uploadStep === step 
                    ? 'bg-indigo-600 text-white' 
                    : ['validate', 'uploading', 'complete'].includes(uploadStep) && step === 'select'
                    ? 'bg-green-600 text-white'
                    : ['uploading', 'complete'].includes(uploadStep) && step === 'validate'
                    ? 'bg-green-600 text-white'
                    : uploadStep === 'complete' && step === 'uploading'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {index + 1}
                </div>
                <div className={`mt-2 text-sm font-medium ${
                  uploadStep === step ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step === 'select' && 'Select File'}
                  {step === 'validate' && 'Validate'}
                  {step === 'uploading' && 'Upload'}
                  {step === 'complete' && 'Complete'}
                </div>
              </div>
              {index < 3 && (
                <div className={`flex-1 h-1 mx-4 ${
                  ['validate', 'uploading', 'complete'].includes(uploadStep) && index === 0
                    ? 'bg-green-600'
                    : ['uploading', 'complete'].includes(uploadStep) && index === 1
                    ? 'bg-green-600'
                    : uploadStep === 'complete' && index === 2
                    ? 'bg-green-600'
                    : 'bg-gray-200'
                }`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {renderStepContent()}
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">How to Prepare Your CSV File</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Required Format</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Use the provided template to ensure correct formatting
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Include required columns: Product Name, Description, Category, Price, Stock
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Save file as CSV (Comma Separated Values)
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Maximum file size: 10MB
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">Tips for Success</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <AlertCircle size={16} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                Use descriptive product names for better SEO
              </li>
              <li className="flex items-start">
                <AlertCircle size={16} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                Ensure prices are numbers without currency symbols
              </li>
              <li className="flex items-start">
                <AlertCircle size={16} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                Use valid category names from your store
              </li>
              <li className="flex items-start">
                <AlertCircle size={16} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                Keep descriptions concise but informative
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUpload;