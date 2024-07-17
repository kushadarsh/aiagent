"use client";

import { useState } from 'react';
import SampleTable from './components/sampltable';

export default function Home() {
  const [formData, setFormData] = useState({
    url1: '',
    url2: '',
    url3: '',
    url4: '',
    url5: '',
    groqPrompt: '',
    chatGptPrompt: '',
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const queryString = new URLSearchParams(formData).toString();
    try {
      const res = await fetch(`https://18.219.115.145:443/urls?${queryString}`, {
        method: 'GET',
      });
      const data = await res.json();
      console.log(data)
      setResponse(data.urls);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <img src="https://cdn.prod.website-files.com/6363382f3e324a19a1f66eee/636339128c6f166cf3e110be_62a232ba8d83faea0627a1fc_5-p-500.webp" alt="Logo" style={styles.logo} />
      <h1 style={styles.mainHeading}>AI Agent</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        {['url1', 'url2', 'url3', 'url4', 'url5'].map((key, index) => (
          <div key={index} style={styles.inputGroup}>
            <label htmlFor={key} style={styles.label}>Enter URL {index + 1}</label>
            <input
              type="url"
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
        ))}
        <div style={styles.inputGroup}>
          <label htmlFor="groqPrompt" style={styles.label}>Groq Prompt</label>
          <textarea
            id="groqPrompt"
            name="groqPrompt"
            value={formData.groqPrompt}
            onChange={handleChange}
            required
            style={styles.textarea}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="chatGptPrompt" style={styles.label}>Chat GPT Prompt</label>
          <textarea
            id="chatGptPrompt"
            name="chatGptPrompt"
            value={formData.chatGptPrompt}
            onChange={handleChange}
            required
            style={styles.textarea}
          />
        </div>
        <button type="submit" style={styles.button}>Submit</button>
      </form>
      {loading && <p style={styles.loading}>Loading...</p>}
      {response && (
        <div style={styles.responseContainer}>
          <h2 style={styles.responseHeading}>Results:</h2>
          <SampleTable data={response} />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    position: 'relative',
  },
  logo: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    width: '200px',
    height: 'auto',
  },
  mainHeading: {
    color: 'white',
    marginBottom: '20px',
    fontSize: '2em',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '700px',
  },
  inputGroup: {
    marginBottom: '15px',
    width: '100%',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: 'white',
    fontSize: '1.2em',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '1em',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '1em',
    height: '100px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1em',
    color: 'white',
    backgroundColor: 'blue',
    border: 'none',
    cursor: 'pointer',
  },
  loading: {
    marginTop: '20px',
    fontSize: '1.2em',
  },
  responseContainer: {
    marginTop: '20px',
    width: '100%',
    maxWidth: '1000px',
    textAlign: 'left',
  },
  responseHeading: {
    color: 'blue',
  },
  response: {
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '5px',
  },
  responseTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    backgroundColor: 'blue',
    color: 'white',
  },
  tableData: {
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid white',
    padding: '10px',
  },
};