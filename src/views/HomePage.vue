<template>
    <div class="home">
      <h2>Welcome to the Voice Recorder App!</h2>
      <p>Start recording, upload audio chunks, and merge them with the backend!</p>
      <router-link to="/audio-recording">Go to Recording</router-link>
    </div>
    <div>
      <h2>My Expirience and Projects</h2>
      <h4>Expirience:-</h4>
      <ul>
        <li>Developed  Node.js applications suitable for deployment as AWS Lambda functions.</li>
        <li>Enforced top-tier security protocols by implementing AWS KMS encryption of data and AWS Secret Manager for the secure retrieval of application-required secrets.</li>
        <li>Orchestrated the migration and transformation of an on-premise Windows server-based REST API into a serverless AWS architecture, deploying it through CloudFormation templates in the cloud</li>
        <li>Utilized Amazon S3 for file storage and Amazon DynamoDB for low-latency NoSQL database solutions.</li>
      </ul>
      <h4>Projects</h4>
      <ul>
        <li> <a href="https://singharekh.github.io/BookStore.github.io/">Bookstore</a>
            <p>Description:- </p>
            <ul>
                <li>An online book purchasing site where a user can visit, Register, and browse books </li>
                <li>Added swiper functionality to webpage for ease of use.</li>
                <li>Technologies used: HTML, CSS, JavaScript</li>
            </ul>
        </li>
        <li><a href="https://singharekh.github.io/hunger.github.io/">Hunger</a>
            <p>Description</p>
            <ul>
                <li>website for a restaurant where a user can browse the menu and book the table.</li>
                <li>Used CSS overlays, grid, flexbox for smooth functionality.</li>
                <li>Technologies used: HTML, CSS, JavaScript.</li>
            </ul>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Homepage',
  };
  </script>
  
  <style scoped>
  .home {
    text-align: center;
    padding: 20px;
  }
  </style>
  