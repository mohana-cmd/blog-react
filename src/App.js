import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';          // Core CSS
import 'primeicons/primeicons.css';                        // Icons
import Login from './components/authentication/Login';
import BlogList from './components/blog/BlogList';
import ForgotPassword from './components/authentication/ForgotPassword';
import CategoryList from './components/category/CategoryList';
import Job from './components/job/Job';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import Layout from './components/shared/Layout';
import CreateBlog from './components/blog/CreateBlog';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/forgot-password" element={ <ForgotPassword /> }/>
        <Route path="/category-list" 
            element={
              <Layout>
                <CategoryList />
              </Layout>
            }
        />
        <Route path="/blog" 
            element={
              <Layout>
                <BlogList />
              </Layout>
            }
        />
         <Route path="/job" 
            element={
              <Layout>
                <Job />
              </Layout>
            }
        />
        <Route path="/blog/create-blog" element={ <CreateBlog /> } />
      </Routes>
      
    </div>
  );
}

export default App;
