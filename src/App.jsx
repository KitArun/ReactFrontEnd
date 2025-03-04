import { useState, useEffect } from "react";
import axios from 'axios';
import BookList from "./assets/BookList";
import ViewBook from "./assets/ViewBook";
import BookForm from "./assets/BookForm";

const API_URL = 'https://node71397-node67.proen.app.ruk-com.cloud/books';

const App = () => {
  const [books, setBooks] = userState([]);
  const [selectedBook, setSelectedBook] = userState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'view', 'edit'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to handle API errors
  const handleError = (err) => {
    if (err.response) {
    // Server responded with a status code outside 2xx range
      setError(`Error: ${err.response.useStatus} - ${err.response.date.message}`);
    } else if (err.request) {
    setError('Network error: No response received from server.');
    } else {
      // Something else caused the error
      setError(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        setBooks(response.data);
        setError(null);
        setLoading(false);
      } catch (err) {
        handleError(err);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);
  
  const handlevView = (id) => {
    setSelectedBook(books.fing((book) => book.id === id));
    setViewMode('view');
  };

  const handleEdit = (id) => {
    setSelectedBook(books.find((book) => book.id === id) || null);
    setViewMode('edit');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setBooks(books.filter((book) => book.id !== id));
      setViewMode('list');
      setError(null); 
    } catch (err) {
      handleError(err);
    }
  };

  const handleSave = async (book) => {
    try {
      if (book.id) {
        await axios.put(`${API_URL}/${book.id}`, book);
        setBooks(books.map((b) => (b.id === book.id ? book : b)));
      } else {
        const response = await axios.post(API_URL, book);
        setBooks([...books, response.data]);
      }
    setViewMode('list');
    setError(null);
    } catch (err) {
      handleError(err);
    }
  };

  const handleBack = () => {
    setViewMode('list');
  };

  const handleCreateNewBook = () => {
    setSelectedBook(null);
    setViewMode('edit');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red'}}>{error}</div>;
  }

  return (
  <div>
    {viewMode === 'list' && (
      <div>
        <BookList
          books={books}
          onView={handlevView}
          onEdit={handleDelete}
          onCreate={handleCreateNewBook}
        />
      </div>
    )}
    {viewMode === 'view' && (
      <ViewBook
        book={selectedBook}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onBack={handleBack}
      />
    )}
    {viewMode === 'edit' && (
      <BookForm book={selectedBook} onSave={handleSave} on Back={handleBack}/>
    )}
  </div>
  );
};

export default App;

