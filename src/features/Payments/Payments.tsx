import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

// Crisp SVG Icons matching exact screenshot design
const DropletIcon = () => (
  <svg className="w-6 h-6 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    <path d="M12 11a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-6 h-6 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const HelpBoxIcon = () => (
  <svg className="w-6 h-6 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2.5" ry="2.5" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const CloseModalIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-12 h-12 text-green-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Payments = () => {
  const { t } = useLanguage();
  // Navigation & Interactive States
  const [activeCategory, setActiveCategory] = useState(null); // null = default view, 'utility' or 'miscellaneous'
  const [selectedSubService, setSelectedSubService] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  // Form states for Step 2
  const [accountNumber, setAccountNumber] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [payerName, setPayerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // History search state
  const [historySearch, setHistorySearch] = useState('');

  // Sample historical transactions
  const transactions = [
    {
      id: 'HPS-PAY-2026-8921',
      date: '2026-06-28',
      category: 'Utility',
      service: 'Water Charges & Assessment Rates',
      accountNo: 'W-99104',
      amount: 'LKR 2,450.00',
      status: 'Paid',
      method: 'Online Card'
    },
    {
      id: 'HPS-PAY-2026-7410',
      date: '2026-05-14',
      category: 'Miscellaneous',
      service: 'Environment & Health Certificate Fee',
      accountNo: 'CERT-2026-402',
      amount: 'LKR 1,500.00',
      status: 'Paid',
      method: 'LankaQR'
    },
    {
      id: 'HPS-PAY-2026-6102',
      date: '2026-04-03',
      category: 'Utility',
      service: 'Property & Assessment Tax (Q1)',
      accountNo: 'ASM-4421',
      amount: 'LKR 4,800.00',
      status: 'Paid',
      method: 'Online Card'
    },
    {
      id: 'HPS-PAY-2026-5309',
      date: '2026-02-19',
      category: 'Miscellaneous',
      service: 'Building Permit Renewal Fee',
      accountNo: 'PERM-8812',
      amount: 'LKR 3,200.00',
      status: 'Paid',
      method: 'Bank Transfer'
    }
  ];

  const utilityServices = [
    {
      id: 'water',
      title: t('payments.srvWaterTitle', 'Water Supply & Municipal Utility Bill'),
      desc: t('payments.srvWaterDesc', 'Pay your monthly municipal water charges and recurring utility bills.'),
      placeholder: t('payments.srvWaterPlaceholder', 'Enter Water Account Number (e.g. W-99104)'),
      defaultAmount: '2450.00'
    },
    {
      id: 'assessment',
      title: t('payments.srvAssessmentTitle', 'Property Assessment & Council Rates'),
      desc: t('payments.srvAssessmentDesc', 'Settle quarterly property assessment rates and municipal taxes.'),
      placeholder: t('payments.srvAssessmentPlaceholder', 'Enter Assessment Property No. (e.g. ASM-4421)'),
      defaultAmount: '4800.00'
    },
    {
      id: 'shop-rent',
      title: t('payments.srvShopTitle', 'Municipal Commercial Shop Rent'),
      desc: t('payments.srvShopDesc', 'Monthly rental fee for municipal council commercial stalls and shops.'),
      placeholder: t('payments.srvShopPlaceholder', 'Enter Stall / Shop ID (e.g. SHP-018)'),
      defaultAmount: '8500.00'
    }
  ];

  const miscServices = [
    {
      id: 'certificate',
      title: t('payments.srvCertTitle', 'Certificate & Official Document Fee'),
      desc: t('payments.srvCertDesc', 'Settle fees for birth, marriage, non-vesting, or ownership certificates.'),
      placeholder: t('payments.srvCertPlaceholder', 'Enter Application Reference No.'),
      defaultAmount: '1200.00'
    },
    {
      id: 'permit',
      title: t('payments.srvPermitTitle', 'Trade & Building Permit Processing'),
      desc: t('payments.srvPermitDesc', 'One-off charges for trade licenses, building approvals, and inspections.'),
      placeholder: t('payments.srvPermitPlaceholder', 'Enter Permit Ref No.'),
      defaultAmount: '3500.00'
    },
    {
      id: 'fines',
      title: t('payments.srvFineTitle', 'Municipal Fine & Violation Settlement'),
      desc: t('payments.srvFineDesc', 'Pay environmental, parking, or administrative council penalty notices.'),
      placeholder: t('payments.srvFinePlaceholder', 'Enter Notice / Ticket No.'),
      defaultAmount: '1000.00'
    }
  ];

  const handleSelectSubService = (service) => {
    setSelectedSubService(service);
    setPaymentAmount(service.defaultAmount);
    setAccountNumber('');
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!accountNumber.trim()) {
      alert('Please enter your account or reference number.');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);

      let serviceTitle = t('payments.miscTitle', 'Miscellaneous');
      if (selectedSubService) {
        serviceTitle = selectedSubService.title;
      } else if (activeCategory === 'utility') {
        serviceTitle = t('payments.utilityTitle', 'Utility');
      }

      let paymentMethodName = 'Online Banking';
      if (paymentMethod === 'card') {
        paymentMethodName = 'Visa / Mastercard';
      } else if (paymentMethod === 'lankaqr') {
        paymentMethodName = 'LankaQR Direct';
      }

      const newReceipt = {
        id: 'HPS-PAY-' + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString('en-CA'),
        time: new Date().toLocaleTimeString(),
        service: serviceTitle,
        accountNo: accountNumber,
        amount: `LKR ${Number(paymentAmount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        payerName: payerName || 'Verified Citizen',
        method: paymentMethodName
      };
      setReceiptData(newReceipt);
      setShowReceiptModal(true);
    }, 1100);
  };

  const filteredHistory = transactions.filter(t =>
    t.service.toLowerCase().includes(historySearch.toLowerCase()) ||
    t.accountNo.toLowerCase().includes(historySearch.toLowerCase()) ||
    t.id.toLowerCase().includes(historySearch.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-180px)] py-10 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto font-sans animate-fadeIn">


      {/* PAGE 1: EXACT SCREENSHOT DESIGN DEFAULT VIEW */}
      {!activeCategory && (
        <>
          {/* Top Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-2 border-b border-gray-100">
            <div className="space-y-2 max-w-2xl">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                {t('payments.title', 'Make a payment')}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {t('payments.subtitle', "Choose a payment category to get started. You'll select the specific service to pay for on the next step.")}
              </p>
            </div>
          </div>

          {/* Payment Categories Grid - 2 Large Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Utility Card */}
            <button
              type="button"
              onClick={() => {
                setActiveCategory('utility');
                setSelectedSubService(utilityServices[0]);
                setPaymentAmount(utilityServices[0].defaultAmount);
              }}
              className="bg-white rounded-2xl border border-gray-200/80 p-8 sm:p-10 shadow-xs hover:shadow-md hover:border-[#8C1538]/40 transition-all duration-300 flex flex-col justify-between min-h-[250px] group cursor-pointer text-left w-full font-sans"
            >
              <span className="block">
                <span className="w-12 h-12 rounded-xl bg-[#8C1538]/10 text-[#8C1538] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200">
                  <DropletIcon />
                </span>
                <span className="block text-xl sm:text-2xl font-bold text-gray-900 mb-2.5 group-hover:text-[#8C1538] transition-colors">
                  {t('payments.utilityTitle', 'Utility')}
                </span>
                <span className="block text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                  {t('payments.utilityDesc', 'Pay water charges, assessment rates, and other recurring municipal utility bills.')}
                </span>
              </span>
              <span className="inline-flex items-center gap-2 text-[#8C1538] font-semibold text-sm group-hover:translate-x-1.5 transition-transform duration-200">
                <span>{t('payments.select', 'Select')}</span>
                <ArrowRightIcon />
              </span>
            </button>

            {/* Miscellaneous Card */}
            <button
              type="button"
              onClick={() => {
                setActiveCategory('miscellaneous');
                setSelectedSubService(miscServices[0]);
                setPaymentAmount(miscServices[0].defaultAmount);
              }}
              className="bg-white rounded-2xl border border-gray-200/80 p-8 sm:p-10 shadow-xs hover:shadow-md hover:border-[#8C1538]/40 transition-all duration-300 flex flex-col justify-between min-h-[250px] group cursor-pointer text-left w-full font-sans"
            >
              <span className="block">
                <span className="w-12 h-12 rounded-xl bg-[#8C1538]/10 text-[#8C1538] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200">
                  <DocumentIcon />
                </span>
                <span className="block text-xl sm:text-2xl font-bold text-gray-900 mb-2.5 group-hover:text-[#8C1538] transition-colors">
                  {t('payments.miscTitle', 'Miscellaneous')}
                </span>
                <span className="block text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                  {t('payments.miscDesc', 'Settle one-off charges such as certificates, permits, fines, and other municipal fees.')}
                </span>
              </span>
              <span className="inline-flex items-center gap-2 text-[#8C1538] font-semibold text-sm group-hover:translate-x-1.5 transition-transform duration-200">
                <span>{t('payments.select', 'Select')}</span>
                <ArrowRightIcon />
              </span>
            </button>
          </div>

          {/* Bottom Row - History Banner + Help Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Banner Card (col-span-2) */}
            <div className="lg:col-span-2 bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="max-w-xl">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5">
                  {t('payments.historyBannerTitle', 'Need a history of your transactions?')}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {t('payments.historyBannerDesc', 'Access your digital receipts and payment history directly from your citizen dashboard.')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowHistoryModal(true)}
                className="bg-[#610A1D] hover:bg-[#4D0817] text-white font-semibold text-xs sm:text-sm px-7 py-3.5 rounded-lg shadow-xs transition-all duration-200 text-center leading-tight whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span dangerouslySetInnerHTML={{ __html: t('payments.viewHistoryBtn', 'View<br />History') }} />
              </button>
            </div>

            {/* Right Help Card (col-span-1) */}
            <div className="lg:col-span-1 bg-[#FCEEEE] border border-[#F5D0CE] rounded-2xl p-6 sm:p-8 flex flex-col justify-center">
              <div className="mb-3">
                <HelpBoxIcon />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1">
                {t('payments.helpTitle', 'Help & Support')}
              </h4>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {t('payments.helpDesc', 'Available 24/7 for payment inquiries.')}
              </p>
            </div>
          </div>
        </>
      )}

      {/* STEP 2: INTERACTIVE SUB-SERVICE SELECTION & PAYMENT FORM */}
      {activeCategory && (
        <div className="animate-fadeIn">
          {/* Back button and Section header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-2 border-b border-gray-100">
            <div className="space-y-2 max-w-2xl">
              <button
                type="button"
                onClick={() => { setActiveCategory(null); setSelectedSubService(null); }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#8C1538] hover:text-[#6a102a] mb-2 cursor-pointer transition-colors"
              >
                <span>{t('payments.backBtn', '← Back to Payment Categories')}</span>
              </button>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight capitalize">
                {t('payments.categoryTitle', '{activeCategory} Payments').replace('{activeCategory}', activeCategory === 'utility' ? t('payments.utilityTitle', 'Utility') : t('payments.miscTitle', 'Miscellaneous'))}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-1">
                {activeCategory === 'utility'
                  ? t('payments.utilityCategoryDesc', 'Select a utility service below and enter your account details to check and pay dues.')
                  : t('payments.miscCategoryDesc', 'Select a fee category below and enter your reference number to complete your payment.')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left side: Sub-service selector cards */}
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                {t('payments.step1Title', '1. Select Specific Service')}
              </h3>
              {(activeCategory === 'utility' ? utilityServices : miscServices).map((service) => {
                const isSelected = selectedSubService?.id === service.id;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleSelectSubService(service)}
                    className={`p-5 rounded-xl border transition-all cursor-pointer text-left w-full font-sans ${isSelected
                      ? 'border-[#8C1538] bg-[#8C1538]/5 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                  >
                    <span className="flex items-start justify-between gap-3 w-full">
                      <span className="block">
                        <span className={`block font-bold text-base ${isSelected ? 'text-[#8C1538]' : 'text-gray-900'}`}>
                          {service.title}
                        </span>
                        <span className="block text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                          {service.desc}
                        </span>
                      </span>
                      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${isSelected ? 'border-[#8C1538] bg-[#8C1538]' : 'border-gray-300'
                        }`}>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white block" />}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right side: Payment form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100 flex items-center justify-between">
                  <span>{t('payments.step2Title', '2. Payment & Billing Details')}</span>
                  {selectedSubService && (
                    <span className="text-xs font-semibold px-3 py-1 bg-[#8C1538]/10 text-[#8C1538] rounded-full">
                      {selectedSubService.title}
                    </span>
                  )}
                </h3>

                <form onSubmit={handlePaymentSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      {t('payments.formAccountNo', 'Account / Reference Number *')}
                    </label>
                    <input
                      type="text"
                      required
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder={selectedSubService?.placeholder || t('payments.formAccountNoPlaceholder', 'Enter Account / Reference No.')}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8C1538] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      {t('payments.formPayerName', 'Payer Name (Optional)')}
                    </label>
                    <input
                      type="text"
                      value={payerName}
                      onChange={(e) => setPayerName(e.target.value)}
                      placeholder={t('payments.formPayerNamePlaceholder', 'Enter citizen or business name')}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8C1538] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      {t('payments.formAmount', 'Amount to Pay (LKR) *')}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-base font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8C1538] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Payment Method Selection */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      {t('payments.formMethod', 'Payment Gateway Method')}
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'card', label: t('payments.methodCard', 'Credit / Debit Card') },
                        { id: 'lankaqr', label: t('payments.methodQR', 'LankaQR Pay') },
                        { id: 'bank', label: t('payments.methodBank', 'Online Banking') }
                      ].map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setPaymentMethod(method.id)}
                          className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${paymentMethod === method.id
                            ? 'border-[#8C1538] bg-[#8C1538]/10 text-[#8C1538]'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                            }`}
                        >
                          {method.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-[#8C1538] hover:bg-[#73102d] text-white font-bold py-3.5 rounded-xl text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {isProcessing ? (
                        <span>{t('payments.processingBtn', 'Processing Payment Gateway...')}</span>
                      ) : (
                        <span>{t('payments.proceedBtn', 'Proceed to Pay')} • LKR {Number(paymentAmount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TRANSACTION HISTORY MODAL */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {t('payments.histTitle', 'Transaction & Payment History')}
                </h3>
                <p className="text-xs text-gray-500">
                  {t('payments.histSubtitle', 'Digital council receipts for your account')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <CloseModalIcon />
              </button>
            </div>

            {/* Search filter inside modal */}
            <div className="px-6 py-4 border-b border-gray-100">
              <input
                type="text"
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                placeholder={t('payments.histSearch', 'Search by receipt number, account or service name...')}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C1538]"
              />
            </div>

            {/* Transactions List */}
            <div className="p-6 overflow-y-auto space-y-3">
              {filteredHistory.length === 0 ? (
                <div className="text-center py-10 text-gray-500 text-sm">
                  {t('payments.histNoMatch', 'No matching transactions found.')}
                </div>
              ) : (
                filteredHistory.map((tx) => (
                  <div
                    key={tx.id}
                    className="border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-gray-300 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-gray-900">
                          {tx.service}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                          {tx.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 space-x-3">
                        <span>{t('payments.histReceipt', 'Receipt:')} <strong className="text-gray-700">{tx.id}</strong></span>
                        <span>{t('payments.histAcct', 'Acct:')} <strong className="text-gray-700">{tx.accountNo}</strong></span>
                        <span>{t('payments.histDate', 'Date:')} {tx.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 sm:text-right shrink-0">
                      <div>
                        <div className="text-sm font-bold text-gray-900">
                          {tx.amount}
                        </div>
                        <div className="text-xs text-gray-500">
                          {tx.method}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setReceiptData({
                            id: tx.id,
                            date: tx.date,
                            time: '14:32:10',
                            service: tx.service,
                            accountNo: tx.accountNo,
                            amount: tx.amount,
                            payerName: 'Verified Citizen',
                            method: tx.method
                          });
                          setShowHistoryModal(false);
                          setShowReceiptModal(true);
                        }}
                        className="text-xs font-bold text-[#8C1538] hover:underline px-3 py-1.5 rounded-lg bg-[#8C1538]/5 cursor-pointer"
                      >
                        {t('payments.receiptBtn', 'Receipt')}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-semibold transition-colors cursor-pointer"
              >
                {t('payments.histClose', 'Close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INSTANT DIGITAL RECEIPT MODAL */}
      {showReceiptModal && receiptData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100">
            <div className="p-6 text-center border-b border-gray-100">
              <CheckCircleIcon />
              <h3 className="text-xl font-bold text-gray-900">
                {t('payments.rcptSuccess', 'Payment Successful')}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {t('payments.rcptSubtitle', 'Official Digital Receipt • Homagama Pradeshiya Sabha')}
              </p>
            </div>

            <div className="p-6 space-y-3 text-sm bg-gray-50/50">
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">{t('payments.rcptNo', 'Receipt Number')}</span>
                <span className="font-bold text-gray-900">{receiptData.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">{t('payments.rcptCategory', 'Service Category')}</span>
                <span className="font-semibold text-gray-800">{receiptData.service}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">{t('payments.rcptAcct', 'Account / Ref No.')}</span>
                <span className="font-semibold text-gray-800">{receiptData.accountNo}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">{t('payments.rcptPayer', 'Payer Name')}</span>
                <span className="font-semibold text-gray-800">{receiptData.payerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">{t('payments.rcptGateway', 'Payment Gateway')}</span>
                <span className="font-semibold text-gray-800">{receiptData.method}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">{t('payments.rcptDateTime', 'Date & Time')}</span>
                <span className="font-semibold text-gray-800">{receiptData.date} {receiptData.time}</span>
              </div>
              <div className="flex justify-between pt-2 text-base font-bold text-gray-900">
                <span>{t('payments.rcptTotal', 'Total Paid')}</span>
                <span className="text-[#8C1538]">{receiptData.amount}</span>
              </div>
            </div>

            <div className="p-6 bg-white flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  alert(`Downloading official PDF receipt for ${receiptData.id}...`);
                }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
              >
                {t('payments.rcptDownload', 'Download PDF')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowReceiptModal(false);
                  setActiveCategory(null);
                }}
                className="flex-1 bg-[#8C1538] hover:bg-[#73102d] text-white font-bold py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
              >
                {t('payments.rcptDone', 'Done')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
