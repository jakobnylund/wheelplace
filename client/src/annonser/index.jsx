import { Routes, Route, Navigate } from 'react-router-dom';
import AnnonserLayout from './AnnonserLayout';
import AnnonserBrowse from './AnnonserBrowse';
import SkapaAnnons from './SkapaAnnons';
import BulkUpload from './BulkUpload';
import SEOPage from './SEOPage';

export default function AnnonserPrototype() {
  return (
    <Routes>
      <Route element={<AnnonserLayout />}>
        <Route index element={<AnnonserBrowse />} />
        <Route path="skapa" element={<SkapaAnnons />} />
        <Route path="bulk" element={<BulkUpload />} />
        <Route path="seo/:slug" element={<SEOPage />} />
        <Route path="*" element={<Navigate to="/annonser-proto" replace />} />
      </Route>
    </Routes>
  );
}
