import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
// import Alert from './components/Alert';
// import ErrorBoundary from './components/ErrorBoundary';
import NoPage from './pages/404';
import CourseDetails from './pages/CourseDetails';
import CourseReview from './pages/CourseReview';
import Results from './pages/Results';


function App() {
  return (
    <>
      {/* <ErrorBoundary>
        <Alert />
      </ErrorBoundary> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/course-details' element={<CourseDetails />} />
          <Route path='/course-review' element={<CourseReview />} />
          <Route path='/results' element={<Results />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
