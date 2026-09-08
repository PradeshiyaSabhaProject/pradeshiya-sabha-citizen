import { useState, useEffect } from 'react';
import { letterService } from '../services/letterService';

export const useLetterRequests = () => {
  // Navigation: 'All Status' | 'In Progress' | 'Resolved' | 'Returned'
  const [activeTab, setActiveTab] = useState('All Status');
  
  // Data State
  const [lettersList, setLettersList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Modals State
  const [isNewLetterModalOpen, setIsNewLetterModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isOfficialModalOpen, setIsOfficialModalOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);

  // Form State
  const [formSubject, setFormSubject] = useState('');
  const [formCategory, setFormCategory] = useState('Building and planning');
  const [formDescription, setFormDescription] = useState('');

  // Load letters from service
  const fetchLetters = async () => {
    setLoading(true);
    try {
      const data = await letterService.getLetters();
      setLettersList(data);
    } catch (err) {
      console.error('Failed to fetch letters:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLetters();
  }, []);

  // Filtering Logic
  const filteredLetters = lettersList.filter((letter) => {
    // 1. Search Query Filter
    const matchesSearch = 
      letter.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      letter.refNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      letter.category.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Tab Filter (All Status, In Progress, Resolved, Returned)
    let matchesTab = true;
    if (activeTab === 'In Progress') {
      matchesTab = letter.status === 'In review' || letter.status === 'In transit';
    } else if (activeTab === 'Resolved') {
      matchesTab = letter.status === 'Resolved';
    } else if (activeTab === 'Returned') {
      matchesTab = letter.status === 'Returned';
    }

    // 3. Dropdown Status Filter
    let matchesStatus = true;
    if (statusFilter !== 'All Statuses') {
      matchesStatus = letter.status.toLowerCase() === statusFilter.toLowerCase();
    }

    // 4. Dropdown Category Filter
    let matchesCategory = true;
    if (categoryFilter !== 'All Categories') {
      matchesCategory = letter.category.toLowerCase() === categoryFilter.toLowerCase();
    }

    // 5. Date Range Filter
    let matchesDate = true;
    if (dateRange.start) {
      matchesDate = matchesDate && new Date(letter.dateSubmitted) >= new Date(dateRange.start);
    }
    if (dateRange.end) {
      matchesDate = matchesDate && new Date(letter.dateSubmitted) <= new Date(dateRange.end);
    }

    return matchesSearch && matchesTab && matchesStatus && matchesCategory && matchesDate;
  });

  // Action methods
  const openNewLetterModal = () => {
    setFormSubject('');
    setFormCategory('Building and planning');
    setFormDescription('');
    setIsNewLetterModalOpen(true);
  };

  const closeNewLetterModal = () => {
    setIsNewLetterModalOpen(false);
  };

  const openDetailsModal = (letter) => {
    setSelectedLetter(letter);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedLetter(null);
  };

  const openOfficialModal = (letter) => {
    setSelectedLetter(letter);
    setIsOfficialModalOpen(true);
  };

  const closeOfficialModal = () => {
    setIsOfficialModalOpen(false);
    setSelectedLetter(null);
  };

  const handleCreateLetterSubmit = async (payloadOrEvent?: any) => {
    if (payloadOrEvent && typeof payloadOrEvent.preventDefault === 'function') {
      payloadOrEvent.preventDefault();
    }

    const payload = payloadOrEvent && !payloadOrEvent.preventDefault ? payloadOrEvent : null;
    const subjectToSubmit = payload?.subject || formSubject;
    const categoryToSubmit = payload?.category || formCategory;
    const descToSubmit = payload?.description || formDescription;

    if (!subjectToSubmit.trim() || !descToSubmit.trim()) {
      alert('Please fill in all the required fields.');
      return;
    }

    setLoading(true);
    try {
      const newLetter = {
        subject: subjectToSubmit,
        category: categoryToSubmit,
        description: descToSubmit,
        recipient: payload?.recipient || 'Chairman / Secretary',
        senderName: payload?.senderName || 'Verified Citizen',
        senderPhone: payload?.senderPhone || '077 123 4567',
        senderEmail: payload?.senderEmail || '',
        urgency: payload?.urgency || 'Normal',
        document: payload?.document || null,
        documentName: payload?.documentName || null
      };
      await letterService.createLetterRequest(newLetter);
      await fetchLetters();
      closeNewLetterModal();
    } catch (err) {
      console.error('Failed to create letter request:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    activeTab,
    setActiveTab,
    lettersList,
    filteredLetters,
    loading,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    dateRange,
    setDateRange,
    
    // Modal states
    isNewLetterModalOpen,
    openNewLetterModal,
    closeNewLetterModal,
    isDetailsModalOpen,
    openDetailsModal,
    closeDetailsModal,
    isOfficialModalOpen,
    openOfficialModal,
    closeOfficialModal,
    selectedLetter,

    // Form inputs and submit
    formSubject,
    setFormSubject,
    formCategory,
    setFormCategory,
    formDescription,
    setFormDescription,
    handleCreateLetterSubmit
  };
};
