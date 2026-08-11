import React from 'react';

export const EmptyHistoryState: React.FC = () => {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>No records found</h3>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 20px',
    textAlign: 'center' as const,
  },
  title: {
    color: '#4F5E66',
    fontSize: '22px',
    fontWeight: '600' as const,
    marginTop: '20px',
    letterSpacing: '0.5px',
  },
};