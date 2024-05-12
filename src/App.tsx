import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import NavBar from './componets/NavBar';
import Footer from './componets/Footer';
import { Home, About, NotFound, EventsPage, AddEventForm, ProfilePage, LoginForm, RegisterPage, EditProfile,SaccoPage,OppotunityPage ,ShareOpportunityForm,Shares,SaccoProfile,BoardPage,SaccoFAQ,NewsPage,ResetPassword,ManageSaccoPage,ManageLoans} from './routes';

export default function App() {
  return (
    <Router>
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/add-event-form" element={<AddEventForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/sacco" element={<SaccoPage />} />
          <Route path="/shares" element={<Shares />} />
          <Route path="/opportunity" element={<OppotunityPage />} />
          <Route path="/share-opportunity" element={<ShareOpportunityForm />} />
          <Route path="/sacco-profile" element={<SaccoProfile />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/manage-sacco" element={<ManageSaccoPage />} />
          <Route path="/manage-loans" element={<ManageLoans />} />
          <Route path="/faq-sacco" element={<SaccoFAQ />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}
