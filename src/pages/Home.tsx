import React from 'react';

const Home: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <h3>Hello World</h3>
      {children}
    </div>
  );
};

export default Home;
