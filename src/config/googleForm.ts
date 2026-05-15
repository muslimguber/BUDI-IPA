/**
 * Configuration for Google Form integration.
 * To get the entry IDs:
 * 1. Open your Google Form
 * 2. Click "Get pre-filled link" from the three-dot menu
 * 3. Fill in some sample data and click "Get link"
 * 4. Copy the link and look for "entry.XXXXXX=" parameters
 */
export const GOOGLE_FORM_CONFIG = {
  // Replace with your actual Google Form ID (from the URL)
  formId: '1FAIpQLScqtL2HRm3PlXPEhzLxXE4P8QAs3eiESL52CBiUkcjzhGEdOQ', 
  
  // Replace with your actual Entry IDs
  entries: {
    name: 'entry.422185554',    // Entry ID for "Nama"
    userClass: 'entry.1076687675', // Entry ID for "Kelas"
    score: 'entry.542546864',   // Entry ID for "Nilai"
    quizName: 'entry.2126123792', // Entry ID for "Nama Kuis/Materi"
    date: 'entry.date_placeholder', // Entry ID for "Tanggal" (optional)
  }
};
