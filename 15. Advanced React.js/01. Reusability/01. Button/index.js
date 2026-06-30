import React from 'react';
import ReactDOM from 'react-dom/client';
import Button from "./Button"

function App() {
  return (
    <main>
      <Button>Log in with Google</Button>
      <Button size="lg" variant="success">Log in with Google</Button>
      <Button size="sm" variant="warning">Log in with Google</Button>
      <Button size="sm" variant="danger">Log in with Google</Button>
    </main>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);