<template>
    <header>
      <h1>Voice Recorder App</h1>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/audio-recording">Start Recording</router-link>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'PageHeader',
  };
  </script>
  
  <style scoped>
  header {
    background-color: #333;
    color: white;
    padding: 20px;
    text-align: center;
  }
  
  nav a {
    color: white;
    text-decoration: none;
    margin: 0 10px;
  }
  </style>
  